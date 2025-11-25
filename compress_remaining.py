#!/usr/bin/env python3
"""
Compress remaining large images
"""

import os
from PIL import Image

def compress_image(input_path, output_path, quality=85, max_width=1920, max_height=1080):
    try:
        with Image.open(input_path) as img:
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                if img.mode in ('RGBA', 'LA'):
                    background.paste(img, mask=img.split()[-1])
                    img = background
            
            original_size = img.size
            if img.width > max_width or img.height > max_height:
                img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
                print(f"  Resized from {original_size} to {img.size}")
            
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            original_size_mb = os.path.getsize(input_path) / (1024 * 1024)
            compressed_size_mb = os.path.getsize(output_path) / (1024 * 1024)
            reduction = ((original_size_mb - compressed_size_mb) / original_size_mb) * 100
            
            print(f"  Original: {original_size_mb:.2f} MB")
            print(f"  Compressed: {compressed_size_mb:.2f} MB") 
            print(f"  Reduction: {reduction:.1f}%")
            
            return True
            
    except Exception as e:
        print(f"  ERROR: {str(e)}")
        return False

def main():
    remaining_images = [
        "assets/images/articles/ttaa-event-1.jpg",
        "assets/images/articles/ttaa-event-2.jpg", 
        "assets/images/articles/ttaa-event-3.jpg",
        "assets/images/articles/ttaa-event-4.jpg"
    ]
    
    print("🖼️  Compressing remaining large images...")
    
    total_original = 0
    total_compressed = 0
    
    for img_path in remaining_images:
        if os.path.exists(img_path):
            file_size = os.path.getsize(img_path) / (1024 * 1024)
            if file_size > 1.0:  # Only compress files > 1MB
                print(f"\n📁 Processing: {os.path.basename(img_path)}")
                
                backup_path = img_path + ".backup"
                if not os.path.exists(backup_path):
                    import shutil
                    shutil.copy2(img_path, backup_path)
                    print(f"  ✅ Backup created")
                
                original_size = os.path.getsize(img_path) / (1024 * 1024)
                total_original += original_size
                
                temp_path = img_path + ".compressed.jpg"
                if compress_image(img_path, temp_path, quality=85):
                    compressed_size = os.path.getsize(temp_path) / (1024 * 1024)
                    total_compressed += compressed_size
                    os.replace(temp_path, img_path)
                    print(f"  ✅ Compressed successfully!")
                else:
                    if os.path.exists(temp_path):
                        os.remove(temp_path)
            else:
                print(f"⏭️  Skipping {os.path.basename(img_path)} (< 1MB)")
    
    print(f"\n🎯 Additional compression saved: {total_original - total_compressed:.2f} MB")

if __name__ == "__main__":
    main()