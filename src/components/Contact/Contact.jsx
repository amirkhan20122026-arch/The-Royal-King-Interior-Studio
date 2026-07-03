import { useState } from "react";
import styles from "./Contact.module.css";

import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setSuccess(data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <h2>Contact Us</h2>

      <div className={styles.contactInfo}>
        <a href="tel:+918266060671">
          <FaPhoneAlt />
          <span>+91 8266060671</span>
        </a>

        <a
          href="https://wa.me/918266060671"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
          <span>WhatsApp</span>
        </a>

        <a href="mailto:amirkhan2012026@gmail.com">
          <FaEnvelope />
          <span>amirkhan2012026@gmail.com</span>
        </a>

        <a
          href="https://instagram.com/mr.khan_official_01"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
          <span>Instagram</span>
        </a>

        <a
          href="https://maps.google.com/?q=jaipuria"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaMapMarkerAlt />
          <span>Location</span>
        </a>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
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

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {success && <p className={styles.success}>{success}</p>}
    </section>
  );
}

export default Contact;