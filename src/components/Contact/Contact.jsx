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

        const emailPattern =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(formData.email)) {

            alert("Invalid Email");

            return;

        }

        const phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(formData.phone)) {

            alert("Enter Valid 10 Digit Phone Number");

            return;

        }

        setSuccess("Your Message Sent Successfully ✔");

        setFormData({

            name: "",

            email: "",

            phone: "",

            message: ""

        });

        setTimeout(() => {

            setSuccess("");

        }, 3000);

    };

    return (

        <section id="contact" className={styles.contact}>

            <div className={styles.heading}>

                <h2>Contact Us</h2>

                <p>

                    Let's Design Your Dream Space.

                </p>

            </div>

            <div className={styles.container}>

                <div className={styles.info}>

                    <h3>Get In Touch</h3>

                    <div className={styles.item}>
                        📍 Noida , India
                    </div>

                    <div className={styles.item}>
                        📞 +91 9876543210
                    </div>

                    <div className={styles.item}>
                        📧 info@royalkinginterior.com
                    </div>

                </div>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >

                    <input

                        type="text"

                        placeholder="Your Name"

                        name="name"

                        value={formData.name}

                        onChange={handleChange}

                    />

                    <input

                        type="email"

                        placeholder="Your Email"

                        name="email"

                        value={formData.email}

                        onChange={handleChange}

                    />

                    <input

                        type="tel"

                        placeholder="Your Phone"

                        name="phone"

                        value={formData.phone}

                        onChange={handleChange}

                    />

                    <textarea

                        rows="6"

                        placeholder="Your Message"

                        name="message"

                        value={formData.message}

                        onChange={handleChange}

                    />

                    <button>

                        Get Free Consultation

                    </button>

                    {

                        success &&

                        <p className={styles.success}>

                            {success}

                        </p>

                    }

                </form>

            </div>

        </section>

    );

}

export default Contact;