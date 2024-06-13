import {useEffect, useState} from "react";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AnimatePresence} from "framer-motion";
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

import getCredentials from "../graphql/credentials";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export async function getStaticProps() {

    const {academics, businesses, projects, workExperiences}: any = await getCredentials;

    return {
        props: {
            academics,
            businesses,
            projects,
            workExperiences
        },
    };
}

type View = {
    name: string,
    component: any,
    title: string,
    data?: any
}


export default function Home({academics, businesses, projects, workExperiences}) {
    const VIEWS: View[] = [
        {name: PROFILE_VIEW, component: ProfileView, title: "Eugene's Portfolio"},
        {name: STUDY_VIEW, component: AcadView, title: "Academics", data: academics},
        {name: WORK_VIEW, component: WorkView, title: "Work Experiences", data: workExperiences},
        {name: PROJECTS_VIEW, component: ProjectsView, title: "Projects", data: projects},
        {name: BUSINESS_VIEW, component: BusinessView, title: "Businesses", data: businesses},
        {name: CONTACT_VIEW, component: ContactView, title: "Reach me"},
    ];

    const [view, setView] = useState(0);
    const now = new Date();
    const year = now.getFullYear();

    const title = VIEWS[view].title;

    const FontIcon = ({icon, currentView}) => {
        return (
            <FontAwesomeIcon
                icon={icon as IconProp}
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
                <link rel="icon" href="./icon.png"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={styles.outerControls}>
                <div className={styles.mainControl}>
                    <FontIcon icon={faHome} currentView={0}/>
                    <FontIcon icon={faGraduationCap} currentView={1}/>
                    <FontIcon icon={faBriefcase} currentView={2}/>
                    <FontIcon icon={faTools} currentView={3}/>
                    <FontIcon icon={faHandshake} currentView={4}/>
                    <FontIcon icon={faPhoneAlt} currentView={5}/>
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
                    <div className={styles.downloadBtn}>
                        <button>
                            <a href="./AvilaEugeneResume.pdf" download>
                                Download CV
                            </a>
                        </button>
                    </div>
                    <footer className={styles.footer}>
                        <FontAwesomeIcon icon={faCopyright as IconProp}/> {year} All rights reserved.
                    </footer>
                </section>
                <AnimatePresence initial={false}>
                    {VIEWS[view].component({data: VIEWS[view]?.data || {}})}
                </AnimatePresence>
            </div>
        </div>
    );
}
