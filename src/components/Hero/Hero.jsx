import styles from "./Hero.module.css";
import heroImage from "../../assets/Hero.png";

function Hero() {
  return (


    <section
      id="hero"
      className={styles.hero}
      style={{ backgroundImage: `url(${heroImage})` }}
    >
        
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>Design Your Dream Space</h1>

          <p>Luxury Interior Design for Modern Homes & Offices</p>

          <button>Get Free Consultation</button>

          <div className={styles.scrollDown}>

            ↓

          </div>
        </div>
      </div>
    </section>
  );


}

export default Hero;