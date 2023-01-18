import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion'
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import { BUSINESS_VIEW } from '../constants/view'
import { spring, variants } from '../animations/homeVariants'
import styles from '../styles/Home.module.less'
import { BUSINESSES } from '../credentials/businesses'

function BusinessView() {
    return (
        <motion.div
            key={BUSINESS_VIEW}
            transition={spring}
            initial='enter'
            exit='exit'
            animate='center'
            variants={variants}
            className={styles.mainContent}
        >
            <h3>Businesses</h3>
            <div className={styles.experienceContainer}>
                {
                    Object.values(BUSINESSES).sort()
                        .map(business => (
                            <section className={styles.experience} key={business.business + business.id}>
                                <h5><a href={business.link} target='_blank'>{business.business} <FontAwesomeIcon icon={faExternalLinkAlt} /> </a></h5>
                                {
                                    business.grabFoodLink
                                        ? <h6><a href={business.grabFoodLink} target='_blank'><strong>Grab Food</strong> <FontAwesomeIcon icon={faExternalLinkAlt} /></a></h6>
                                        : ""
                                }
                                <h6>{business.role}</h6>
                                <h6>{business.type}</h6>
                                <h6>{business.location}</h6>
                                <h6>{business.founded}</h6>
                            </section>
                        ))
                }
            </div>
        </motion.div>
    )
}

export default BusinessView
