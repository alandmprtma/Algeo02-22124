from color_descriptor import ColorDescriptor
from color_searcher import ColorSearcher
import math
import cv2
import csv
import time

start_time = time.perf_counter()
gambar = "src/uploads/uploaded.jpg" # Lokasi gambar query

cd = ColorDescriptor((8, 12, 3)) # Inisiasi ColorDescriptor dengan tuple parameter (8, 12, 3)
query = cv2.imread(gambar) # Membaca gambar query dengan OpenCV
features = cd.describe(query) # Mendeskripsikan fitur warna dari gambar query dengan ColorDescriptor

searcher = ColorSearcher('src/conf/conf_color.csv') # Inisiasi ColorSearcher dengan path indeks di src
results = searcher.search(features) # Melakukan pencarian kemiripan fitur dengan fitur query

# cv2.imshow("Gambar yang dicari", query) # Menampilkan gambar query

i = 0
with open('src/conf/result.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Nama File", "Persentase Kemiripan"])
    for (score, resultID) in results:
        if score * 100 > 60:  # Hanya tampilkan jika kemiripan di atas 60%
            result = cv2.imread(resultID) # Membaca gambar hasil dengan OpenCV
            # cv2.imshow("Hasil", result) # Menampilkan hasil
            # print(f"Kemiripan: {math.floor(score * 100):.2f}%") # Menampilkan persentase kemiripan
            writer.writerow([resultID, f"{math.floor(score * 100):.2f}%"])
            print(i)
            i += 1
            # cv2.waitKey(0) # Menunggu pengguna menekan tombol
end_time = time.perf_counter()

elapsed_time = end_time - start_time
print(f"Elapsed time: {elapsed_time}")