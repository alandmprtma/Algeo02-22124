import cv2
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import time

start_time = time.perf_counter()

epsilon = 1e-8  # untuk menghindari log(0)
levels = 64  # Ubah jumlah tingkat keabuan sesuai kebutuhan (misalnya: 64, 32, dsb.)

# Tentukan jarak dan arah (misalnya: horizontal, vertikal)
distance = 1
directions = [(0, 1), (1, 0), (1, 1), (-1, 1)]

# Baca gambar 1
image_A = cv2.imread('backend/app/singa.JP')

if image_A is None:
    print("Image not loaded. Please check the file path.")
else:
    # Ubah ke citra grayscale
    grayscale_image_A = cv2.cvtColor(image_A, cv2.COLOR_BGR2GRAY)

    bins = np.linspace(0, 256, levels + 1)
    quantized_image_A = np.digitize(grayscale_image_A, bins) - 1

    # Bentuk matriks co-occurrence
    co_occurrence_matrix_A = np.zeros((levels, levels), dtype=np.uint32)
    height_A, width = quantized_image_A.shape

    for y in range(height_A):
        for x in range(width):
            for dy, dx in directions:
                y2, x2 = y + dy, x + dx
                if 0 <= y2 < height_A and 0 <= x2 < width and x2 < width and y2 < height_A:
                    i, j = quantized_image_A[y, x], quantized_image_A[y2, x2]
                    co_occurrence_matrix_A[i, j] += 1


    # Menghitung contrast, entropy, dan homogeneity
    contrast_A = np.sum(np.square(np.arange(levels)[:, np.newaxis] - np.arange(levels)) * co_occurrence_matrix_A)
    entropy_A = -np.sum(co_occurrence_matrix_A * np.log(co_occurrence_matrix_A + epsilon))
    homogeneity_A = np.sum(co_occurrence_matrix_A / (1 + np.abs(np.arange(levels)[:, np.newaxis] - np.arange(levels))))

    vector_A = np.array([contrast_A, entropy_A, homogeneity_A])


# Baca gambar 2
image_B = cv2.imread('backend/app/singa1.jpg')

if image_B is None:
    print("Image not loaded. Please check the file path.")
else:
    # Ubah ke citra grayscale
    grayscale_image_B = cv2.cvtColor(image_B, cv2.COLOR_BGR2GRAY)

    levels = 64  # Ubah jumlah tingkat keabuan sesuai kebutuhan (misalnya: 64, 32, dsb.)
    bins = np.linspace(0, 256, levels + 1)
    quantized_image_B = np.digitize(grayscale_image_B, bins) - 1

    # Bentuk matriks co-occurrence
    co_occurrence_matrix_B = np.zeros((levels, levels), dtype=np.uint32)
    height, width = quantized_image_B.shape

    for y in range(height):
        for x in range(width):
            for dy, dx in directions:
                y2, x2 = y + dy, x + dx
                if 0 <= y2 < height and 0 <= x2 < width and x2 < width and y2 < height:
                    i, j = quantized_image_B[y, x], quantized_image_B[y2, x2]
                    co_occurrence_matrix_B[i, j] += 1
    # Menghitung contrast, entropy, dan homogeneity
    contrast_B = np.sum(np.square(np.arange(levels)[:, np.newaxis] - np.arange(levels)) * co_occurrence_matrix_B)
    epsilon = 1e-8  # untuk menghindari log(0)
    entropy_B = -np.sum(co_occurrence_matrix_B * np.log(co_occurrence_matrix_B + epsilon))
    homogeneity_B = np.sum(co_occurrence_matrix_B / (1 + np.abs(np.arange(levels)[:, np.newaxis] - np.arange(levels))))

    vector_B = np.array([contrast_B, entropy_B, homogeneity_B])    


vector_A = vector_A / np.linalg.norm(vector_A)
vector_B = vector_B / np.linalg.norm(vector_B)

similarity = cosine_similarity([vector_A], [vector_B])[0][0]
print("Cosine Similarity based on co-occurrence matrix:", similarity)

end_time = time.perf_counter()

# Calculate elapsed time
elapsed_time = end_time - start_time
print("Elapsed time: ", elapsed_time)

