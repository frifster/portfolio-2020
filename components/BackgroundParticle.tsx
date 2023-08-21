import styles from "../styles/Home.module.less";
import Particles from "react-particles";
import {useCallback} from "react";
import {loadFull} from "tsparticles";
import {ISourceOptions} from "tsparticles-engine";


const options = {
    fpsLimit: 120,
    particles: {
        color: {
            value: "#01241a",
        },
        move: {
            directions: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: true,
            speed: 3,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 1000,
            },
            value: 60,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "star",
        },
        size: {
            value: {min: 1, max: 4},
        },
    },
    detectRetina: true,
} as ISourceOptions;

export default function BackgroundParticles() {

    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);
    return <Particles id="tsparticles" init={particlesInit} className={styles.particles} options={options}/>;
}
