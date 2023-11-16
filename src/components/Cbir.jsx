import React from 'react'
import Bg from'../assets/background-website.jpg'
import logo from '../assets/ga-reela-high-resolution-logo-white-transparent-crop.png'
import icon from '../assets/upload-icons-white.png'
import upload from '../uploads/uploaded.jpg'
import ImageUploader from './ImageUploader'
import CameraUploader from './CameraUploader'
import { useState } from 'react';
import Switch from './Switch'
import DatasetUploader from './DatasetUploader'
// import Pagination from './Pagination.jsx'
import aland from '../assets/Aland.jpg'
import foto1 from '../assets/foto1.png'
import qika from '../assets/qika.jpg'
import ikhwan from '../assets/ikhwan.jpg'
import ImageScraper from './ImageScraper'



const Cbir = () => {
  const [uploadMode, setUploadMode] = useState('image'); // 'image' or 'camera'
  const [uploadedImage, setUploadedImage] = useState(null);

  const toggleUploadMode = () => {
    setUploadMode((prevMode) => (prevMode === 'image' ? 'camera' : 'image'));
  };

  const handleImageUpload = (image) => {
    // Logic to handle image upload and set it in state
    setUploadedImage(image);
  };

  const images = [foto1, aland, ikhwan, qika];

  return (
    <section className='text-center flex flex-col items-center gap-y-4 pt-8'>
      <img src={Bg} className='w-full h-full top-0 fixed left-0 z-[-100] object-cover'/>
      <img src={logo} className='h-[150px] object-cover'/>    
      <h1 className='font-inter-bold text-4xl text-white mt-6'> Reverse Image Search </h1>
      <article className='flex w-[80%] gap-x-[100px] justify-center mt-10'>
      <div className='rounded my-2 w-[550px] h-[350px] relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[10px] after:-z-1 flex items-center justify-center after:rounded'>
            <div className='relative z-10 bg-primary rounded w-[99%] h-[99%] p-4 flex justify-center items-center text-white'>
            <img src={upload || icon} className='h-full w-full object-cover'/>  
            </div>
          </div>
          
      <div className ='w-[400px]'>
       <p className='font-inter-bold mt-7 text-2xl text-white text-left'>Image Input</p>
       <div className='flex flex-col items-center'>
       <div className='rounded my-2 w-full h-full relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-5 before:rounded
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[10px] after:-z-1 flex items-center justify-center after:rounded'>
            <div className='relative z-10 bg-primary rounded w-[99.3%] h-[99%] pb-[50px] p-4 flex justify-center items-center text-white'>
              {uploadMode === 'image' ? (
                <ImageUploader/>
              ) : (
                <CameraUploader/>
              )}
            </div>
       </div>
        <div className='rounded my-[25px] w-[250px] h-[35px] relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded-[20px]
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[20px] after:-z-1 flex items-center justify-center after:rounded-[15px]'>
        <button className={`font-inter-bold text-xl text-white z-10 ${uploadMode === 'image'}`} onClick={toggleUploadMode}> 
        {uploadMode === 'image' ? 'Switch to Camera' : 'Switch to Image'}
      </button>
      </div>
      < Switch/>
       <div className='rounded my-[25px] w-[175px] h-[35px] relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded-[20px]
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[20px] after:-z-1 flex items-center justify-center after:rounded-[15px]'>
            <p className='font-inter-bold text-xl text-white z-10'>Search</p>
          </div>
        </div>
      </div>
      </article>
      <article className='w-[80%] flex flex-col items-center'>
       <div className="bg-white h-[2px] w-full"/>
       <div className=" flex flex-row relative h-[900px] w-full justify-between">
        <div className='flex items-start h-[25px]'>
        <h2 className='font-inter-bold text-xl text-white mt-6 h-fit'> Result : </h2>
       </div>
       <div>
        <h2 className='font-inter text-xl text-white mt-6 h-fit'> 20 results in 0.20 seconds</h2>
       </div>
      </div>
       <div className="bg-white h-[2px] w-full"/>
       <div className='mt-8 mb-10 w-[250px] h-[35px] relative'>
           <DatasetUploader/>
           <ImageScraper/>
        </div>
        <div className='h-[100px] w-full'/>
      </article>
    </section>
    
  )
}

export default Cbir