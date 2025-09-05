import graphql from "../client";
import { ProjectsResponse } from "../types";

export const getProjects = async (): Promise<ProjectsResponse> => {
    try {
        return await graphql.request(`
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
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return { projects: [] };
    }
};