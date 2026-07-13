import { useEffect, useState } from "react";
import styles from "./ProjectAdmin.module.css";

function ProjectAdmin() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/projects"
      );

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Fetch projects error:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter project title");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter project description");
      return;
    }

    if (!image) {
      alert("Please select project image");
      return;
    }

    try {
      setLoading(true);

      const projectData = new FormData();

      projectData.append("title", formData.title.trim());
      projectData.append(
        "description",
        formData.description.trim()
      );
      projectData.append("image", image);

      const response = await fetch(
        "http://localhost:5000/api/projects",
        {
          method: "POST",
          body: projectData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Project upload failed");
      }

      alert(data.message);

      setFormData({
        title: "",
        description: "",
      });

      setImage(null);

      const fileInput = document.getElementById("projectImage");

      if (fileInput) {
        fileInput.value = "";
      }

      fetchProjects();
    } catch (error) {
      console.error("Project upload error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        fetchProjects();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Delete project error:", error);
      alert("Unable to delete project");
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.formSection}>
        <h1>Project Management</h1>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            rows="5"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            id="projectImage"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Add Project"}
          </button>
        </form>
      </section>

      <section className={styles.projectsSection}>
        <h2>Uploaded Projects</h2>

        {projects.length === 0 ? (
          <p className={styles.noData}>
            No projects found.
          </p>
        ) : (
          <div className={styles.grid}>
            {projects.map((project) => (
              <article
                className={styles.projectCard}
                key={project._id}
              >
                <img
                  src={`http://localhost:5000/uploads/${project.image}`}
                  alt={project.title}
                />

                <div className={styles.cardContent}>
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <button
                    type="button"
                    onClick={() =>
                      deleteProject(project._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ProjectAdmin;