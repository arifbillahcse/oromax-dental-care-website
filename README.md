# Oro Max Dental Care — Mathbaria

Website for **Oro Max Dental Care**, Mirukhali Road, Mathbaria, Pirojpur, Bangladesh.

A static website (HTML + CSS + vanilla JS) for showcasing dental services and
booking appointments. Built mobile-first with a clean white + dental teal/blue theme.

## Project structure

```
oromax-dental-care-website/
├── index.html          # Home
├── about.html          # About Us
├── services.html       # Our Services
├── gallery.html        # Gallery
├── appointment.html    # Book an Appointment
├── contact.html        # Contact Us
├── css/
│   └── style.css       # Global stylesheet + design tokens
├── js/
│   ├── include.js      # Loads shared header/footer partials
│   └── main.js         # Nav, active link, footer year, scroll header
├── partials/
│   ├── header.html     # Shared site header + navigation
│   └── footer.html     # Shared footer + floating WhatsApp button
└── images/             # Image assets
```

## Shared header & footer

The header and footer live in **`partials/`** and are injected into every page
via `js/include.js` (using `<div data-include="...">`). Edit them in one place
and the change applies site-wide.

## Running locally

The shared partials are loaded with `fetch()`, so the site must be served over
HTTP (not opened directly as a `file://`):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Contact / booking

- Phone: +880 1797-539117
- WhatsApp: https://wa.me/8801797539117
- Appointment booking sends a notification via WhatsApp.

## Status

All pages complete with content: Home, About, Services (10 services), Gallery,
Appointment (WhatsApp booking) and Contact (map + opening hours). Shared header,
footer, mobile navigation and floating WhatsApp button are in place.

Most images use free stock photos (Unsplash) as placeholders — replace them with
the clinic's own photos by dropping files in `images/` and updating the `src`
paths.
