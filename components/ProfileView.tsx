import {PROFILE_VIEW} from "../constants/view";
import {motion} from "framer-motion";
import {spring, variants} from "../animations/homeVariants";
import styles from "../styles/Home.module.less";

function ProfileView() {
    const calculateYearsOfExperience = () => {
        const startDate = new Date(2018, 2); // March 2018 (month is 0-indexed)
        const currentDate = new Date();

        let years = currentDate.getFullYear() - startDate.getFullYear();
        let months = currentDate.getMonth() - startDate.getMonth();

        if (months < 0) {
            years--;
        }

        return years;
    };

    const yearsOfExperience = calculateYearsOfExperience();

    const numberToWord = (num: number) => {
        const words = [
            'zero', 'one', 'two', 'three', 'four', 'five',
            'six', 'seven', 'eight', 'nine', 'ten',
            'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
            'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
        ];

        return num <= 20 ? words[num] : num.toString();
    };

    const yearsInWord = numberToWord(yearsOfExperience);

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
                    I am a <strong>Full Stack Developer</strong> specializing in React JS and React Native. I have {yearsInWord}
                    {" "}({yearsOfExperience}) years of professional experience developing websites and mobile applications. I am proficient in
                    building scalable, interactive, and responsive web applications, with expertise in consuming REST APIs and
                    understanding React functional components and hooks. I have helped local and international clients
                    design systems that optimize their business operation processes. Applications that automate
                    tasks and generate reports are my forte.
                </p>
                <p>
                    Leading a team of developers has honed my ability to actively work with people and business partners
                    in identifying the pain points of a project, while also implementing solutions that work best
                    for them. I've conducted technical interviews, performed code reviews, and mentored junior developers
                    throughout my career. I have strong knowledge of Agile Scrum methodologies and AWS Cloud services.
                </p>
                <p>
                    My goal is to broaden my knowledge in web development by learning new tools that could help small to
                    medium-scale businesses to streamline their operations. Recently, I was able to share my expertise
                    when my family and I started local businesses. The experience gave me a business owner's point of
                    view and has helped in my thought process for developing systems.
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