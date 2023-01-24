import graphql from "./client";


const getPortfolioCredentials = graphql.request(
  `
      query Portfolio {
        academics(orderBy: createdAt_ASC) {
          id
          location
          school
          course
          attendStart
          attendEnd
          honor
        }

        businesses {
          founded
          grabFoodLink
          desc
          business
          location
          link
          role
        }
    }
    `
);

export default getPortfolioCredentials;