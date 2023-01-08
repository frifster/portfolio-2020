import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.less";
import {
  faUser,
  faGraduationCap,
  faBriefcase,
  faPhoneAlt,
  faCopyright,
  faHandshake
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";

import BackgroundParticles from "../components/BackgroundParticle";
import {
  BUSINESS_VIEW,
  CONTACT_VIEW,
  PROFILE_VIEW,
  STUDY_VIEW,
  WORK_VIEW,
} from "../constants/view";
import WorkView from "../components/WorkView";
import AcadView from "../components/AcadView";
import ProfileView from "../components/ProfileView";
import ContactView from "../components/ContactView";
import BusinessView from "../components/BusinessView";

export default function Home() {
  const [view, setView] = useState(0);

  const VIEWS = [
    { name: PROFILE_VIEW, component: ProfileView, title: "Eugene's Portfolio" },
    { name: STUDY_VIEW, component: AcadView, title: "Academics" },
    { name: WORK_VIEW, component: WorkView, title: "Work Experiences" },
    { name: BUSINESS_VIEW, component: BusinessView, title: "Businesses" },
    { name: CONTACT_VIEW, component: ContactView, title: "Reach me" },
  ];

  const title = VIEWS[view].title;

  const FontIcon = ({ icon, currentView }) => {
    return (
      <FontAwesomeIcon
        icon={icon}
        className={currentView === view ? styles.faIconsActive : styles.faIcons}
        onClick={() => setView(currentView)}
      />
    );
  };

  const handleEvent = (e) => {
    if (e && e.code === "ArrowUp") {
      setView(view === 0 ? VIEWS.length - 1 : view - 1);
    }

    if (e && e.code === "ArrowDown") {
      setView(view === VIEWS.length - 1 ? 0 : view + 1);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEvent, false);

    return () => {
      document.removeEventListener("keydown", handleEvent, false);
    };
  }, [view]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="./icon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BackgroundParticles />
      <div className={styles.outerControls}>
        <div className={styles.mainControl}>
          <FontIcon icon={faUser} currentView={0} />
          <FontIcon icon={faGraduationCap} currentView={1} />
          <FontIcon icon={faBriefcase} currentView={2} />
          <FontIcon icon={faHandshake} currentView={3} />
          <FontIcon icon={faPhoneAlt} currentView={4} />
        </div>
      </div>
      <div className={styles.innerBox}>
        <section className={styles.rightContent}>
          <div className={styles.profileSection}>
            <div className={styles.profileImgContainer}>
              <div className={styles.profileImg}>
                <img
                  src="./profilePic.png"
                  draggable={false}
                  alt="Developer's Profile Picture"
                />
              </div>
            </div>
            <div className={styles.headingText}>Eugene Avila</div>
            <div className={styles.userTitle}>Full Stack Developer</div>
            <div className={styles.userTitle}>Business Owner</div>
          </div>
          <div className={styles.dowloadBtn}>
            <button>
              <a href="./AvilaResume.pdf" download>
                Download CV
              </a>
            </button>
          </div>
          <footer className={styles.footer}>
            <FontAwesomeIcon icon={faCopyright} /> 2020 All rights reserved.
          </footer>
        </section>
        <div className={styles.animateDiv}>
          <AnimatePresence initial={false}>
            {VIEWS[view].component()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
