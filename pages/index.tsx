import {useEffect, useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";

import styles from "../styles/Home.module.less";
import {
    faHome,
    faGraduationCap,
    faBriefcase,
    faPhoneAlt,
    faCopyright,
    faHandshake,
    faTools,
    faBars,
    faTimes
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

    const {academics, businesses, projects, workExperiences}: any = await getCredentials();

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
    const router = useRouter();
    
    const VIEWS: View[] = [
        {name: PROFILE_VIEW, component: ProfileView, title: "Eugene's Portfolio"},
        {name: STUDY_VIEW, component: AcadView, title: "Academics", data: academics},
        {name: WORK_VIEW, component: WorkView, title: "Work Experiences", data: workExperiences},
        {name: PROJECTS_VIEW, component: ProjectsView, title: "Projects", data: projects},
        {name: BUSINESS_VIEW, component: BusinessView, title: "Businesses", data: businesses},
        {name: CONTACT_VIEW, component: ContactView, title: "Reach me"},
    ];

    // Get initial view from URL or default to 0
    const getViewFromUrl = () => {
        if (router.query.section) {
            const sectionIndex = VIEWS.findIndex(v => v.name === router.query.section);
            return sectionIndex >= 0 ? sectionIndex : 0;
        }
        return 0;
    };

    const [view, setView] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const now = new Date();
    const year = now.getFullYear();

    const title = VIEWS[view].title;

    // Update URL when view changes
    const updateView = (newView: number) => {
        const section = VIEWS[newView]?.name || PROFILE_VIEW;
        router.push(`/?section=${section}`, undefined, { shallow: true });
        setView(newView);
        setMobileMenuOpen(false); // Close mobile menu when navigating
    };

    const FontIcon = ({icon, currentView, label}) => {
        return (
            <FontAwesomeIcon
                icon={icon as IconProp}
                role="button"
                tabIndex={0}
                aria-label={`Navigate to ${label}`}
                aria-pressed={currentView === view}
                className={currentView === view ? styles.faIconsActive : styles.faIcons}
                onClick={() => updateView(currentView)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        updateView(currentView);
                    }
                }}
                style={{ outline: 'none' }}
            />
        );
    };

    const handleEvent = (e) => {
        // Close mobile menu on Escape
        if (e && e.code === "Escape" && mobileMenuOpen) {
            setMobileMenuOpen(false);
            return;
        }

        // Arrow key navigation
        if (e && e.code === "ArrowUp") {
            e.preventDefault();
            const newView = view === 0 ? VIEWS.length - 1 : view - 1;
            updateView(newView);
        }

        if (e && e.code === "ArrowDown") {
            e.preventDefault();
            const newView = view === VIEWS.length - 1 ? 0 : view + 1;
            updateView(newView);
        }

        // Tab key navigation
        if (e && e.code === "Tab") {
            if (e.shiftKey) {
                // Shift+Tab - go to previous section
                e.preventDefault();
                const newView = view === 0 ? VIEWS.length - 1 : view - 1;
                updateView(newView);
            } else {
                // Tab - go to next section
                e.preventDefault();
                const newView = view === VIEWS.length - 1 ? 0 : view + 1;
                updateView(newView);
            }
        }
    };

    // Sync view with URL on router change
    useEffect(() => {
        if (router.isReady) {
            const urlView = getViewFromUrl();
            setView(urlView);
        }
    }, [router.isReady, router.query.section]);

    useEffect(() => {
        document.addEventListener("keydown", handleEvent, false);

        return () => {
            document.removeEventListener("keydown", handleEvent, false);
        };
    }, [view, mobileMenuOpen]);

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="./icon.png"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={styles.outerControls}>
                {/* Desktop Navigation */}
                <div className={`${styles.mainControl} ${styles.desktopNav}`} role="navigation" aria-label="Portfolio sections">
                    <FontIcon icon={faHome} currentView={0} label="Profile"/>
                    <FontIcon icon={faGraduationCap} currentView={1} label="Academics"/>
                    <FontIcon icon={faBriefcase} currentView={2} label="Work Experience"/>
                    <FontIcon icon={faTools} currentView={3} label="Projects"/>
                    <FontIcon icon={faHandshake} currentView={4} label="Business"/>
                    <FontIcon icon={faPhoneAlt} currentView={5} label="Contact"/>
                </div>
                
                {/* Mobile Hamburger Button */}
                <button 
                    className={`${styles.hamburgerBtn} ${styles.mobileOnly}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <FontAwesomeIcon icon={mobileMenuOpen ? faTimes as IconProp : faBars as IconProp} />
                </button>

                {/* Mobile Navigation Overlay */}
                {mobileMenuOpen && (
                    <div 
                        className={styles.mobileNav} 
                        role="navigation" 
                        aria-label="Mobile navigation"
                        onClick={(e) => {
                            // Close menu when clicking the overlay background
                            if (e.target === e.currentTarget) {
                                setMobileMenuOpen(false);
                            }
                        }}
                    >
                        <div className={styles.mobileNavContent}>
                            <div 
                                className={`${styles.mobileNavItem} ${view === 0 ? styles.active : ''}`} 
                                onClick={() => updateView(0)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        updateView(0);
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faHome as IconProp} />
                                <span>Profile</span>
                            </div>
                            <div 
                                className={`${styles.mobileNavItem} ${view === 1 ? styles.active : ''}`} 
                                onClick={() => updateView(1)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        updateView(1);
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faGraduationCap as IconProp} />
                                <span>Academics</span>
                            </div>
                            <div 
                                className={`${styles.mobileNavItem} ${view === 2 ? styles.active : ''}`} 
                                onClick={() => updateView(2)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        updateView(2);
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faBriefcase as IconProp} />
                                <span>Work Experience</span>
                            </div>
                            <div 
                                className={`${styles.mobileNavItem} ${view === 3 ? styles.active : ''}`} 
                                onClick={() => updateView(3)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        updateView(3);
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faTools as IconProp} />
                                <span>Projects</span>
                            </div>
                            <div 
                                className={`${styles.mobileNavItem} ${view === 4 ? styles.active : ''}`} 
                                onClick={() => updateView(4)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        updateView(4);
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faHandshake as IconProp} />
                                <span>Business</span>
                            </div>
                            <div 
                                className={`${styles.mobileNavItem} ${view === 5 ? styles.active : ''}`} 
                                onClick={() => updateView(5)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        updateView(5);
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faPhoneAlt as IconProp} />
                                <span>Contact</span>
                            </div>
                        </div>
                    </div>
                )}
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
                <main 
                    role="main" 
                    aria-label={`${VIEWS[view].title} section`}
                    tabIndex={-1}
                    id="main-content"
                >
                    <AnimatePresence initial={false}>
                        {VIEWS[view].component({data: VIEWS[view]?.data || {}})}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
