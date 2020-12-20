import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.less'
import { faUser, faGraduationCap, faBriefcase, faPhoneAlt, faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence } from 'framer-motion'

import BackgroundParticles from '../components/BackgroundParticle'
import { CONTACT_VIEW, PROFILE_VIEW, STUDY_VIEW, WORK_VIEW } from '../constants/view'
import WorkView from '../components/WorkView'
import AcadView from '../components/AcadView'
import ProfileView from '../components/ProfileView'
import ContactView from '../components/ContactView'

export default function Home () {
  const [view, setView] = useState(0)

  const VIEWS = [
    PROFILE_VIEW,
    STUDY_VIEW,
    WORK_VIEW,
    CONTACT_VIEW
  ]

  const title = {
    [PROFILE_VIEW]: "Eugene's Portfolio",
    [STUDY_VIEW]: 'Academics',
    [WORK_VIEW]: 'Work Experiences',
    [CONTACT_VIEW]: 'Reach me'
  }[VIEWS[view]]

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

  console.log({ title, view })

  return (

    <div className={styles.container} onKeyPress={e => console.log('EEE', e)}>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <BackgroundParticles />
      <div className={styles.outerControls}>
        <div className={styles.mainControl}>
          <FontIcon icon={faUser} currentView={0} />
          <FontIcon icon={faGraduationCap} currentView={1} />
          <FontIcon icon={faBriefcase} currentView={2} />
          <FontIcon icon={faPhoneAlt} currentView={3} />
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
              view === 0 && <ProfileView />
            }

            {
              view === 1 && <AcadView />
            }
            {
              view === 2 && <WorkView />
            }
            {
              view === 3 && <ContactView />
            }
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
