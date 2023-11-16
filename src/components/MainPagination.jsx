import React, { useState, useEffect } from 'react';

const MainPagination = ({ imageData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]); // State untuk menyimpan gambar

  const itemsPerPage = 6;
  const imagesPerRow = 3;

  const imageKeys = Object.keys(imageData).filter(key => key !== 'Elapsed Time' && key !== 'Number of Matches');
  const totalPages = Math.ceil(imageKeys.length / itemsPerPage);

  useEffect(() => {
    displayImages();
  }, [currentPage]); // Menjalankan displayImages setiap kali currentPage berubah

  const displayImages = async () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageImages = imageKeys.slice(startIndex, endIndex);

    const images = await Promise.all(pageImages.map(async (key, index) => {
      const { default: ImageComponent } = await import(/* webpackMode: "eager" */ `../database/${key}`);
      
      return (
      <div key={index} className="image-item-wrapper w-[33.33%] p-2">
        <img
          key={index}
          src={ImageComponent}
          alt={key}
          className="image-item h-[350px] w-[350px] object-cover"
        />
      </div>
      );
    }));

    // Menggunakan setState atau fungsi render kembali untuk memperbarui tampilan setelah import selesai
    setImages(images);
  };

  const createPaginationButtons = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1).map((page, index) => (
      <button
        key={index}
        className={`pagination-button ${currentPage === page ? 'active' : ''}`}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div>
      <div className="image-container">{images}</div>
      <div className="pagination-container">{createPaginationButtons()}</div>
    </div>
  );
};

export default MainPagination;