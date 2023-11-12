from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel
from typing import List
from starlette.exceptions import HTTPException
import os
import shutil
import subprocess

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "src/uploads/"
UPLOAD_DATASET_FOLDER = "src/database/"

@app.on_event("startup")
async def startup_event():
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

def is_image(filename):
    allowed_extensions = {".jpg", ".jpeg", ".png"}
    return any(filename.lower().endswith(ext) for ext in allowed_extensions)

@app.post("/upload")
async def upload_file(file: UploadFile):
    if not file:
        raise HTTPException(status_code=400, detail="Tidak ada file yang diunggah.")
    
    if not is_image(file.filename):
        raise HTTPException(status_code=400, detail="Berkas yang diunggah bukan gambar.")
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    
    return JSONResponse(content={"message": "Gambar berhasil diunggah."})

@app.post("/upload-dataset")
async def upload_dataset(files: List[UploadFile] = File(...)):
    # Hapus semua file dalam direktori
    for filename in os.listdir(UPLOAD_DATASET_FOLDER):
        file_path = os.path.join(UPLOAD_DATASET_FOLDER, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

    for file in files:
        if not is_image(file.filename):
            raise HTTPException(status_code=400, detail="Berkas yang diunggah bukan gambar")
        file_path = os.path.join(UPLOAD_DATASET_FOLDER, os.path.basename(file.filename))

        with open(file_path, "wb") as f:
            f.write(file.file.read())
    
    # Jalankan skrip python setelah file diupload
    subprocess.run(["python", "backend/color_feature/database_color_init.py"], check=True)

    return JSONResponse(content={"message" : "Dataset berhasil diunggah"})
