#!/usr/bin/env python3
"""
Image Compression Script for VN to You Tour
Compresses large images while maintaining quality
"""

import os
from PIL import Image
import sys

def compress_image(input_path, output_path, quality=85, max_width=1920, max_height=1080):
    """
    Compress an image with specified quality and max dimensions
    """
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for PNG with transparency)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create white background for transparent images
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                if img.mode in ('RGBA', 'LA'):
                    background.paste(img, mask=img.split()[-1])
                    img = background
            
            # Resize if image is too large
            original_size = img.size
            if img.width > max_width or img.height > max_height:
                img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
                print(f"  Resized from {original_size} to {img.size}")
            
            # Save with compression
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # Get file sizes
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
    # Define large image files to compress
    large_images = [
        "assets/images/team/thong.png",
        "assets/images/team/intan.png", 
        "assets/images/team/thanh-ngan.png",
        "assets/images/team/ruby.png",
        "assets/images/team/lulu.png",
        "assets/images/team/mai.png",
        "assets/images/articles/bangioc/z6644508802262_f928a460e566c9d83ce369f122b651d5.jpg",
        "assets/images/articles/bangioc/z6644509810275_612703877be69d6e367e9710acaafe1f-1.jpg",
        "assets/images/articles/bangioc/z6644507486039_dd6a4ec286ce44964d50b64cd9a9944b.jpg",
        "assets/images/articles/bangioc/z6644508212358_2cf928a58e6d37551a640a5156a70920.jpg",
        "assets/images/general/ttaa-event-4.jpg",
        "assets/images/general/ttaa-event-2.jpg",
        "assets/images/general/ttaa-event-3.jpg",
        "assets/images/car-rental/car-rental-intro.jpg"
    ]
    
    print("🖼️  Starting image compression...")
    print("=" * 50)
    
    total_original = 0
    total_compressed = 0
    success_count = 0
    
    for img_path in large_images:
        if os.path.exists(img_path):
            print(f"\n📁 Processing: {os.path.basename(img_path)}")
            
            # Create backup
            backup_path = img_path + ".backup"
            if not os.path.exists(backup_path):
                import shutil
                shutil.copy2(img_path, backup_path)
                print(f"  ✅ Backup created: {backup_path}")
            
            # Get original size
            original_size = os.path.getsize(img_path) / (1024 * 1024)
            total_original += original_size
            
            # Compress
            temp_path = img_path + ".compressed.jpg"
            if compress_image(img_path, temp_path, quality=85, max_width=1920, max_height=1080):
                # Replace original with compressed version
                compressed_size = os.path.getsize(temp_path) / (1024 * 1024)
                total_compressed += compressed_size
                
                # Replace original file
                os.replace(temp_path, img_path.rsplit('.', 1)[0] + '.jpg')
                success_count += 1
                print(f"  ✅ Compressed successfully!")
            else:
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                total_compressed += original_size  # Count as no reduction
                
        else:
            print(f"\n❌ File not found: {img_path}")
    
    # Summary
    print("\n" + "=" * 50)
    print(f"🎯 COMPRESSION SUMMARY:")
    print(f"   Files processed: {success_count}/{len(large_images)}")
    print(f"   Total original size: {total_original:.2f} MB")
    print(f"   Total compressed size: {total_compressed:.2f} MB")
    if total_original > 0:
        total_reduction = ((total_original - total_compressed) / total_original) * 100
        print(f"   Total reduction: {total_reduction:.1f}%")
        print(f"   Space saved: {total_original - total_compressed:.2f} MB")
    print("=" * 50)
    
    if success_count > 0:
        print(f"\n🚀 Compression complete! Your bandwidth usage should be significantly reduced.")
        print(f"💡 Note: Original files are backed up with .backup extension")

if __name__ == "__main__":
    main()