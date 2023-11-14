from texture_searcher import TextureSearcher
import cv2
import csv
import time
import math
import texture_descriptor

start_time = time.perf_counter()
gambar = "src/uploads/uploaded.jpg" # Lokasi gambar query

# Membaca gambar query dengan OpenCV
query = cv2.imread(gambar)
r, g, b = cv2.split(query)

# Mendeskripsikan fitur tekstur dari gambar query dengan Tekstur_Feature
features = texture_descriptor.Tekstur_Feature(query, r, g, b)

# Inisiasi TextureSearcher dengan path indeks di src
searcher = TextureSearcher('src/conf/conf_texture.csv')

# Melakukan pencarian kemiripan fitur dengan fitur query
results = searcher.search(features)

match = 0
with open('src/conf/result_texture.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Nama File", "Persentase Kemiripan"])
    for (score, resultID) in results:
        if score * 100 > 60:  # Hanya tampilkan jika kemiripan di atas 60%
            match += 1
            writer.writerow([resultID, f"{math.floor(score * 100):.2f}%"])

end_time = time.perf_counter()
elapsed_time = end_time - start_time

with open('src/conf/time_texture.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Elapsed Time", "Number of Matches"])
    writer.writerow([elapsed_time, match])