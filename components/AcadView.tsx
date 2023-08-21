import {STUDY_VIEW} from '../constants/view'
import {motion} from 'framer-motion'
import {spring, variants} from '../animations/homeVariants'
import styles from '../styles/Home.module.less'

type AcadData = {
    id: string,
    school: string,
    location: string,
    attendStart: string,
    attendEnd: string,
    course: string,
    courseLink?: string,
    honor?: string,
}

type AcadViewProps = {
    data: AcadData[]
}

function AcadView(props: AcadViewProps) {

    return (
        <motion.div
            key={STUDY_VIEW}
            transition={spring}
            initial='enter'
            exit='exit'
            animate='center'
            variants={variants}
            className={styles.mainContent}
        >
            <h3>Academics and Certifications</h3>
            <div className={styles.experienceContainer}>
                {
                    Object.values(props.data)
                        .map(academics => (
                            <section className={styles.experience} key={academics.school + academics.id}>
                                <h5>
                                    {academics.courseLink ?
                                        <a href={academics.courseLink}
                                           target="_blank">{academics.course}</a> : academics.course}
                                </h5>
                                <h6>{academics.school} - {academics.location}</h6>
                                <h6>{academics.attendStart} - {academics.attendEnd}</h6>
                                {academics.honor && <p>{academics.honor}</p>}
                            </section>
                        ))
                }
            </div>
        </motion.div>
    )
}

export default AcadView
