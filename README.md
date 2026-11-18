# Rupom — Personal Photo Gallery

A responsive HTML, CSS, JavaScript and Bootstrap photo gallery with 40 sample photo cards.

## 1. Run the website
1. Extract the ZIP file.
2. Open `index.html` in your browser.
3. Keep an internet connection for Bootstrap, Google Fonts, Bootstrap Icons and the sample Unsplash photos.

## 2. Where to add your own images
Your image folder is `Images/`. Put your own files there, for example:

- `Images/travel-sajek.jpg`
- `Images/my-bike-ride.jpg`
- `Images/family-moment.png`

Then open `index.html` and find the card you want to replace. Change only the image `src`:

```html
<img src="Images/travel-sajek.jpg" alt="My trip to Sajek Valley" loading="lazy">
```

Images are connected in HTML exactly as requested. You do not need to change JavaScript to add a photo.

## 3. Add a new photo card
In `index.html`, search for `ADD MORE PHOTO CARDS HERE`. Copy one complete block starting at:

```html
<div class="col-12 col-sm-6 col-lg-4 gallery-item" data-category="Travel" data-title="My photo title">
```

and ending at its matching `</div>`. Paste it inside `#galleryGrid`, then update:
- `data-category`: `Travel`, `Bike Ride`, `Nature`, or `Moments`
- `data-title`: title used by the search
- image `src` and `alt`
- format class
- date, title, short description and location

## 4. Choose the correct photo size card
Use exactly one of these CSS classes on `.photo-frame`:

| Format class | Aspect ratio | Common use |
|---|---:|---|
| `format-portrait` | 9:16 | TikTok, Instagram Reels, YouTube Shorts |
| `format-landscape` | 16:9 | YouTube landscape video / wide photos |
| `format-instagram` | 4:5 | Instagram portrait post |
| `format-square` | 1:1 | Instagram square post |

Recommended source image sizes:
- 9:16: 1080 × 1920 px
- 16:9: 1920 × 1080 px
- 4:5: 1080 × 1350 px
- 1:1: 1080 × 1080 px

The card preview uses `object-fit: cover`, so it fills the card neatly. The lightbox displays the original image proportion without forcing it into the card shape. Keep a backup of your original photos.

## 5. Edit title, date, description and location
Every card has these editable details in HTML:
- category label
- `<time datetime="YYYY-MM-DD">DATE LABEL</time>`
- `<h3>Photo title</h3>`
- `<p>Short description</p>`
- location line

Use your real photo date and location instead of the sample text.

## 6. Contact information
The About section currently uses:
- Mahmudul Haq Rupom
- mahmudul19web@gmail.com

Change the email in `index.html` if needed.

## 7. Main project structure

```text
Rupom_Photo_Gallery/
│
├── index.html
├── CSS/
│   └── style.css
├── JavaScript/
│   └── main.js
├── Images/
│   └── README.txt
└── README.md
```

## Notes
- 40 sample cards are included as starting examples. Replace their Unsplash image URLs with your own local image paths.
- The image files are not bundled locally; sample images load from Unsplash over the internet.
- Newsletter/backend/database are intentionally not included. This is a front-end photo gallery.
# Rupom_Photo_Gallery
