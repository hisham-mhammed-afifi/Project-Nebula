You are a senior front-end engineer and creative UI/UX designer.

Create a visually stunning, responsive, and performant landing page for a futuristic sci-fi action game called "Project Nebula".

## Deliverables

Generate three separate files:

- `index.html` — semantic, SEO-optimized structure
- `styles.css` — BEM-structured, responsive, and themed design
- `script.js` — light/dark theme toggle, scroll animations using IntersectionObserver

## Requirements

### General Guidelines

- Use only HTML5, CSS3, and vanilla JavaScript
- Follow BEM (Block Element Modifier) naming convention for all classes
- Ensure full responsive and adaptive design for all devices and orientations (portrait and landscape)
- Prioritize performance: efficient CSS animations, GPU-friendly transitions, minimal JS execution

## index.html

### Head Section

Include:

- `<!DOCTYPE html>`, `<html lang="en">`, `<meta charset="UTF-8">`
- Meta tags for SEO and social sharing:
  - `<meta name="description">`
  - `<meta property="og:title">`, `<meta property="og:description">`
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Load the Orbitron font from Google Fonts
- Link to external `styles.css` and `script.js` (with `defer`)

### Body Structure (Each as a BEM Block)

1. **Hero Section**

   - Full-screen layout
   - Game title and tagline
   - Primary CTA button ("Play Now")
   - Theme toggle button in the top-right

2. **About Section**

   - 2-column layout (text + image)
   - Floating visual card style

3. **Features Section**

   - Responsive grid of 6 feature cards (Multiplayer, AI, Weapons, etc.)
   - Neon highlights and hover effects

4. **Gallery Section**

   - Image grid with 6 placeholders
   - Hover zoom and smooth transitions

5. **Reviews Section**

   - Testimonials with avatar, name, quote, and 5-star rating

6. **Footer**
   - Navigation links, social icons (as SVG or placeholders), copyright

Use placeholder images from https://via.placeholder.com/400x300 and placeholder text.

## styles.css

### Theming

- Use CSS variables for light/dark mode
- Define two theme classes on body:
  - `body.theme--light`
  - `body.theme--dark`

Example:

```css
:root {
  --bg-color: #0d0d0d;
  --text-color: #f0f0f0;
  --accent-color: #00ffe7;
}
```

### BEM Structure

Use structured class names like:

```css
.hero__title {
}
.hero__button--primary {
}
.features__item {
}
.gallery__image:hover {
}
```

### Design and Layout

- Use Orbitron for headers, sans-serif for body
- Neon-styled buttons and interactive elements
- Smooth transitions using `transform`, `opacity`, `box-shadow`
- Grid and Flexbox layouts
- Media queries for breakpoints:

  - `@media (max-width: 768px)`
  - `@media (orientation: landscape) and (max-height: 500px)`

### Scroll Animations

Define a base animation class:

```css
.section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.section--visible {
  opacity: 1;
  transform: translateY(0);
}
```

## script.js

### Theme Toggle

- Add a button with ID `theme-toggle`
- Toggle between `theme--dark` and `theme--light` on body
- Save selected theme to `localStorage`
- Apply saved theme on page load

### Scroll Animations

- Use `IntersectionObserver` to detect `.section` visibility
- When a section is visible, add the `section--visible` class

Example:

```js
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "dark";
  body.classList.add(`theme--${savedTheme}`);

  toggle.addEventListener("click", () => {
    body.classList.toggle("theme--light");
    body.classList.toggle("theme--dark");
    const newTheme = body.classList.contains("theme--light") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });
});
```

## Best Practices

- Use semantic tags and proper heading structure
- Ensure accessibility: alt attributes, contrast, aria-labels where needed
- Avoid inline styles and scripts
- Keep animations GPU-friendly (avoid layout thrashing)
- Mobile-first design with adaptive breakpoints
