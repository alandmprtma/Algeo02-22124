import React from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import CameraUploader from './components/CameraUploader';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Ga-Reela</h1>
        <h3>Image Retrieval System</h3>

        <nav>
          <button>
            <Link to="/upload">Image Upload</Link>
          </button>
          <button>
            <Link to="/camera">Camera Upload</Link>
          </button>
        </nav>

        <Routes>
          <Route path="/upload" element={< ImageUploader />} />
          <Route path="/camera" element={< CameraUploader />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
