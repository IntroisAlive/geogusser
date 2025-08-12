
---

**Prompt:**

> Build me a complete working web-based game called **Mini Geo Explorer** inspired by GeoGuessr.
>
> **Core Requirements:**
>
> 1. **Frontend:**
>
>    * HTML, CSS, and JavaScript using **Leaflet.js** with OpenStreetMap for map interaction.
>    * Show a location image (from a pre-defined local folder `static/images`) for the player to guess.
>    * Let the player click on the map to make a guess.
>    * Calculate the distance between the guessed location and the actual location using the haversine formula.
>    * Show the actual location on the map after guessing.
>    * Award points based on distance (closer = more points).
>    * Play for 5 rounds and display total score at the end.
>
> 2. **Backend:**
>
>    * Use Python Flask to serve the game.
>    * Serve a list of locations from a `data/locations.json` file with structure:
>
>      ```json
>      [
>        {"image": "tokyo_tower.jpg", "lat": 35.6586, "lng": 139.7454},
>        {"image": "eiffel_tower.jpg", "lat": 48.8584, "lng": 2.2945}
>      ]
>      ```
>    * Provide an API endpoint `/get-location` that returns a random location from the JSON file.
>    * Serve static files (HTML, CSS, JS, images) from `static/` and templates from `templates/`.
>
> 3. **Game Flow:**
>
>    * On page load → fetch a random location from backend.
>    * Display image → wait for player’s guess.
>    * Player clicks on map → send guess to backend → calculate distance and score.
>    * Show result and proceed to next round until game ends.
>
> 4. **Folder Structure:**
>
>    ```
>    mini-geo-explorer/
>    ├── static/
>    │   ├── css/style.css
>    │   ├── js/main.js
>    │   └── images/
>    ├── templates/index.html
>    ├── data/locations.json
>    ├── app.py
>    └── requirements.txt
>    ```
>
> 5. **Extra Features:**
>
>    * A visible score counter during gameplay.
>    * “Next Round” button after each guess.
>    * Simple, responsive design so it works on mobile too.
>
> 6. **Deliverables:**
>
>    * Full code for Flask backend.
>    * HTML, CSS, JS files for frontend.
>    * Example `locations.json` with at least 5 locations.
>    * Instructions on how to run locally.

---

Live Demo-https://geogusserdemo.netlify.app/
