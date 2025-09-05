import graphql from "../client";
import { ProjectsResponse } from "../types";

export const getProjects = (): Promise<ProjectsResponse> => {
    return graphql.request(`
        query Projects {
            projects(orderBy: index_ASC, first: 100) {
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
        }
    `);
};