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
            <h3>Welcome to My Digital Portfolio! 👋</h3>
            <div className={styles.greetingsContainer}>
                <p>
                    I'm <strong>Eugene Avila</strong>, a passionate <strong>Full Stack Developer</strong> with {yearsInWord} ({yearsOfExperience}) years of comprehensive experience 
                    in building scalable, high-performance web and mobile applications. My expertise spans across modern technologies 
                    including <strong>React.js</strong>, <strong>React Native</strong>, <strong>Node.js</strong>, <strong>TypeScript</strong>, and the complete JavaScript ecosystem. 
                    I thrive on transforming complex business requirements into elegant, user-friendly digital solutions.
                </p>
                <p>
                    <strong>Technical Expertise & Services:</strong> I specialize in enterprise-grade business automation systems, REST APIs, 
                    and responsive web applications for startups to international corporations. My full-stack approach covers the complete 
                    software lifecycle from design to deployment, with expertise in third-party integrations and scalable database solutions.
                </p>
                <p>
                    <strong>Leadership & Team Development:</strong> I lead cross-functional development teams, mentor developers, and establish 
                    coding standards that boost productivity and quality. Experienced with Agile methodologies, DevOps practices, and 
                    <strong>AWS cloud services</strong> (EC2, Lambda, RDS, S3) while fostering collaborative team environments.
                </p>
                <p>
                    <strong>Unique Business Perspective:</strong> What sets me apart is my dual perspective as both a seasoned developer and 
                    a hands-on business owner. Having started and operated multiple local businesses with my family, I've gained invaluable 
                    insights into the real challenges that businesses face daily. This experience has shaped my approach to software development—
                    I don't just build technically impressive systems, I create practical solutions that address genuine business pain points, 
                    improve operational efficiency, and drive measurable results. I understand the importance of ROI, user adoption, and 
                    long-term maintainability from both technical and business standpoints.
                </p>
                <p>
                    <strong>Continuous Learning & Innovation:</strong> The technology landscape evolves rapidly, and I'm committed to staying 
                    at the forefront of industry trends and emerging technologies. I regularly invest time in learning new frameworks, 
                    exploring innovative development methodologies, and experimenting with cutting-edge tools that can deliver better 
                    value to my clients. Whether it's exploring new frontend frameworks, diving deeper into cloud architectures, or 
                    understanding the latest in AI and machine learning integration, I believe in continuous improvement and knowledge sharing.
                </p>
                <p>
                    <strong>Let's Build Something Extraordinary Together!</strong> Ready to transform your business with technology that actually works? 
                    Let's discuss your next project and create solutions that scale with your success! 🚀
                </p>
            </div>
        </motion.div>
    );
}

export default ProfileView;