# PreRent — Premium car rental

A complete, static website (HTML + CSS + vanilla JS, **no build step, no dependencies**)
recreated from the Shakuro "PreRent" showcase video.

## Run it
* Double-click `index.html`, **or** serve the folder (`npx serve .` / `python3 -m http.server`) and open the URL.
* `index.html?nointro` skips the opening showcase animation.
* On desktop it shows the phone in the studio scene (as at the end of the video).
  On a phone (viewport ≤ 520px) it becomes the full-screen app.

## Flow (as in the video)
Intro showcase → Onboarding → Home (SUV / Sedan rows ⇄ list layout) → tap a car
(card expands into the detail hero) → Book a car → Booking map (dates + address)
→ Next → Calendar & pick-up time → Confirm → Order tracking → Pay now → Add new card → Save card.

## Structure
```
index.html
css/style.css      design system + every screen + transitions
js/app.js          screens, navigation, shared-element transitions, calendar, card form, intro
assets/img/        car cut-outs, avatars, onboarding background (all extracted from the video)
```

## Fonts
The video uses a commercial grotesk. The site loads **Inter Tight** from Google Fonts
(closest free match) and falls back to system fonts offline. To self-host, download the
font, add an `@font-face` in `css/style.css` and change `--font`.

## Notes on fidelity
All images come from the video, so their resolution is the video's resolution.
The video never shows the full Phantom / Urus side views, so those two are
half-car cut-outs (they bleed off the card edge, like the other cards do).
Screens/states that never appear in the video (booking-confirmed screen, filter empty
state, specs for the Urus/Phantom/Bentley, the 4th feature card) were designed in the same style.
