import graphql from "../client";
import { AcademicsResponse } from "../types";

export const getAcademics = async (): Promise<AcademicsResponse> => {
    try {
        return await graphql.request(`
            query Academics {
                academics(orderBy: createdAt_ASC, first: 100) {
                    id
                    location
                    school
                    course
                    attendStart
                    attendEnd
                    honor
                    courseLink
                }
            }
        `);
    } catch (error) {
        console.error('Failed to fetch academics:', error);
        // Return empty data structure that matches the expected type
        return { academics: [] };
    }
};