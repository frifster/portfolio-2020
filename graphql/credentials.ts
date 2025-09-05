import { getAcademics, getBusinesses, getProjects, getWorkExperiences } from "./queries";
import { CredentialsData } from "./types";

const getCredentials = async (): Promise<CredentialsData> => {
    const [academicsResult, businessesResult, projectsResult, workExperiencesResult] = await Promise.all([
        getAcademics(),
        getBusinesses(),
        getProjects(),
        getWorkExperiences()
    ]);

    return {
        academics: academicsResult.academics,
        businesses: businessesResult.businesses,
        projects: projectsResult.projects,
        workExperiences: workExperiencesResult.workExperiences
    };
};

export default getCredentials;