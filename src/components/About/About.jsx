import { useState } from "react";
import styles from "./About.module.css";
import about from "../../assets/about.jpg";

function About() {

    const [showMore, setShowMore] = useState(false);

    return (

        <section id="about" className={styles.about}>

          <div className={styles.image}>

    <img src={about} alt="About" />

    <div className={styles.badge}>

        <h3>10+</h3>

        <span>Years Experience</span>

    </div>

</div>

           

            <div className={styles.content}>

                <h2>About Us</h2>

                <p>
                    We specialize in creating luxurious,
                    elegant and modern interior spaces
                    for homes, offices and commercial
                    projects.
                </p>

                <div className={styles.features}>

                    <div className={styles.feature}>
                        ⭐ 10+ Years Experience
                    </div>

                    <div className={styles.feature}>
                        ⭐ 500+ Completed Projects
                    </div>

                    <div className={styles.feature}>
                        ⭐ 100% Client Satisfaction
                    </div>

                </div>

                {showMore && (

                    <div className={styles.moreContent}>

                        <p>

                            Our team specializes in luxury residential,
                            commercial and office interior design.

                            We provide complete turnkey solutions
                            from planning and 3D visualization
                            to final execution using premium quality
                            materials.

                        </p>

                    </div>

                )}

                <button
                    onClick={() => setShowMore(!showMore)}
                >

                    {showMore ? "Read Less" : "Read More"}

                </button>

            </div>

        </section>

    );

}

export default About;