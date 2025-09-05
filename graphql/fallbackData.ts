import { CredentialsData } from './types';

/**
 * Fallback data to display when GraphQL service is unavailable
 * This ensures the portfolio remains functional even during service outages
 */
export const fallbackPortfolioData: CredentialsData = {
    academics: [
        {
            id: 'fallback-1',
            location: 'Loading...',
            school: 'Academic information temporarily unavailable',
            course: 'Please check back later',
            attendStart: '',
            attendEnd: '',
            honor: '',
            courseLink: ''
        }
    ],
    businesses: [
        {
            id: 'fallback-1',
            founded: '',
            grabFoodLink: '',
            desc: 'Business information temporarily unavailable',
            business: 'Loading...',
            location: '',
            link: '',
            role: ''
        }
    ],
    projects: [
        {
            id: 'fallback-1',
            codeRepo: '',
            company: '',
            image: '',
            link: '',
            projectDesc: 'Project information temporarily unavailable. Please check back later.',
            role: '',
            techstack: '',
            title: 'Loading Projects...'
        }
    ],
    workExperiences: [
        {
            id: 'fallback-1',
            companyName: 'Loading...',
            startYear: '',
            workDescription: 'Work experience information temporarily unavailable',
            workDetails: 'Please check back later',
            workLocation: '',
            workTitle: '',
            endYear: ''
        }
    ]
};

/**
 * Get fallback data with a notice about service availability
 */
export const getFallbackData = (): CredentialsData => {
    console.warn('Using fallback portfolio data due to service unavailability');
    return fallbackPortfolioData;
};