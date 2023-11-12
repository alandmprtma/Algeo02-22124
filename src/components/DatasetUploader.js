import React, { useState } from 'react';
import axios from 'axios';

const DatasetUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }

      try {
        const response = await axios.post('http://localhost:8000/upload-dataset', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response as needed
        console.log('Dataset uploaded successfully:', response.data);
      } catch (error) {
        // Handle errors
        console.error('Error uploading dataset:', error);
      }
    } else {
      // Handle case where no files are selected
      console.error('No files selected for upload.');
    }
  };

  return (
    <div>
      <h3>Dataset Uploader</h3>
      <input type='file' multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Dataset</button>
    </div>
  );
};

export default DatasetUploader;
