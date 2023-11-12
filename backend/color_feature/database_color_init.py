from joblib import Parallel, delayed
import csv
import glob
import cv2

from color_descriptor import ColorDescriptor
from color_searcher import ColorSearcher

# Inisialisasi ColorDescriptor dan Searcher dengan parameter yang sesuai
cd = ColorDescriptor((8, 12, 3), blocks=4)
searcher = ColorSearcher(indexPath="src/conf/conf.csv", blocks=4)  # Inisiasi ColorSearcher dengan path indeks di src

output_path = "src/conf/conf.csv" # Lokasi hasil ekstraksi gambar di dataset

def process_image(imagePath):
    imageID = imagePath[imagePath.rfind("/") + 1:] # Mendapatkan ID gambar dari path
    image = cv2.imread(imagePath) # Membaca gambar menggunakan OpenCV

    # Gunakan describe dari ColorDescriptor untuk mendapatkan vektor fitur
    features = cd.describe(image)

    # Tulis data ke CSV
    return {'imageID': imageID, 'features': features}

with open(output_path, 'w', newline='') as csvfile: # Penulisan file CSV
    writer = csv.writer(csvfile)

    # Proses pencarian dan penyimpanan data ke CSV menggunakan parallel processing
    results = Parallel(n_jobs=-1)(delayed(process_image)(imagePath) for imagePath in glob.glob("src/database/*"))

    # Menulis hasil ke dalam file CSV
    for result in results:
        writer.writerow([result['imageID']] + result['features'])

