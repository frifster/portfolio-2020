import React, { useState } from 'react'
import Head from 'next/head';

import styles from "../../styles/Projects.module.less";
import Calculator from '../../components/apps/Calculator/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faCalculator, faGamepad, faTh, faPalette, faBrain, faKey} from '@fortawesome/free-solid-svg-icons';
import {useRouter} from 'next/router'
import ConnectFour from '../../components/apps/ConnectFour/index';
import TicTacToe from '../../components/apps/TicTacToe/index';
import ColorGenerator from '../../components/apps/ColorGenerator/index';
import MemoryGame from '../../components/apps/MemoryGame/index';
import PasswordGenerator from '../../components/apps/PasswordGenerator/index';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

function Projects() {
    const router = useRouter();
    const [activeProject, setActiveProject] = useState('calculator');

    const goBackHome = () => router.push('/');

    const projects = [
        {
            id: 'calculator',
            name: 'Calculator',
            icon: faCalculator,
            component: <Calculator />
        },
        {
            id: 'connect-four',
            name: 'Connect Four',
            icon: faGamepad,
            component: <ConnectFour />
        },
        {
            id: 'tic-tac-toe',
            name: 'Tic Tac Toe',
            icon: faTh,
            component: <TicTacToe />
        },
        {
            id: 'memory-game',
            name: 'Memory Game',
            icon: faBrain,
            component: <MemoryGame />
        },
        {
            id: 'color-generator',
            name: 'Color Generator',
            icon: faPalette,
            component: <ColorGenerator />
        },
        {
            id: 'password-generator',
            name: 'Password Generator',
            icon: faKey,
            component: <PasswordGenerator />
        }
    ];

    const activeProjectComponent = projects.find(p => p.id === activeProject)?.component;

    return (
        <div className={styles.projectsContainer}>
            <Head>
                <title>Eugene's Side Projects</title>
                <link rel="icon" href="./icon.png"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={styles.projects}>
                <div className={styles.header}>
                    <FontAwesomeIcon
                        icon={faHome as IconProp}
                        className={styles.faIcons}
                        onClick={goBackHome}
                        role="button"
                        tabIndex={0}
                        aria-label="Go back to home"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                goBackHome();
                            }
                        }}
                    />
                    <h1 className={styles.title}>Mini Projects</h1>
                </div>
                <div className={styles.projectsDiv}>
                    <nav className={styles.sideNav} role="navigation" aria-label="Mini projects navigation">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`${styles.navItem} ${activeProject === project.id ? styles.active : ''}`}
                                onClick={() => setActiveProject(project.id)}
                                role="button"
                                tabIndex={0}
                                aria-pressed={activeProject === project.id}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setActiveProject(project.id);
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={project.icon as IconProp} className={styles.icon} />
                                <span className={styles.label}>{project.name}</span>
                            </div>
                        ))}
                    </nav>
                    <div className={styles.projectDisplay} role="main" aria-label={`${projects.find(p => p.id === activeProject)?.name} application`}>
                        {activeProjectComponent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects