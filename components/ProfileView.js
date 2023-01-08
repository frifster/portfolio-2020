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
          I am a <strong>Full Stack Developer</strong> that specializes in React
          JS and React native. I have 4 years of professional experience when it
          comes to developing websites and mobile applications. I also help my
          team in designing system that will optimize business operations
          processes like apps that automates task and generates reports.
        </p>
        <p>
          My goal is to broaden my knowledge in web development by learning new
          tools. I also want to help more developers in achieving their goal by
          sharing my experiences to them.
        </p>
        <p>
          Recently, I took a break from programming and development career to start local businesses for me and my family and but now I am now ready to get back to my journey as a developer.
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
