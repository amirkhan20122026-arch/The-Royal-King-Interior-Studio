import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import Preloader from "./components/Preloader/Preloader";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import GalleryAdmin from "./pages/GalleryAdmin";
import ProjectAdmin from "./pages/ProjectAdmin";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin" element={<AdminLogin />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gallery-admin"
        element={
          <ProtectedRoute>
            <GalleryAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/project-admin"
        element={
          <ProtectedRoute>
            <ProjectAdmin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;