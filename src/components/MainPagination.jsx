// ImagePagination.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImagePagination = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // Panggil endpoint backend yang menyediakan data JSON
    axios.get('../conf/images.json')
      .then((response) => {
        console.log('Data dari server:', response.data);
        setImages(response.data.images);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const indexOfLastImage = currentPage * itemsPerPage;
  const indexOfFirstImage = indexOfLastImage - itemsPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {currentImages.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={image.name} />
          <p>Persentase Kemiripan: {image.similarity}%</p>
        </div>
      ))}

      <ul>
        {Array.from({ length: Math.ceil(images.length / itemsPerPage) }).map((_, index) => (
          <li key={index}>
            <button onClick={() => paginate(index + 1)}>{index + 1}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImagePagination;