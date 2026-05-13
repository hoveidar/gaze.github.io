# Gaze Reveal

A browser-based eye-tracking experiment that reveals hidden text only where you look. The screen starts fully obscured by a dark fog; your gaze paints a soft spotlight that clears the fog as your eyes move across the page.

**Live site:** https://hoveidar.github.io/gaze.github.io/

## How it works

1. Click anywhere to start the eye tracker.
2. Allow camera access when the browser prompts you.
3. Look around — your gaze gradually clears the fog and reveals the text beneath.

The eye tracking runs entirely in your browser using [WebGazer.js](https://webgazer.cs.brown.edu/). No data is sent to any server.

## Tech stack

- [Vite](https://vite.dev/) — build tool and dev server
- [WebGazer.js](https://webgazer.cs.brown.edu/) — webcam-based gaze estimation
- [@mediapipe/face_mesh](https://google.github.io/mediapipe/solutions/face_mesh.html) — face landmark model loaded from CDN at runtime

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173 in a browser that supports camera access (Chrome or Firefox work best).

## Deployment

The site is deployed automatically to GitHub Pages via GitHub Actions on every push to `main`. No manual steps are needed after the initial one-time setup below.

### One-time GitHub Pages setup

1. Go to your repository on GitHub.
2. Click **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Save.

The next push to `main` will trigger the workflow and the site will be live at `https://hoveidar.github.io/gaze.github.io/`.

### Manual deploy (alternative)

If you prefer to deploy manually without GitHub Actions:

```bash
npm run deploy
```

This builds the project and pushes `dist/` to the `gh-pages` branch. You would then need to set **Source** to **Deploy from a branch** and select the `gh-pages` branch in your GitHub Pages settings instead.

## Browser requirements

- A device with a front-facing webcam
- HTTPS or localhost (required for camera API)
- Chrome 90+ or Firefox 90+ recommended
