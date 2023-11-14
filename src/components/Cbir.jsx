import React, { useState } from 'react';
import Bg from '../assets/background-website.jpg';
import logo from '../assets/ga-reela-high-resolution-logo-white-transparent-crop.png';
import upload from '../assets/upload-icons-white.png';
import ImageUploader from './ImageUploader';
import CameraUploader from './CameraUploader';
import DatasetUploader from './DatasetUploader'

const Cbir = () => {
  const [uploadMode, setUploadMode] = useState('image'); // 'image' or 'camera'

  const toggleUploadMode = () => {
    setUploadMode((prevMode) => (prevMode === 'image' ? 'camera' : 'image'));
  };
  
  const handleDatasetUpload = (e) => {
    const files = e.target.files;
    DatasetUploader(files);
  }

  return (
    <section className="text-center flex flex-col items-center gap-y-4 pt-8">
      <img src={Bg} className="w-full h-full top-0 fixed left-0 z-[-100] object-cover" />
      <img src={logo} className="h-[150px] object-cover" />
      <h1 className="font-inter-bold text-4xl text-white mt-6"> Reverse Image Search </h1>
      <article className="flex w-[80%] gap-x-[100px] justify-center mt-10">
        <div className="rounded my-2 w-[550px] h-[350px] relative">
          {/* ... */}
          <div className="relative z-10 bg-primary rounded w-[99%] h-[99%] p-4 flex justify-center items-center text-white">
            {uploadMode === 'image' ? (
              <ImageUploader />
            ) : (
              <CameraUploader />
            )}
          </div>
        </div>
        < DatasetUploader />
        <div className="w-[275px]">
          <p className="font-inter-bold mt-7 text-2xl text-white text-left">Image Input</p>
          <div className="flex flex-col items-center mt-[150px]">
            <div
              className="rounded my-2 w-[175px] h-[35px] relative"
            >
              {/* ... */}
              <button
                className="font-inter-bold text-xl text-white z-10"
                onClick={toggleUploadMode}
              >
                {uploadMode === 'image' ? 'Switch to Camera' : 'Switch to Image'}
              </button>
            </div>
          </div>
        </div>
      </article>
      {/* ... */}
    </section>
  );
};

export default Cbir;
