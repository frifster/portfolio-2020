import graphql from "./client";


const getCredentials = graphql.request(
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
          courseLink
        }

        businesses {
          founded
          grabFoodLink
          desc
          business
          location
          link
          role
          id
        }

        projects(orderBy: index_ASC) {
          codeRepo
          company
          id
          image
          link
          projectDesc
          role
          techstack
          title
        }

        workExperiences {
          companyName
          startYear
          workDescription
          workDetails
          workLocation
          workTitle
          endYear
          id
        }
    }
    `
);

export default getCredentials;