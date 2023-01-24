import { GraphQLClient } from 'graphql-request';

const graphql = new GraphQLClient(
    'https://us-west-2.cdn.hygraph.com/content/cldaev1j901ey01umczew1ole/master',
    {
        headers: {
            authorization: process.env.GRAPHCMS_TOKEN,
        },
    }
);

export default graphql;