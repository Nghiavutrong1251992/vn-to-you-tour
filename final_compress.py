from PIL import Image
import os

files = [
    'assets/images/articles/z6090017153886_ffbca35d9be7354bb16c685229dd04a9.jpg',
    'assets/images/articles/z6289253175222_ae6e8ca6a28e8c951b35dd8ae2efbf69.jpg', 
    'assets/images/articles/z6289543531801_03084483d71cf347a84d0a41242e7a1c.jpg',
    'assets/images/articles/z6325430711638_e363f521e6edcbb44e4cb8f1c067fa8b.jpg'
]

for f in files:
    if os.path.exists(f):
        print(f'Compressing: {os.path.basename(f)[:40]}')
        original_size = os.path.getsize(f) / (1024*1024)
        
        with Image.open(f) as img:
            if img.width > 1920 or img.height > 1080:
                img.thumbnail((1920, 1080), Image.Resampling.LANCZOS)
                print(f'  Resized to: {img.size}')
            img.save(f, 'JPEG', quality=75, optimize=True)
        
        new_size = os.path.getsize(f) / (1024*1024)
        reduction = ((original_size - new_size) / original_size) * 100
        print(f'  {original_size:.2f}MB → {new_size:.2f}MB (-{reduction:.1f}%)')