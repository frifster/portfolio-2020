import styles from '../styles/Home.module.less'
import { faUser, faHome, faGraduationCap, faBriefcase, faPhoneAlt, faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home () {
  return (
    <div className={styles.container}>
      <div className={styles.outerControls}>
        <div className={styles.mainControl}>
          <FontAwesomeIcon icon={faHome} className={styles.faIcons} />
          <FontAwesomeIcon icon={faUser} className={styles.faIcons} />
          <FontAwesomeIcon icon={faGraduationCap} className={styles.faIcons} />
          <FontAwesomeIcon icon={faBriefcase} className={styles.faIcons} />
          <FontAwesomeIcon icon={faPhoneAlt} className={styles.faIcons} />
        </div>
      </div>
      <div className={styles.innerBox}>
        <section className={styles.rightContent}>
          <div className={styles.profileSection}>
            <div className={styles.profileImg} />
            <div className={styles.headingText}>Eugene Avila</div>
            <div className={styles.userTitle}>Senior Developer</div>
            <div className={styles.socialIcons}>
              <FontAwesomeIcon icon={faFacebookF} />
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
          </div>
          <div className={styles.dowloadBtn}>
            <button>Download CV</button>
          </div>
          <footer className={styles.footer}>
            <FontAwesomeIcon icon={faCopyright} /> 2020 All rights reserved.
          </footer>
        </section>
        <div className={styles.mainContent}>Main Content</div>
      </div>
    </div>
  )
}
