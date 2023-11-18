# Algeo02-22124 - Ga-Reela
## Table of Contents
- [Algeo01-22126 - Ga-Reela](#algeo02-22124---ga-reela)
  - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Contributor](#contributor)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Structure](#structure)
  - [How to Use](#how-to-use)
    - [Dependencies](#dependencies)
    - [Installation](#installation)
    - [Program Execution](#program-execution)

## General Information
A website for CBIR (Content-Based Image Retrieval) developed in Python. This website allows users to search for images based on the content of the image. Users can upload a folder of datasets and images they want to search, select search parameters (color or texture), and view search results sorted by similarity score. This website also supports real-time image capture via webcam and image extraction from certain websites.

## Contributor
- 13522124 Aland Mulia Pratama
- 13522126 Rizqika Mulia Pratama
- 13522147 Ikhwan Al Hakim

## Technologies Used
- Python
- React JS
- FastAPI

## Features
- Users can upload a dataset folder and an image.
- Displays the selected image.
- Toggle for selecting search parameter (color or texture).
- Computes similarity scores between input image and dataset using chosen parameter.
- Presents output with descending sorting based on similarity scores.
- Implements pagination for limiting displayed images.
- Shows the count of images with similarity > 60%.
- Real-time image capture through webcam.
- Extracts images from a specified website.

## Structure

```
Algeo02-22124
├── back-end
│   ├── app
│   │    └── api.py
│   ├── feature
│   │    ├── color_descriptor.py
│   │    ├── color_runner.py
│   │    ├── color_searcher.py
│   │    ├── database_init.py
│   │    ├── texture_descriptor.py
│   │    ├── texture_runner.py
│   │    └── texture_searcher.py
│   └── main.py
├── src (front-end)
│   ├── assets
│   ├── components
│   │    ├── Aboutus.jsx
│   │    ├── CameraUploader.js
│   │    ├── Cbir.jsx
│   │    ├── Cybereye.jsx
│   │    ├── DatasetUploader.js
│   │    ├── Home.jsx
│   │    ├── ImageScraper.js
│   │    ├── ImageUploader.js
│   │    ├── MainPagination.jsx
│   │    └── Navbar.jsx
│   ├── conf
│   │    ├── conf_color.csv
│   │    ├── conf_texture.csv
│   │    ├── hasil.json
│   │    ├── result_color.json
│   │    └── result_texture.json
│   ├── database
│   ├── fonts
│   └── uploads
│          └── uploads.jpg
├── App.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals
└── setupTests.js
```

---

## How to Use

### Dependencies
- Java Virtual Environment
- Java Development Kit

### Installation
- Download and install [Python](https://www.python.org/downloads/)
- Download and install [Node JS](https://nodejs.org/en/)
- Download all folder and files on this repository or simply clone this repo!
- Download all dependencies

### Program Execution
    git clone https://github.com/alandmprtma/Algeo02-22124
    cd Algeo02-22124
    npm start

From Ga-Reela, with love <3
![image](https://github.com/rizqikapratamaa/Algeo01-22126/blob/5c9a30ef98e3573cfa9463abbc5d19f58662a9eb/cover.jpg)