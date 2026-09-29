BANKING APP (mobile UI prototype)
=================================

FILES
  index.html     Page structure
  style.css      All styling
  script.js      Avatar faces + transfer flow logic
  manifest.json  Web app manifest (name, colours, icon)
  README.txt     This file

HOW TO RUN
  1. Keep all files in the same folder.
  2. Double-click index.html to open it in a browser.
     (For best results view at phone width, or use browser
     dev tools > device toolbar.)
  3. To test the manifest / "Add to Home Screen", serve the
     folder over http, e.g.:  python3 -m http.server 8000
     then open http://localhost:8000

NOTES
  - Avatars and Upwork/Netflix/Starbucks logos are drawn
    inline as SVG. Replace them with your own images by
    editing index.html and script.js.
  - Colours and sizes are in style.css.
