import React from 'react'
import Head from 'next/head';

import styles from "../../styles/Projects.module.less";
import BackgroundParticles from '../../components/BackgroundParticle';
import Calculator from '../../components/apps/Calculator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'
import ConnectFour from '../../components/apps/ConnectFour';

function Projects() {
    const router = useRouter();

    const goBackHome = () => router.push('/')
    return (
        <div className={styles.projectsContainer}>
            <Head>
                <title>Eugene's Side Projects</title>
                <link rel="icon" href="./icon.png" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.projects}>
                <FontAwesomeIcon
                    icon={faHome}
                    className={styles.faIcons}
                    onClick={goBackHome}
                />
                <h1 className={styles.title}>Side Projects</h1>
                <div className={styles.projectsDiv}>
                    <Calculator />
                    <ConnectFour />
                </div>
            </div>
        </div>
    )
}

export default Projects