import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

function GalleryAdmin() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/gallery");
      const data = await response.json();

      if (data.success) {
        setImages(data.images);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter image title");
      return;
    }

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("image", image);

      const response = await fetch(
        "http://localhost:5000/api/gallery",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      alert(data.message);

      setTitle("");
      setImage(null);

      document.getElementById("galleryImage").value = "";

      fetchImages();
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this image?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/gallery/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        fetchImages();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to delete image");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Gallery Management</h1>

      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <input
          id="galleryImage"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      <hr style={{ margin: "40px 0" }} />

      <h2>Uploaded Images</h2>

      {images.length === 0 ? (
        <p>No gallery images found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {images.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 5px 15px rgba(0,0,0,.12)",
              }}
            >
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "15px" }}>
                <h3>{item.title}</h3>

                <button
                  onClick={() => deleteImage(item._id)}
                  style={{
                    marginTop: "12px",
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#dc3545",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryAdmin;    