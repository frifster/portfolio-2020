import graphql from "../client";
import { WorkExperiencesResponse } from "../types";

export const getWorkExperiences = async (): Promise<WorkExperiencesResponse> => {
    try {
        return await graphql.request(`
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
    } catch (error) {
        console.error('Failed to fetch work experiences:', error);
        return { workExperiences: [] };
    }
};