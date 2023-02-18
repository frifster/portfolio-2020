import { PROFILE_VIEW } from "../constants/view";
import { motion } from "framer-motion";
import { spring, variants } from "../animations/homeVariants";
import styles from "../styles/Home.module.less";

function ProfileView() {
  return (
    <motion.div
      key={PROFILE_VIEW}
      transition={spring}
      initial="enter"
      exit="exit"
      animate="center"
      variants={variants}
      className={styles.mainContent}
    >
      <h3>Greetings Visitor!</h3>
      <div className={styles.greetingsContainer}>
        <p>
          I am a <strong>Full Stack Developer</strong> specializing in React JS and React Native. I have five (5) years of professional experience developing websites and mobile applications. I have helped local and international clients design systems that will optimize their business operation processes. Applications that automate tasks and generate reports are my forte.
        </p>
        <p>
          Leading a team of developers also has honed me to actively work with people, and business partners in identifying the pain points of a project, while also implementing solutions that would work best for them.
        </p>
        <p>
          My goal is to broaden my knowledge in web development by learning new tools that could help small to medium-scale businesses to streamline their operations. Recently, I was able to share my expertise when my family and I started local businesses. The experience gave me a business owner’s point of view and has helped in my thought process for developing systems.
        </p>
        <p>
          If you visit my website wanting to know more about what I do and what
          I can offer, you're in the right place!
        </p>
      </div>
    </motion.div>
  );
}

export default ProfileView;
