import {WORK_VIEW} from "../constants/view";
import {motion} from "framer-motion";
import {spring, variants} from "../animations/homeVariants";
import styles from "../styles/Home.module.less";

type WorkData = {
    id: string;
    workTitle: string;
    companyName: string;
    workLocation: string;
    startYear: string;
    endYear: string;
    workDescription?: string;
    workDetails?: string[];
};

type WorkViewProps = {
    data: WorkData[];
};

function WorkView({data}: WorkViewProps) {
    return (
        <motion.div
            key={WORK_VIEW}
            transition={spring}
            initial="enter"
            exit="exit"
            animate="center"
            variants={variants}
            className={styles.mainContent}
        >
            <h3>Work Experiences</h3>
            <div className={styles.experienceContainer}>
                {Object.values(data).reverse()
                    .map((workExp) => (
                        <section
                            className={styles.experience}
                            key={workExp.workTitle + workExp.id}
                        >
                            <h5>{workExp.workTitle}</h5>
                            <h6>
                                {workExp.companyName} - {workExp.workLocation}
                            </h6>
                            <h6>
                                {workExp.startYear} - {workExp.endYear}
                            </h6>
                            {workExp.workDescription && <p>{workExp.workDescription}</p>}
                            {workExp.workDetails && (
                                <ul>
                                    {workExp.workDetails.map((detail, index) => (
                                        <li key={workExp.workTitle + index}>{detail}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
            </div>
        </motion.div>
    );
}

export default WorkView;
