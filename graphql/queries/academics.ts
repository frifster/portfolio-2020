import graphql from "../client";
import { AcademicsResponse } from "../types";

export const getAcademics = (): Promise<AcademicsResponse> => {
    return graphql.request(`
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
};