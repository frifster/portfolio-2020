import graphql from "../client";
import { BusinessesResponse } from "../types";

export const getBusinesses = (): Promise<BusinessesResponse> => {
    return graphql.request(`
        query Businesses {
            businesses(first: 100) {
                founded
                grabFoodLink
                desc
                business
                location
                link
                role
                id
            }
        }
    `);
};