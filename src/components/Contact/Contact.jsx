import { useState } from "react";
import styles from "./Contact.module.css";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.message
        ) {

            alert("Please fill all fields.");

            return;

        }

        console.log(formData);

        setSuccess("Message Sent Successfully!");

        setFormData({

            name: "",

            email: "",

            phone: "",

            message: ""

        });

    };

    return (

        <section id="contact" className={styles.contact}>

            <h2>Contact Us</h2>

            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <textarea
                    rows="6"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>

                <button type="submit">

                    Send Message

                </button>

            </form>

            {

                success && (

                    <p className={styles.success}>

                        {success}

                    </p>

                )

            }

        </section>

    );

}

export default Contact;