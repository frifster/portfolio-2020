import styles from '../styles/Home.module.less'
import { faUser, faHome, faGraduationCap, faBriefcase, faPhoneAlt, faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, AnimatePresence } from 'framer-motion'

import BackgroundParticles from '../components/BackgroundParticle'
import { useCallback, useEffect, useState } from 'react'
import { CONTACT_VIEW, HOME_VIEW, PROFILE_VIEW, STUDY_VIEW, WORK_VIEW } from '../constants/view'
const variants = {
  enter: {
    y: 1000,
    opacity: 0
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1
  }
}

const spring = {
  y: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 }
}

export default function Home () {
  const [view, setView] = useState(0)

  const VIEWS = [
    HOME_VIEW,
    PROFILE_VIEW,
    STUDY_VIEW,
    WORK_VIEW,
    CONTACT_VIEW
  ]

  const FontIcon = ({ icon, currentView }) => {
    return <FontAwesomeIcon icon={icon} className={currentView === view ? styles.faIconsActive : styles.faIcons} onClick={() => setView(currentView)} />
  }

  const handleEvent = (e) => {
    if (e && e.code === 'ArrowUp') {
      setView(view === 0 ? (VIEWS.length - 1) : view - 1)
    }

    if (e && e.code === 'ArrowDown') {
      setView(view === (VIEWS.length - 1) ? 0 : view + 1)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEvent, false)

    return () => {
      document.removeEventListener('keydown', handleEvent, false)
    }
  }, [view])

  return (
    <div className={styles.container} onKeyPress={e => console.log('EEE', e)}>
      <BackgroundParticles />
      <div className={styles.outerControls}>
        <div className={styles.mainControl}>
          <FontIcon icon={faHome} currentView={0} />
          <FontIcon icon={faUser} currentView={1} />
          <FontIcon icon={faGraduationCap} currentView={2} />
          <FontIcon icon={faBriefcase} currentView={3} />
          <FontIcon icon={faPhoneAlt} currentView={4} />
        </div>
      </div>
      <div className={styles.innerBox}>
        <section className={styles.rightContent}>
          <div className={styles.profileSection}>
            <div className={styles.profileImgContainer}>
              <div className={styles.profileImg}>
                <img src='./myprofilepic.jpeg' draggable={false} />
              </div>
            </div>
            <div className={styles.headingText}>Eugene Avila</div>
            <div className={styles.userTitle}>Senior Developer</div>
            <div className={styles.socialIcons}>
              <FontAwesomeIcon icon={faFacebookF} />
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
          </div>
          <div className={styles.dowloadBtn}>
            <button title='CV not available yet. Sorry for the inconvenience'>Download CV</button>
          </div>
          <footer className={styles.footer}>
            <FontAwesomeIcon icon={faCopyright} /> 2020 All rights reserved.
          </footer>
        </section>
        <div className={styles.animateDiv}>
          <AnimatePresence initial={false}>
            {
              view === 0 && (
                <motion.div
                  key={HOME_VIEW}
                  transition={spring}
                  initial='enter'
                  exit='exit'
                  animate='center'
                  variants={variants}
                  className={styles.homeContent}
                >
                  {/* <div>{HOME_VIEW}</div> */}
                </motion.div>
              )
            }

            {
              view === 1 && (
                <motion.div
                  key={PROFILE_VIEW}
                  transition={spring}
                  initial='enter'
                  exit='exit'
                  animate='center'
                  variants={variants}
                  className={styles.mainContent}
                >
                  {PROFILE_VIEW}
                </motion.div>
              )
            }

            {
              view === 2 && (
                <motion.div
                  key={STUDY_VIEW}
                  transition={spring}
                  initial='enter'
                  exit='exit'
                  animate='center'
                  variants={variants}
                  className={styles.mainContent}
                >
                  {STUDY_VIEW}
                </motion.div>
              )
            }
            {
              view === 3 && (
                <motion.div
                  key={WORK_VIEW}
                  transition={spring}
                  initial='enter'
                  exit='exit'
                  animate='center'
                  variants={variants}
                  className={styles.mainContent}
                >
                  {WORK_VIEW}
                </motion.div>
              )
            }
            {
              view === 4 && (
                <motion.div
                  key={CONTACT_VIEW}
                  transition={spring}
                  initial='enter'
                  exit='exit'
                  animate='center'
                  variants={variants}
                  className={styles.mainContent}
                >
                  {CONTACT_VIEW}
                </motion.div>
              )
            }
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
