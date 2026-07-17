import { useState } from "react";
import styles from "./Contact.module.css";

import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
} from "react-icons/fa";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://the-royal-king-interior-studio.onrender.com";

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
    setFormData((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setSuccess("");

      const controller = new AbortController();

      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 30000);

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),

        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Message could not be sent."
        );
      }

      setSuccess("Message sent successfully.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      if (error.name === "AbortError") {
        alert("Server is taking too long. Please try again.");
      } else {
        alert(error.message || "Server Error");
      }
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

        <a href="mailto:amirkhan20122026@gmail.com">
          <FaEnvelope />
          <span>amirkhan20122026@gmail.com</span>
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
          href="https://maps.google.com/?q=Hapur Uttar Pradesh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaMapMarkerAlt />
          <span>Hapur, Uttar Pradesh</span>
        </a>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <textarea
          rows="6"
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {success && (
        <p className={styles.success}>
          {success}
        </p>
      )}
    </section>
  );
}

export default Contact;