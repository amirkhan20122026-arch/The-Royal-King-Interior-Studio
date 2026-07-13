
import { useEffect, useMemo, useState } from "react";
import styles from "./Gallery.module.css";
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/gallery"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gallery load failed");
      }

      if (data.success) {
        setImages(data.images);
      }
    } catch (error) {
      console.error("Gallery fetch error:", error);
      setError("Gallery images load nahi ho paayi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = images.map(
      (item) => item.category || "Other"
    );

    return ["All", ...new Set(uniqueCategories)];
  }, [images]);

  const filteredImages = useMemo(() => {
    return images.filter((item) => {
      const itemCategory = item.category || "Other";

      const matchCategory =
        category === "All" || itemCategory === category;

      const matchSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [images, category, search]);

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNextImage = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === filteredImages.length - 1
        ? 0
        : currentIndex + 1
    );
  };

  const showPreviousImage = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === 0
        ? filteredImages.length - 1
        : currentIndex - 1
    );
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (selectedIndex === null) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedIndex, filteredImages.length]);

  useEffect(() => {
    setSelectedIndex(null);
  }, [category, search]);

  return (
    <section id="gallery" className={styles.gallery}>
      <h2>Our Gallery</h2>

      <div className={styles.filterButtons}>
        {categories.map((itemCategory) => (
          <button
            type="button"
            key={itemCategory}
            className={
              category === itemCategory ? styles.active : ""
            }
            onClick={() => setCategory(itemCategory)}
          >
            {itemCategory}
          </button>
        ))}
      </div>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search Gallery..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading && (
        <p className={styles.statusMessage}>
          Loading Gallery...
        </p>
      )}

      {!loading && error && (
        <div className={styles.errorBox}>
          <p>{error}</p>

          <button type="button" onClick={fetchImages}>
            Try Again
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        filteredImages.length === 0 && (
          <p className={styles.statusMessage}>
            No gallery images found.
          </p>
        )}

      {!loading &&
        !error &&
        filteredImages.length > 0 && (
          <div className={styles.container}>
            {filteredImages.map((item, index) => (
              <div className={styles.card} key={item._id}>
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.title}
                  onClick={() => setSelectedIndex(index)}
                />

                <div className={styles.overlay}>
                  <h3>{item.title}</h3>

                  <p>{item.category || "Other"}</p>

                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                  >
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      {selectedIndex !== null &&
        filteredImages[selectedIndex] && (
          <div
            className={styles.lightbox}
            onClick={closeLightbox}
          >
            <button
              type="button"
              className={styles.close}
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
            >
              ✕
            </button>

            <button
              type="button"
              className={styles.prev}
              onClick={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
            >
              ◀
            </button>

           <img
  src={`${API_URL}/uploads/${filteredImages[selectedIndex].image}`}
  alt={filteredImages[selectedIndex].title}
  onClick={(event) => event.stopPropagation()}
  draggable="false"
/>

            <button
              type="button"
              className={styles.next}
              onClick={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
            >
              ▶
            </button>

            <p className={styles.counter}>
              {selectedIndex + 1} / {filteredImages.length}
            </p>
          </div>
        )}
    </section>
  );
}

export default Gallery;