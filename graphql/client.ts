import { GraphQLClient } from 'graphql-request';

// Validate environment variables
if (!process.env.GRAPHCMS_URL) {
    throw new Error('GRAPHCMS_URL environment variable is required. Please check your .env.local file.');
}

if (!process.env.GRAPHCMS_TOKEN) {
    throw new Error('GRAPHCMS_TOKEN environment variable is required. Please check your .env.local file.');
}

const graphql = new GraphQLClient(
    process.env.GRAPHCMS_URL,
    {
        headers: {
            authorization: process.env.GRAPHCMS_TOKEN,
        },
    }
);

export default graphql;