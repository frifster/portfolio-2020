import graphql from "../client";
import { BusinessesResponse } from "../types";

export const getBusinesses = async (): Promise<BusinessesResponse> => {
    try {
        return await graphql.request(`
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
    } catch (error) {
        console.error('Failed to fetch businesses:', error);
        return { businesses: [] };
    }
};