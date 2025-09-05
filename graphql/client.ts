import { GraphQLClient } from 'graphql-request';

// Validate environment variables with graceful degradation
if (!process.env.GRAPHCMS_URL) {
    console.error('GRAPHCMS_URL environment variable is missing. Portfolio data will not be available.');
}

if (!process.env.GRAPHCMS_TOKEN) {
    console.error('GRAPHCMS_TOKEN environment variable is missing. Portfolio data will not be available.');
}

const baseClient = new GraphQLClient(
    process.env.GRAPHCMS_URL || 'https://placeholder-url.com',
    {
        headers: {
            authorization: process.env.GRAPHCMS_TOKEN || '',
        },
        timeout: 15000, // 15 second timeout
    }
);

// Retry configuration
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // Start with 1 second
const CIRCUIT_BREAKER_THRESHOLD = 5; // Number of consecutive failures before opening circuit
const CIRCUIT_BREAKER_TIMEOUT = 60000; // 1 minute before trying again

// Sleep utility function
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Circuit breaker state
let consecutiveFailures = 0;
let circuitBreakerOpenTime: number | null = null;

// Enhanced GraphQL client with retry logic
class ResilientGraphQLClient {
    private client: GraphQLClient;

    constructor(client: GraphQLClient) {
        this.client = client;
    }

    async request<T = any>(query: string, variables?: any): Promise<T> {
        // Check circuit breaker
        if (circuitBreakerOpenTime) {
            const now = Date.now();
            if (now - circuitBreakerOpenTime < CIRCUIT_BREAKER_TIMEOUT) {
                throw new Error(`Circuit breaker is open. Service unavailable. Try again in ${Math.ceil((CIRCUIT_BREAKER_TIMEOUT - (now - circuitBreakerOpenTime)) / 1000)} seconds.`);
            } else {
                // Reset circuit breaker
                circuitBreakerOpenTime = null;
                consecutiveFailures = 0;
                console.log('Circuit breaker reset - attempting request');
            }
        }

        let lastError: Error;
        
        for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
            try {
                if (attempt === 1) {
                    console.log('Making GraphQL request...');
                } else {
                    console.log(`GraphQL request attempt ${attempt}/${RETRY_ATTEMPTS}`);
                }
                
                const result = await this.client.request<T>(query, variables);
                
                // Reset failure count on success
                consecutiveFailures = 0;
                
                if (attempt > 1) {
                    console.log(`GraphQL request succeeded on attempt ${attempt}`);
                }
                
                return result;
            } catch (error: any) {
                lastError = error;
                
                // Check if it's a network error that we should retry
                const isRetryableError = 
                    error.code === 'ENOTFOUND' ||
                    error.code === 'ECONNRESET' ||
                    error.code === 'ETIMEDOUT' ||
                    error.message?.includes('Failed to fetch') ||
                    error.message?.includes('fetch') ||
                    error.message?.includes('getaddrinfo');
                
                if (!isRetryableError || attempt === RETRY_ATTEMPTS) {
                    console.error(`GraphQL request failed on attempt ${attempt}:`, error.message);
                    
                    // Increment failure count and check circuit breaker
                    if (isRetryableError) {
                        consecutiveFailures++;
                        if (consecutiveFailures >= CIRCUIT_BREAKER_THRESHOLD) {
                            circuitBreakerOpenTime = Date.now();
                            console.warn(`Circuit breaker opened after ${consecutiveFailures} consecutive failures`);
                        }
                    }
                    
                    throw error;
                }
                
                // Calculate exponential backoff delay with jitter
                const baseDelay = RETRY_DELAY * Math.pow(2, attempt - 1);
                const jitter = Math.random() * 1000; // Add up to 1 second of jitter
                const delay = baseDelay + jitter;
                
                console.warn(`GraphQL request failed on attempt ${attempt}, retrying in ${Math.round(delay)}ms...`, error.message);
                
                await sleep(delay);
            }
        }
        
        throw lastError!;
    }
}

const graphql = new ResilientGraphQLClient(baseClient);

export default graphql;