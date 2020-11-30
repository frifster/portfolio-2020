import { WORK_VIEW } from '../constants/view'
import { motion } from 'framer-motion'
import { spring, variants } from '../animations/homeVariants'
import styles from '../styles/Home.module.less'
import { WORK_EXPERIENCES } from '../credentials/work'

function WorkView () {
  return (
    <motion.div
      key={WORK_VIEW}
      transition={spring}
      initial='enter'
      exit='exit'
      animate='center'
      variants={variants}
      className={styles.mainContent}
    >
      <h3>Work Experiences</h3>
      <div className={styles.experienceContainer}>
        {
          Object.values(WORK_EXPERIENCES).sort().reverse()
            .map(workExp => (
              <section className={styles.experience} key={workExp.workTitle + workExp.id}>
                <h5>{workExp.workTitle}</h5>
                <h6>{workExp.companyName} - {workExp.workLocation}</h6>
                <h6>{workExp.startYear} - {workExp.endYear}</h6>
                {workExp.workDescription && <p>{workExp.workDescription}</p>}
                {
                  workExp.workDetails && (
                    <ul>
                      {
                        workExp.workDetails.map((detail, index) => (
                          <li key={workExp.workTitle + index}>{detail}</li>
                        ))
                      }
                    </ul>
                  )
                }
              </section>
            ))
        }
      </div>
    </motion.div>
  )
}

export default WorkView
