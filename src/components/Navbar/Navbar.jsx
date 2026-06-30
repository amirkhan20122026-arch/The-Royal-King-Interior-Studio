import { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (

        <nav className={styles.nav}>

            <h2 className={styles.logo}>
                The Royal King Interior Studio
            </h2>

            <div
                className={styles.menuIcon}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? "✕" : "☰"}
            </div>

            <ul className={`${styles.menu} ${menuOpen ? styles.active : ""}`}>

                <li>
                    <a href="#hero" onClick={closeMenu}>
                        Home
                    </a>
                </li>

                <li>
                    <a href="#about" onClick={closeMenu}>
                        About
                    </a>
                </li>

                <li>
                    <a href="#services" onClick={closeMenu}>
                        Services
                    </a>
                </li>

                <li>
                    <a href="#gallery" onClick={closeMenu}>
                        Gallery
                    </a>
                </li>

                <li>
                    <a href="#contact" onClick={closeMenu}>
                        Contact
                    </a>
                </li>

            </ul>

        </nav>

    );

}

export default Navbar;