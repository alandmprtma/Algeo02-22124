function handleFileUpload(event) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("image", file);

  // Kirim data ke server menggunakan fetch atau axios
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
  .then(response => {
    // Tangani respons dari server
  })
  .catch(error => {
    // Tangani kesalahan
  });
}

function ImageHandler() {
  return (
    <div className="">
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default ImageHandler;
