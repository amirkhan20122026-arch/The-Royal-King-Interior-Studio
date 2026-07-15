import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GalleryAdmin from "./pages/GalleryAdmin";
import ProjectAdmin from "./pages/ProjectAdmin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>
              <GalleryAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <ProjectAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;