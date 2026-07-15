import { useEffect, useState } from "react";
import styles from "./DynamicProjects.module.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://the-royal-king-interior-studio.onrender.com";

function DynamicProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/projects`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects || []);
      } else {
        throw new Error(
          data.message || "Projects load failed"
        );
      }
    } catch (error) {
      console.error("Projects fetch error:", error);
      setError(
        "Projects abhi load nahi ho pa rahe. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.heading}>
        <span>Our Portfolio</span>

        <h2>Latest Interior Projects</h2>

        <p>
          Explore our recently completed interior design
          projects.
        </p>
      </div>

      {loading && (
        <div className={styles.statusBox}>
          <div className={styles.loader}></div>
          <p>Loading projects...</p>
        </div>
      )}

      {!loading && error && (
        <div className={styles.errorBox}>
          <h3>Unable to load projects</h3>
          <p>{error}</p>

          <button type="button" onClick={fetchProjects}>
            Try Again
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        projects.length === 0 && (
          <div className={styles.statusBox}>
            <p>No projects have been added yet.</p>
          </div>
        )}

      {!loading &&
        !error &&
        projects.length > 0 && (
          <div className={styles.grid}>
            {projects.map((project) => (
              <article
                className={styles.card}
                key={project._id}
              >
                <div className={styles.imageBox}>
                  <img
                    src={`${API_URL}/uploads/${project.image}`}
                    alt={project.title}
                  />

                  <div className={styles.overlay}>
                    <span>View Project</span>
                  </div>
                </div>

                <div className={styles.content}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
    </section>
  );
}

export default DynamicProjects;