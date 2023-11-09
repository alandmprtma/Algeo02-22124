import React, { useState } from 'react';
import axios from 'axios';
// import { BrowserRouter as Link } from 'react-router-dom';

function ImageUploader() {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const onUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file, "uploaded.jpg");

      try {
        await axios.post('http://localhost:8000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Gambar berhasil diunggah.');
      } catch (error) {
        console.error('Error mengunggah gambar:', error);
      }
    } else {
      alert('Pilih sebuah gambar terlebih dahulu.');
    }
  };

  return (
    <div>
      {/* <nav>
        <button>
          <Link to="/">Home</Link>
        </button>
      </nav> */}
      <input type="file" onChange={onFileChange} />
      <button onClick={onUpload}>Unggah Gambar</button>
    </div>
  );
}

export default ImageUploader;
