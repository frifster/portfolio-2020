import graphql from './client';

/**
 * Simple health check for the GraphQL endpoint
 * Returns true if the service is reachable, false otherwise
 */
export const checkGraphQLHealth = async (): Promise<boolean> => {
    try {
        // Simple introspection query to check if service is available
        await graphql.request(`
            query HealthCheck {
                __schema {
                    queryType {
                        name
                    }
                }
            }
        `);
        return true;
    } catch (error) {
        console.warn('GraphQL health check failed:', error instanceof Error ? error.message : 'Unknown error');
        return false;
    }
};

/**
 * Get service status with detailed information
 */
export const getServiceStatus = async () => {
    const startTime = Date.now();
    const isHealthy = await checkGraphQLHealth();
    const responseTime = Date.now() - startTime;
    
    return {
        healthy: isHealthy,
        responseTime,
        timestamp: new Date().toISOString(),
        endpoint: process.env.GRAPHCMS_URL || 'Not configured'
    };
};