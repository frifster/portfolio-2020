import { motion } from 'framer-motion'

import { PROJECTS_VIEW } from '../constants/view'
import { spring, variants } from '../animations/homeVariants'
import styles from '../styles/Home.module.less'

function ProjectsView({ data }) {
    console.log({ data })

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
            <h3>Projects</h3>
            <div className={styles.projectsContainer}>
                {
                    Object.values(data)
                        .map(project => (
                            <section className={styles.project} key={project.title + project.id}>
                                <div className={styles.projectHeader}>
                                    <h5>
                                        {project.title}
                                        {
                                            project.codeRepo?.private
                                                ? <span className={styles.repo}>Private Repo</span>
                                                :
                                                <span className={styles.repo}>
                                                    <a href={project.codeRepo.githubLink} target='_blank' rel='noopener noreferrer'>Github</a>
                                                </span>
                                        }
                                    </h5>
                                    <h6>Role: {project.role}</h6>
                                    <h6>Client: {project.company}</h6>
                                </div>
                                <div className={styles.techstacks}>
                                    <div className={styles.projectImage}>
                                        <a href={project.link || ''} target='_blank' rel='noopener noreferrer'>
                                            <img
                                                src={"./" + project.image}
                                                draggable={false}
                                                alt="Developer's Profile Picture"
                                            />
                                        </a>
                                    </div>
                                    <div className={styles.projectDesc}>
                                        {
                                            project.projectDesc.map(paragraph => <p>{paragraph}</p>)
                                        }
                                        <p>Techstacks used are the following:</p>

                                        <div className={styles.techs}>
                                            {
                                                project.techstack.map(tech => <span>{tech}</span>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))
                }
            </div>
        </motion.div>
    )
}

export default ProjectsView