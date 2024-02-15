import numpy as np

a = np.random.rand(5, 6, 8, 10)
print(np.sum(a, axis=(0, 1)))