import { PROFILE_VIEW } from '../constants/view'
import { motion } from 'framer-motion'
import { spring, variants } from '../animations/homeVariants'
import styles from '../styles/Home.module.less'

function ProfileView () {
  return (
    <motion.div
      key={PROFILE_VIEW}
      transition={spring}
      initial='enter'
      exit='exit'
      animate='center'
      variants={variants}
      className={styles.mainContent}
    >
      <h3>Greetings Visitor!</h3>
      <div className={styles.greetingsContainer}>
        <p>
          I am a Javascript Senior Developer that specializes in React JS and React native.
          I have 3 years of professional experience when it comes to developing websites and mobile applications. I also help my team in designing system that will optimize business operations processes like apps that automates task and generates reports.
        </p>
        <p>
          My goal is to broaden my knowledge in web development by learning new tools. I also want to help more developers in achieving their goal by sharing my experiences to them.
        </p>
        <p>
          If you visit my website to know more about what I do and what I can offer, you're in the right place.
        </p>
      </div>
    </motion.div>
  )
}

export default ProfileView
