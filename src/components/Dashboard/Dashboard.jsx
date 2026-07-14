import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/messages"
      );

      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin", { replace: true });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Royal King</h2>

        <ul className={styles.menu}>
          <li
            className={styles.active}
            onClick={() => navigate("/dashboard")}
          >
            🏠 Dashboard
          </li>

          <li onClick={() => navigate("/dashboard")}>
            📩 Messages
          </li>

          <li onClick={() => navigate("/project-admin")}>
            📂 Projects
          </li>

          <li onClick={logout}>
            🚪 Logout
          </li>
        </ul>
      </aside>

      <main className={styles.content}>
        <h1>Admin Dashboard</h1>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>{messages.length}</h2>
            <p>Total Messages</p>
          </div>

          <div className={styles.card}>
            <h2>0</h2>
            <p>Total Projects</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;