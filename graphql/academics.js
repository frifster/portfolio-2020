import graphql from "./client";


const getAcademics = graphql.request(
  `
      query Academics {
        academics(orderBy: createdAt_ASC) {
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