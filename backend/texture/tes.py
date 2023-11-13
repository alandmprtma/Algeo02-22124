import time
import texture
import cv2
import os

# Start timer
start_time = time.perf_counter()

# Code to be timed
# ...
image1 = cv2.imread('backend/texture/singa1.jpg')

r1, g1, b1 = cv2.split(image1)
Contrast1, Homogenity1, Entropy1 = texture.Tekstur_Feature(image1,r1,g1,b1)

path = 'backend/texture/tes'
daftar_file = os.listdir(path)
#mengakses gambar dari folder/datasets

i = 2
for nama_file in daftar_file:
    start = time.perf_counter()
    image2 = cv2.imread(os.path.join(path, nama_file))
    r2, g2, b2 = cv2.split(image2)
    totcon2,tothom2,totent2 = texture.Tekstur_Feature(image2, r2, g2, b2)
    sim = texture.similarity(Contrast1, Homogenity1, Entropy1, totcon2, tothom2, totent2)
    print(f"Tingkat kecocokan gambar {1} & {nama_file} = {sim}")
    end_time = time.perf_counter()
    elapsed_time = end_time - start 
    print("Elapsed time: ", elapsed_time)
    i += 1
# End timer
ended = time.perf_counter()
# Calculate elapsed time
elapsed_time = ended - start_time
print("Total Elapsed time: ", elapsed_time)