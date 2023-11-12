from color_descriptor import ColorDescriptor
from color_searcher import ColorSearcher
import math
import cv2

gambar = "src/uploads/uploaded.jpg" # Lokasi gambar query

cd = ColorDescriptor((8, 12, 3)) # Inisiasi ColorDescriptor dengan tuple parameter (8, 12, 3)
query = cv2.imread(gambar) # Membaca gambar query dengan OpenCV
features = cd.describe(query) # Mendeskripsikan fitur warna dari gambar query dengan ColorDescriptor

searcher = ColorSearcher('src/conf/conf.csv') # Inisiasi ColorSearcher dengan path indeks di src
results = searcher.search(features) # Melakukan pencarian kemiripan fitur dengan fitur query

cv2.imshow("Gambar yang dicari", query) # Menampilkan gambar query

i = 0
for (score, resultID) in results:
    if score * 100 > 60:  # Hanya tampilkan jika kemiripan di atas 60%
        result = cv2.imread(resultID) # Membaca gambar hasil dengan OpenCV
        cv2.imshow("Hasil", result) # Menampilkan hasil
        print(f"Kemiripan: {math.floor(score * 100):.2f}%") # Menampilkan persentase kemiripan
        print(i)
        i += 1
        cv2.waitKey(0) # Menunggu pengguna menekan tombol
