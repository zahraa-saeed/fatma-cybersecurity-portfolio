# Fatma Alzahraa Saeed — Cybersecurity Portfolio

A dark-themed, fully responsive Cybersecurity portfolio built with plain
HTML, CSS and JavaScript. No frameworks, no build step — open
`index.html` and it works.

## Project structure

```
portfolio/
├── index.html          → all page content and structure
├── style.css            → design system (colors, type, layout, animations)
├── script.js             → data arrays (skills, projects, certs...) + interactivity
├── README.md
└── assets/
    ├── profile.jpg               → your photo (already in place)
    ├── cv.pdf                    → ⚠️ add your real CV here, exact filename
    └── certificates/
        ├── certificate1.png       → Introduction to Cybersecurity (Cisco/ELCC)
        ├── certificate2.png       → CyberOps Associate (Cisco/NTI)
        ├── certificate3.png       → Network Security Summer Training (ITIDA/NTI)
        ├── Introduction_to_Cybersecurity.pdf   → original PDF, for reference
        └── CyberOps_Associate.pdf               → original PDF, for reference
```

## Where to put your information

Almost everything editable lives in **`script.js`**, at the top of clearly
labeled sections — search for the `EDIT:` comments. A few links live
directly in `index.html`.

| What | Where | How |
|---|---|---|
| **Photo** | `assets/profile.jpg` | Already in place — replace the file (same name) to change it. |
| **Phone number** | `index.html` | Find `tel:+201000000000` (appears 3 times: Hero, Contact, Footer) and replace with your number, e.g. `tel:+201234567890`. Also update the visible text `+20 100 000 0000` in the Contact section. |
| **Email** | `index.html` + `script.js` | Find `your.email@example.com` in `index.html` (mailto links) and in `script.js` (`const to = ...` inside the contact form handler). |
| **GitHub link** | `index.html` | Find `data-social="github"` and the Contact/Footer GitHub `<a href="#">` tags — replace `#` with your profile URL. |
| **LinkedIn link** | `index.html` | Same pattern — find `data-social="linkedin"` and the Contact/Footer LinkedIn links. |
| **CV / Resume** | `assets/cv.pdf` | Add a file named exactly `cv.pdf` to the `assets/` folder. The "Download CV" button already points to it and will save it as `Fatma_Alzahraa_Saeed_CV.pdf`. |
| **Stats numbers** | `index.html` | Find `id="activity"` — each `data-count="X"` attribute is the number that animates in. |

## Adding a new project

Open `script.js`, find the `projects` array near the top, and copy one
object as a template:

```js
{
  id: 'unique-id-no-spaces',
  title: 'Project Name',
  category: ['SOC', 'Blue Team'],       // must match filter chip labels
  summary: 'One-line summary for the card.',
  description: 'Longer description for the modal.',
  tech: ['Tool1', 'Tool2'],
  features: ['Feature 1', 'Feature 2'],
  projectUrl: '',                       // leave '' if none yet
  githubUrl: ''
}
```

## Adding a new certificate

Same pattern in the `certifications` array:

1. Drop the certificate image into `assets/certificates/`.
2. Add a new object to the array with `image: 'assets/certificates/yourfile.png'`.
3. Set `featured: true` on at most one certificate to make it the highlighted one.
4. Stats and the timeline update automatically — no extra work needed.

If you don't have the image yet, set `image: ''` and the card will show
a clearly labeled placeholder instead of a broken image.

## Contact form

The form currently opens the visitor's email client with the message
pre-filled (`mailto:`) — this works immediately with no setup, but it
depends on the visitor having an email client configured.

To collect messages directly instead (recommended for a live site):

1. Create a free form at [formspree.io](https://formspree.io) and copy your endpoint URL.
2. In `script.js`, find the `contactForm` submit handler (search for `EDIT: replace with your real email address`) and follow the commented instructions right above it to switch to a `fetch()` call.

## Dark / Light mode

Toggled with the moon/sun icon in the navbar. The choice is saved in
the browser's `localStorage`, so it persists on return visits.

## Publishing to GitHub Pages

1. Create a new GitHub repository (e.g. `portfolio`).
2. Push this folder's contents to it:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from branch → `main` / `root`**.
4. Your site will be live at `https://YOUR-USERNAME.github.io/portfolio/` within a few minutes.

## Notes

- No frameworks — just HTML5, CSS3 and vanilla JS, so it runs by
  double-clicking `index.html`.
- All skill levels, stats and certificate data are placeholders you
  supplied or clearly-marked defaults — update them in `script.js` as
  your experience grows.
