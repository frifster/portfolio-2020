export interface Academic {
    id: string;
    location: string;
    school: string;
    course: string;
    attendStart: string;
    attendEnd: string;
    honor: string;
    courseLink: string;
}

export interface Business {
    founded: string;
    grabFoodLink: string;
    desc: string;
    business: string;
    location: string;
    link: string;
    role: string;
    id: string;
}

export interface Project {
    codeRepo: string;
    company: string;
    id: string;
    image: string;
    link: string;
    projectDesc: string;
    role: string;
    techstack: string;
    title: string;
}

export interface WorkExperience {
    companyName: string;
    startYear: string;
    workDescription: string;
    workDetails: string;
    workLocation: string;
    workTitle: string;
    endYear: string;
    id: string;
}

export interface AcademicsResponse {
    academics: Academic[];
}

export interface BusinessesResponse {
    businesses: Business[];
}

export interface ProjectsResponse {
    projects: Project[];
}

export interface WorkExperiencesResponse {
    workExperiences: WorkExperience[];
}

export interface CredentialsData {
    academics: Academic[];
    businesses: Business[];
    projects: Project[];
    workExperiences: WorkExperience[];
}