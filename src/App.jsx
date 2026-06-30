import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Preloader from "./components/Preloader/Preloader";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Gallery from "./components/Gallery/Gallery";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        AOS.init({

            duration: 1000,

            once: true,

            offset: 120,

        });

        const timer = setTimeout(() => {

            setLoading(false);

        }, 1500);

        return () => clearTimeout(timer);

    }, []);

    if (loading) {

        return <Preloader />;

    }

    return (

        <>
            <Navbar />
            <Hero />
            <Services />
            <Gallery />
            <About />
            <Contact />
            <Footer />
        </>

    );

}

export default App;