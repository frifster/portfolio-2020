import styles from '../styles/Home.module.less'
import Particles from 'react-particles-js'

const particleParams = {
  particles: {
    number: {
      value: 50
    },
    size: {
      value: 5,
      random: true,
      anim: {
        speed: 4,
        size_min: 1
      }
    },
    color: {
      value: {
        r: 55,
        g: 50,
        b: 255
      }
    },
    line_linked: {
      color: {
        value: {
          r: 0,
          g: 0,
          b: 255
        }
      }
    },
    rotate: {
      value: 20,
      animation: {
        enable: true,
        speed: 2000
      }
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      }
    }
  }
}

export default function BackgroundParticles () {
  return <Particles className={styles.particles} params={particleParams} />
}
