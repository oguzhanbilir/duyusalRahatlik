# Sensory Comfort — Accessibility Browser Extension

Customizable accessibility extension for Chromium-based browsers (Chrome, Edge, Opera, Brave).

🏆 **Winner:** TÜBİTAK 2204-B · 2nd place, regional, 2024

[🔗 GitHub Pages](https://oguzhanbilir.github.io/duyusalRahatlik/) | [📖 Turkish README](README.md)

---

## Features

- 🎨 **Contrast Control** — Adjust colors for low-vision users (WCAG AA/AAA)
- 📱 **Font Size** — Zoom typography without page reflowing
- 🖼️ **Motion Control** — Disable animations (prefers-reduced-motion)
- 🔆 **Brightness** — Dim or brighten pages
- 📏 **Letter Spacing** — Increase spacing for dyslexia support
- 🎯 **Focus Mode** — Highlight active elements

## Standards & Compliance

- WCAG 2.1 AAA compliance
- Accessibility testing (Axe DevTools)
- User testing with visual/motor impairments
- Supported: Chrome, Edge, Opera, Brave

## Installation

```bash
git clone https://github.com/oguzhanbilir/duyusalRahatlik.git
```

### Load Extension

1. Chrome: `chrome://extensions/` → Developer Mode → Load unpacked
2. Edge: `edge://extensions/` → Developer Mode → Load unpacked
3. Opera/Brave: Same as Chrome

## Tech Stack

- JavaScript (Vanilla)
- Chrome Extension Manifest V3
- localStorage for persistence
- CSS custom properties for theming

## Usage

1. Click extension icon
2. Toggle features on/off
3. Adjust sliders (contrast, font size, brightness)
4. Settings persist across sessions

## Project Structure

```
.
├── manifest.json
├── popup.html
├── popup.js
├── styles.css
└── README.md (Turkish)
```

## Impact

- 150+ high school students trained in accessibility
- Real-world tool for accessibility testing
- TÜBİTAK regional 2nd place
- Open source: 20+ forks, community contributions

## Mentor

Oğuzhan Bilir — AP Cybersecurity Educator, Turkey

## License

MIT
