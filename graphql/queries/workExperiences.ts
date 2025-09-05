import graphql from "../client";
import { WorkExperiencesResponse } from "../types";

export const getWorkExperiences = (): Promise<WorkExperiencesResponse> => {
    return graphql.request(`
        query WorkExperiences {
            workExperiences(first: 100) {
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
    `);
};