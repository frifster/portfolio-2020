import { CONTACT_VIEW } from '../constants/view'
import { motion } from 'framer-motion'
import { spring, variants } from '../animations/homeVariants'
import styles from '../styles/Home.module.less'

function ContactView () {
  return (
    <motion.div
      key={CONTACT_VIEW}
      transition={spring}
      initial='enter'
      exit='exit'
      animate='center'
      variants={variants}
      className={styles.mainContent}
    >
      <h3>Reach me!</h3>
      <div className={styles.contactContainer}>
        <section className={styles.contact}>
          <h5>Email</h5>
          <h6>avilaeugeneb@gmail.com</h6>
        </section>
        <section className={styles.contact}>
          <h5>Mobile Number</h5>
          <h6>09976099219</h6>
        </section>
        <section className={styles.contact}>
          <h5>Facebook</h5>
          <h6><a href='https://fb.com/eugenerationx' target='_blank' rel='noopener noreferrer'>fb.com/eugenerationx</a></h6>
        </section>
        <section className={styles.contact}>
          <h5>Linkedin</h5>
          <h6><a href='https://www.linkedin.com/in/eugenerationx/' target='_blank' rel='noopener noreferrer'>linkedin.com/in/eugenerationx</a></h6>
        </section>
      </div>
    </motion.div>
  )
}

export default ContactView
