import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
const API_URL = import.meta.env.VITE_API_URL;

import gallery1 from "../../assets/gallery1.jpg";
import gallery2 from "../../assets/gallery2.jpg";
import gallery3 from "../../assets/gallery3.jpg";
import gallery4 from "../../assets/gallery4.jpg";
import gallery5 from "../../assets/gallery5.jpg";
import gallery6 from "../../assets/gallery6.jpg";

function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const images = [
    {
      id: 1,
      image: gallery1,
      title: "Luxury Living Room",
      category: "Living Room",
    },
    {
      id: 2,
      image: gallery2,
      title: "Modern Bedroom",
      category: "Bedroom",
    },
    {
      id: 3,
      image: gallery3,
      title: "Luxury Kitchen",
      category: "Kitchen",
    },
    {
      id: 4,
      image: gallery4,
      title: "Office Interior",
      category: "Office",
    },
    {
      id: 5,
      image: gallery5,
      title: "Luxury Dining Room",
      category: "Dining",
    },
    {
      id: 6,
      image: gallery6,
      title: "Luxury Bathroom",
      category: "Bathroom",
    },
  ];

  const filteredImages = images.filter((item) => {
    const matchCategory =
      category === "All" || item.category === category;

    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      }

      if (e.key === "ArrowRight") {
        setSelectedIndex(
          selectedIndex === filteredImages.length - 1
            ? 0
            : selectedIndex + 1
        );
      }

      if (e.key === "ArrowLeft") {
        setSelectedIndex(
          selectedIndex === 0
            ? filteredImages.length - 1
            : selectedIndex - 1
        );
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedIndex, filteredImages]);

  return (
    <section id="gallery" className={styles.gallery}>
      <h2>Our Gallery</h2>

      <div className={styles.filterButtons}>
        <button
          type="button"
          className={category === "All" ? styles.active : ""}
          onClick={() => setCategory("All")}
        >
          All
        </button>

        <button
          type="button"
          className={
            category === "Living Room" ? styles.active : ""
          }
          onClick={() => setCategory("Living Room")}
        >
          Living Room
        </button>

        <button
          type="button"
          className={category === "Bedroom" ? styles.active : ""}
          onClick={() => setCategory("Bedroom")}
        >
          Bedroom
        </button>

        <button
          type="button"
          className={category === "Kitchen" ? styles.active : ""}
          onClick={() => setCategory("Kitchen")}
        >
          Kitchen
        </button>

        <button
          type="button"
          className={category === "Office" ? styles.active : ""}
          onClick={() => setCategory("Office")}
        >
          Office
        </button>

        <button
          type="button"
          className={category === "Dining" ? styles.active : ""}
          onClick={() => setCategory("Dining")}
        >
          Dining
        </button>

        <button
          type="button"
          className={category === "Bathroom" ? styles.active : ""}
          onClick={() => setCategory("Bathroom")}
        >
          Bathroom
        </button>
      </div>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search Gallery..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.container}>
        {filteredImages.map((item, index) => (
          <div className={styles.card} key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              onClick={() => setSelectedIndex(index)}
            />

            <div className={styles.overlay}>
              <h3>{item.title}</h3>
              <p>{item.category}</p>

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

      {selectedIndex !== null && filteredImages[selectedIndex] && (
        <div
          className={styles.lightbox}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            className={styles.close}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
          >
            ✕
          </button>

          <button
            type="button"
            className={styles.prev}
            onClick={(e) => {
              e.stopPropagation();

              setSelectedIndex(
                selectedIndex === 0
                  ? filteredImages.length - 1
                  : selectedIndex - 1
              );
            }}
          >
            ◀
          </button>

          <img
            src={filteredImages[selectedIndex].image}
            alt={filteredImages[selectedIndex].title}
            onClick={(e) => e.stopPropagation()}
            draggable="false"
          />

          <button
            type="button"
            className={styles.next}
            onClick={(e) => {
              e.stopPropagation();

              setSelectedIndex(
                selectedIndex === filteredImages.length - 1
                  ? 0
                  : selectedIndex + 1
              );
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