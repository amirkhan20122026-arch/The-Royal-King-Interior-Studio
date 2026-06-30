import { useState } from "react";
import styles from "./Services.module.css";
import ServiceCard from "../ServiceCard/ServiceCard";

import interior from "../../assets/interior.jpg.png";
import planning from "../../assets/planning.jpg.png";
import furniture from "../../assets/furniture.jpg.png";

function Services() {
    
             const [selectedService, setSelectedService] = useState(null);        

    const services = [

        {
            image: interior,
            title: "Interior Design",
            description: "Luxury Interior Design for Modern Homes."
        },

        {
            image: planning,
            title: "Space Planning",
            description: "Smart Planning for Comfortable Living."
        },

        {
            image: furniture,
            title: "Furniture Design",
            description: "Premium Custom Furniture Design."
        }

    ];
    return (
        <section id="services" className={styles.services}>

            <h2>Our Services</h2>

            <div className={styles.container}>

                <ServiceCard
                    image={interior}
                    title="Interior Design"
                    description="Luxury Interior Design for Modern Homes."
                />

                <ServiceCard
                    image={planning}
                    title="Space Planning"
                    description="Smart Space Planning for Better Living."
                />

                <ServiceCard
                    image={furniture}
                    title="Furniture Design"
                    description="Premium Custom Furniture Design."
                />

            </div>

        </section>
    );
}

export default Services;