import graphql from "./client";


const getAcademics = graphql.request(
    `
      query Academics {
        academics(orderBy: publishedAt_ASC) {
          id
          location
          school
          course
          attendStart
          attendEnd
          honor
        }
    }
    `
);

export default getAcademics;