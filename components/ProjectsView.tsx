import {motion} from 'framer-motion'

import {PROJECTS_VIEW} from '../constants/view'
import {spring, variants} from '../animations/homeVariants'
import styles from '../styles/Home.module.less'
import {useRouter} from 'next/router'


type ProjectData = {
    id: string,
    title: string,
    role: string,
    company: string,
    link: string,
    image?: string,
    codeRepo?: {
        githubLink: string,
        private: boolean
    },
    projectDesc?: string[],
    techstack?: string[]
}

type ProjectsViewProps = {
    data: ProjectData[]
}

function ProjectsView({data}: ProjectsViewProps) {
    const router = useRouter();

    const goToSideProjects = () => router.push('/mini-projects');

    return (
        <motion.div
            key={PROJECTS_VIEW}
            transition={spring}
            initial='enter'
            exit='exit'
            animate='center'
            variants={variants}
            className={styles.mainContent}
        >
            <h3>Projects <span onClick={goToSideProjects}>Go to Side Projects Instead</span></h3>
            <div className={styles.projectsContainer}>
                {
                    Object.values(data)
                        .map(project => {
                            const {
                                codeRepo,
                                title,
                                id,
                                role,
                                company,
                                link,
                                projectDesc = [],
                                techstack = []
                            } = project || {};
                            const {githubLink = "", private: codeRepoPrivacy = true} = codeRepo || {};

                            return (
                                <section className={styles.project} key={title + id}>
                                    <div className={styles.projectHeader}>
                                        <h5>
                                            {title}
                                            {
                                                codeRepoPrivacy
                                                    ? <span className={styles.repo}>Private Repo</span>
                                                    :
                                                    <span className={styles.repo}>
                                                    <a href={githubLink} target='_blank'
                                                       rel='noopener noreferrer'>Github</a>
                                                </span>
                                            }
                                        </h5>
                                        <h6>Role: {role}</h6>
                                        <h6>Client: {company}</h6>
                                    </div>
                                    <div className={styles.techstacks}>
                                        <div className={styles.projectImage}>
                                            <a href={link || ''} target='_blank' rel='noopener noreferrer'>
                                                <img
                                                    src={project.image}
                                                    draggable={false}
                                                    alt="Developer's Profile Picture"
                                                />
                                            </a>
                                        </div>
                                        <div className={styles.projectDesc}>
                                            {
                                                projectDesc.map(paragraph => <p>{paragraph}</p>)
                                            }
                                            <p>Techstacks used are the following:</p>

                                            <div className={styles.techs}>
                                                {
                                                    techstack.map(tech => <span>{tech}</span>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )
                        })
                }
            </div>
        </motion.div>
    )
}

export default ProjectsView