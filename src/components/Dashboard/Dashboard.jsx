import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";


function Dashboard() {

    const navigate = useNavigate();

  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/messages");
      const data = await res.json();

      if (data.success) {
        setMessages(data.messages);
      }

    } catch (err) {
      console.log(err);
    }

  };

  
      const logout = () => {

  localStorage.removeItem("token");

  navigate("/admin");

};

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

        navigate("/admin");

    }

}, [navigate]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {

    if (!window.confirm("Delete this message?")) return;

    try {

      const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {

        alert("Message Deleted Successfully");

        fetchMessages();

      }


    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className={styles.dashboard}>

      <aside className={styles.sidebar}>

        <h2 className={styles.logo}>Royal King</h2>

        <ul className={styles.menu}>
          <li className={styles.active}>🏠 Dashboard</li>
          <li>📩 Messages</li>
          <li>🖼 Gallery</li>
          <li>📂 Projects</li>
          <li>🚪 Logout</li>
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

          <div className={styles.card}>
            <h2>0</h2>
            <p>Gallery Images</p>
          </div>

        </div>

        <div className={styles.tableContainer}>

          <h2 className={styles.tableTitle}>Contact Messages</h2>

          {
            messages.length === 0 ?

              <p className={styles.noData}>
                No Messages Found
              </p>

              :

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

                  {
                    messages.map((item) => (

                      <tr key={item._id}>

                        <td>{item.name}</td>

                        <td>{item.email}</td>

                        <td>{item.phone}</td>

                        <td>{item.message}</td>

                        <td>

                          <button
                            className={styles.deleteBtn}
                            onClick={() => deleteMessage(item._id)}
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

          }

        </div>

      </main>

    </div>

  );

}

export default Dashboard;