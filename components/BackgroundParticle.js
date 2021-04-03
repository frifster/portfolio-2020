import styles from "../styles/Home.module.less";
import Particles from "react-particles-js";

const params = {
  particles: {
    number: {
      value: 30,
    },
    size: {
      value: 10,
      random: true,
      anim: {
        speed: 10,
        size_min: 1,
      },
    },
    color: {
      value: "#8efcdd",
    },
    rotate: {
      value: 20,
      animation: {
        enable: true,
        speed: 2000,
      },
    },
    move: {
      out_mode: "out",
    },
    line_linked: {
      enable: false,
    },
  },
  interactivity: {
    modes: {
      remove: {
        particles_nb: 10,
      },
    },
  },
};

export default function BackgroundParticles() {
  return <Particles className={styles.particles} params={params} />;
}
