import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function CameraUploader() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [imageData, setImageData] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraStarted(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
    setCameraStarted(false);
  };

  const takePicture = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const dataUrl = canvas.toDataURL('image/jpeg');
      setImageData(dataUrl);
    }
  };

  const uploadPicture = async () => {
    if (imageData) {
      const blob = await fetch(imageData).then((r) => r.blob());

      const formData = new FormData();
      formData.append('file', blob, 'captured.jpg');

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
    }
  };

  return (
    <div>
      <h3>Camera Uploader</h3>
      {!cameraStarted ? (
        <button onClick={startCamera}>Start Camera</button>
      ) : (
        <button onClick={stopCamera}>Stop Camera</button>
      )}
      <button onClick={takePicture}>Take Picture</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <video ref={videoRef} autoPlay />
      <img src={imageData} alt="Captured" style={{ width: '200px' }} />
      {imageData && <button onClick={uploadPicture}>Upload Picture</button>}
    </div>
  );
}

export default CameraUploader;
