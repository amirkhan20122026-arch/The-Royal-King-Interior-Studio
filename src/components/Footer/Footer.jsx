import styles from "./Footer.module.css";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaWhatsapp,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt
} from "react-icons/fa";

function Footer() {

    return (

        <footer className={styles.footer}>

            <div className={styles.container}>

                {/* Company */}

                <div className={styles.box}>

                    <h2 className={styles.logo}>

                        Royal King Interior

                    </h2>

                    <p>

                        We create luxurious, modern and timeless interior
                        spaces that combine elegance, comfort and
                        functionality for homes and commercial projects.

                    </p>

                    <div className={styles.socials}>

                        <a href="#">

                            <FaFacebookF />

                        </a>

                        <a href="#">

                            <FaInstagram />

                        </a>

                        <a href="#">

                            <FaLinkedinIn />

                        </a>

                        <a href="#">

                            <FaWhatsapp />

                        </a>

                    </div>

                </div>

                {/* Quick Links */}

                <div className={styles.box}>

                    <h3>

                        Quick Links

                    </h3>

                    <ul>

                        <li><a href="#hero">Home</a></li>

                        <li><a href="#about">About</a></li>

                        <li><a href="#services">Services</a></li>

                        <li><a href="#gallery">Gallery</a></li>

                        <li><a href="#contact">Contact</a></li>

                    </ul>

                </div>

                {/* Services */}

                <div className={styles.box}>

                    <h3>

                        Our Services

                    </h3>

                    <ul>

                        <li>Interior Design</li>

                        <li>Space Planning</li>

                        <li>Furniture Design</li>

                        <li>3D Visualization</li>

                        <li>Home Renovation</li>

                    </ul>

                </div>

                {/* Contact */}

                <div className={styles.box}>

                    <h3>

                        Contact Info

                    </h3>

                    <p>

                        <FaPhoneAlt />

                        +91 9837810456

                    </p>

                    <p>

                        <FaEnvelope />

                        info@royalkinginterior.com

                    </p>

                    <p>

                        <FaMapMarkerAlt />

                        New Delhi, India

                    </p>

                </div>

            </div>

            <div className={styles.bottom}>

                <p>

                    © 2026 Royal King Interior. All Rights Reserved.

                </p>

            </div>

        </footer>

    );

}

export default Footer;