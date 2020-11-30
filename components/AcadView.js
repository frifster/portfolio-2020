import { STUDY_VIEW } from '../constants/view'
import { motion } from 'framer-motion'
import { spring, variants } from '../animations/homeVariants'
import styles from '../styles/Home.module.less'
import { ACADEMICS } from '../credentials/academics'

function AcadView () {
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
          Object.values(ACADEMICS).sort().reverse()
            .map(acads => (
              <section className={styles.experience} key={acads.school + acads.id}>
                <h5>{acads.course}</h5>
                <h6>{acads.school} - {acads.location}</h6>
                <h6>{acads.attendStart} - {acads.attendEnd}</h6>
                {acads.honor && <p>{acads.honor}</p>}
              </section>
            ))
        }
      </div>
    </motion.div>
  )
}

export default AcadView
