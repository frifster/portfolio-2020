import { useEffect, useState } from "react";
import Head from "next/head";

import styles from "../styles/Home.module.less";
import {
  faHome,
  faGraduationCap,
  faBriefcase,
  faPhoneAlt,
  faCopyright,
  faHandshake,
  faTools
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";

import BackgroundParticles from "../components/BackgroundParticle";
import {
  BUSINESS_VIEW,
  CONTACT_VIEW,
  PROFILE_VIEW,
  PROJECTS_VIEW,
  STUDY_VIEW,
  WORK_VIEW,
} from "../constants/view";
import WorkView from "../components/WorkView";
import AcadView from "../components/AcadView";
import ProfileView from "../components/ProfileView";
import ContactView from "../components/ContactView";
import BusinessView from "../components/BusinessView";
import ProjectsView from "../components/ProjectsView";

import getPortfolioCredentials from "../graphql/portfolioCredentials";

export async function getStaticProps() {

  const { academics, businesses } = await getPortfolioCredentials;

  return {
    props: {
      academics,
      businesses
    },
  };
}


export default function Home({ academics, businesses }) {
  const [view, setView] = useState(0);
  const [year, setYear] = useState(2020);

  const VIEWS = [
    { name: PROFILE_VIEW, component: ProfileView, title: "Eugene's Portfolio" },
    { name: STUDY_VIEW, component: AcadView, title: "Academics", data: academics },
    { name: WORK_VIEW, component: WorkView, title: "Work Experiences" },
    { name: PROJECTS_VIEW, component: ProjectsView, title: "Projects" },
    { name: BUSINESS_VIEW, component: BusinessView, title: "Businesses", data: businesses },
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

  // setting date 
  useEffect(() => {
    const now = new Date();
    setYear(now.getFullYear())
  }, [])

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
          <FontIcon icon={faHome} currentView={0} />
          <FontIcon icon={faGraduationCap} currentView={1} />
          <FontIcon icon={faBriefcase} currentView={2} />
          <FontIcon icon={faTools} currentView={3} />
          <FontIcon icon={faHandshake} currentView={4} />
          <FontIcon icon={faPhoneAlt} currentView={5} />
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
              <a href="./AvilaEugene.pdf" download>
                Download CV
              </a>
            </button>
          </div>
          <footer className={styles.footer}>
            <FontAwesomeIcon icon={faCopyright} /> {year} All rights reserved.
          </footer>
        </section>
        <div className={styles.animateDiv}>
          <AnimatePresence initial={false}>
            {VIEWS[view].component({ data: VIEWS[view].data || {} })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
