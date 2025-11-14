# VN to You Tour Website

## Project Structure

```
project-root/
├── index.html                    # Homepage
├── pages/
│   ├── about.html               # About Us page
│   ├── news.html                # News page
│   ├── tours-to-vietnam.html    # Main tours overview
│   └── tours/                   # Organized tours folder
│       └── private-tours/       # Private tours (parent folder)
│           ├── vietnam-north/   # Vietnam North tours
│           │   ├── index.html   # Vietnam North overview
│           │   ├── ha-long-bay-cruise.html
│           │   ├── hanoi-cultural-tour.html
│           │   ├── sapa-trekking-adventure.html
│           │   └── ninh-binh-day-trip.html
│           ├── vietnam-central/ # Vietnam Central tours (future)
│           └── vietnam-south/   # Vietnam South tours (future)
├── assets/                      # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── includes/                    # Reusable components
│   ├── header.html
│   └── footer.html
├── articles/                    # Content articles
└── README.md
```

## Features

- **Dynamic Tours**: JavaScript-powered tour listings and related tours
- **Modular Design**: Reusable header/footer components
- **Organized Structure**: Logical folder hierarchy for easy maintenance
- **Responsive**: Mobile-friendly design with modern CSS

## Adding New Tours

1. Add tour data to `assets/js/tours-data.js`
2. Create HTML file in appropriate region folder
3. Update navigation links as needed

## Notes on Adding Tour Media and Rich Content

- Put tour images in `assets/images/tours/` and reference them in the data file as `/assets/images/tours/<filename>`.
- For long-form tour descriptions, you can add a Markdown file in `assets/md/` and set `contentUrl` in the tour entry (e.g., `/assets/md/vnn301.md`). The renderer will fetch and convert simple markdown to HTML.
- If you add images, avoid spaces in filenames; use hyphens or underscores to improve compatibility.

### Windows PowerShell: add or rename image

If your image file has spaces, use PowerShell to rename and copy the file to the right folder:

```powershell
# From the folder containing the image
Rename-Item -Path "vnn 301.jpg" -NewName "vnn301.jpg"
# Copy to the project's tours images folder (adjust path as needed)
Copy-Item -Path "vnn301.jpg" -Destination "f:\CÁC DỰ ÁN  LẬP TRÌNH\basic 1.2\assets\images\tours\"
```

After copying, commit changes and refresh your local server. Then open the tour detail:

http://localhost:8000/pages/private-tour-detail.html?id=vnn301

## Technologies Used

- HTML5
- CSS3 (Inter font, Font Awesome icons)
- Vanilla JavaScript (ES6+)
- Responsive design principles