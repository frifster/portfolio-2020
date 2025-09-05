import { getAcademics, getBusinesses, getProjects, getWorkExperiences } from "./queries";
import { CredentialsData } from "./types";
import { getFallbackData } from "./fallbackData";
import { checkGraphQLHealth } from "./healthCheck";

const getCredentials = async (): Promise<CredentialsData> => {
    try {
        console.log('Fetching portfolio data...');
        
        // Quick health check first
        const isHealthy = await checkGraphQLHealth();
        if (!isHealthy) {
            console.warn('GraphQL service appears to be down, using fallback data');
            return getFallbackData();
        }
        
        const [academicsResult, businessesResult, projectsResult, workExperiencesResult] = await Promise.allSettled([
            getAcademics(),
            getBusinesses(),
            getProjects(),
            getWorkExperiences()
        ]);

        // Check if all queries failed (likely service issue)
        const allFailed = [
            academicsResult,
            businessesResult,
            projectsResult,
            workExperiencesResult
        ].every(result => result.status === 'rejected');

        if (allFailed) {
            console.warn('All GraphQL queries failed, using fallback data');
            return getFallbackData();
        }

        // Extract data from settled promises, providing fallbacks for failed ones
        const academics = academicsResult.status === 'fulfilled' ? academicsResult.value.academics : [];
        const businesses = businessesResult.status === 'fulfilled' ? businessesResult.value.businesses : [];
        const projects = projectsResult.status === 'fulfilled' ? projectsResult.value.projects : [];
        const workExperiences = workExperiencesResult.status === 'fulfilled' ? workExperiencesResult.value.workExperiences : [];

        // Log any failures for debugging
        if (academicsResult.status === 'rejected') console.error('Academics query failed:', academicsResult.reason);
        if (businessesResult.status === 'rejected') console.error('Businesses query failed:', businessesResult.reason);
        if (projectsResult.status === 'rejected') console.error('Projects query failed:', projectsResult.reason);
        if (workExperiencesResult.status === 'rejected') console.error('Work experiences query failed:', workExperiencesResult.reason);

        return {
            academics,
            businesses,
            projects,
            workExperiences
        };
    } catch (error) {
        console.error('Critical error in getCredentials:', error);
        
        // Check if it's a circuit breaker error
        if (error instanceof Error && error.message.includes('Circuit breaker is open')) {
            console.warn('Circuit breaker is open, using fallback data');
            return getFallbackData();
        }
        
        // Return fallback data for any other critical errors
        console.warn('Using fallback data due to critical error');
        return getFallbackData();
    }
};

export default getCredentials;