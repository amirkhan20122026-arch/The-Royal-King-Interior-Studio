import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import Gallery from "../components/Gallery/Gallery";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import DynamicProjects from "../components/DynamicProjects/DynamicProjects";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <DynamicProjects />
      <About />
      <Contact />
      <Footer />
      
    </>
  );
}

export default Home; 