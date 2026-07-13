import { useEffect, useState } from "react";
import styles from "./DynamicProjects.module.css";

function DynamicProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/projects"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load projects");
      }

      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Fetch projects error:", error);
      setError("Projects load nahi ho paaye.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className={styles.projects}
    >
      <div className={styles.heading}>
        <span>Our Portfolio</span>
        <h2>Latest Interior Projects</h2>

        <p>
          Explore our recently completed interior design projects.
        </p>
      </div>

      {loading && (
        <div className={styles.loading}>
          Loading Projects...
        </div>
      )}

      {!loading && error && (
        <div className={styles.error}>
          <p>{error}</p>

          <button
            type="button"
            onClick={fetchProjects}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className={styles.noProjects}>
          No projects found.
        </p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className={styles.grid}>
          {projects.map((project) => (
            <article
              className={styles.card}
              key={project._id}
            >
              <div className={styles.imageBox}>
                <img
                  src={`http://localhost:5000/uploads/${project.image}`}
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