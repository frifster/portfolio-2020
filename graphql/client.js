import { GraphQLClient } from 'graphql-request';

const graphql = new GraphQLClient(
    process.env.GRAPHCMS_URL,
    {
        headers: {
            authorization: process.env.GRAPHCMS_TOKEN,
        },
    }
);

export default graphql;