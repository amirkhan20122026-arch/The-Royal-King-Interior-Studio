import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [messagesResponse, projectsResponse] =
        await Promise.all([
          fetch(`${API_URL}/api/messages`),
          fetch(`${API_URL}/api/projects`),
        ]);

      const messagesData = await messagesResponse.json();
      const projectsData = await projectsResponse.json();

      if (messagesData.success) {
        setMessages(messagesData.messages);
      }

      if (projectsData.success) {
        setProjects(projectsData.projects);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }

    fetchDashboardData();
  }, [navigate]);

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/messages/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);

        setMessages((currentMessages) =>
          currentMessages.filter(
            (message) => message._id !== id
          )
        );
      } else {
        alert(data.message || "Message delete failed");
      }
    } catch (error) {
      console.error("Delete message error:", error);
      alert("Unable to delete message");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin", { replace: true });
  };

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
            <h2>{projects.length}</h2>
            <p>Total Projects</p>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <h2 className={styles.tableTitle}>
            Contact Messages
          </h2>

          {loading ? (
            <p className={styles.noData}>
              Loading messages...
            </p>
          ) : messages.length === 0 ? (
            <p className={styles.noData}>
              No Messages Found
            </p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.message}</td>

                    <td>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() =>
                          deleteMessage(item._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;