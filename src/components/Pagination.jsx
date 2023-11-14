import React, { useState } from 'react';

const Pagination = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 5; // Ganti dengan jumlah gambar yang ingin ditampilkan per halaman

  // Fungsi untuk menampilkan gambar-gambar pada halaman tertentu
  const showImages = () => {
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    return images.slice(startIndex, endIndex);
  };

  // Fungsi untuk navigasi ke halaman sebelumnya
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fungsi untuk navigasi ke halaman berikutnya
  const goToNextPage = () => {
    if (currentPage < Math.ceil(images.length / imagesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="image-container">
        {/* Menampilkan gambar-gambar */}
        {showImages().map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>

      <div className="pagination">
        {/* Tombol navigasi */}
        <button onClick={goToPreviousPage}>Halaman Sebelumnya</button>
        <span>Halaman: {currentPage}</span>
        <button onClick={goToNextPage}>Halaman Berikutnya</button>
      </div>
    </div>
  );
};

export default Pagination;