# Framehouse

A React gallery for the existing nine-poster collection, with Vite and Radix Dialog.

Use Node.js 22.12 or later, then run `npm install` and `npm run dev`.
Run `npm run build` to produce the static site in `dist/`; `npm run preview` serves that build.

Poster data and original rationale live in `js/data.js`. New typography, colour,
and composition notes are explicitly proposed copy for review. The original About
section and portfolio placeholder link are preserved in `index.html`.

The gallery derives category counts and the active navigation collection from
poster data. Previous/next wrap within the selected category. Radix handles modal
focus containment, Escape, background scroll locking and dismissal; focus returns
to the original poster button, including after navigating to another poster.

Manual browser checks before release:

- All: 9; Type: 3; Illustration: 2; Event: 2; Brand: 2.
- Open each poster; check title, artwork, alt text and rationale.
- Check previous/next wrapping in every category and position announcements.
- Use Tab/Shift+Tab, Escape and the close button; verify focus returns to the opener.
- Check three/two/one columns, mobile dialog scrolling, uncropped images and overflow.
- Enable reduced motion; check focus visibility and filter announcements.
- Follow About, Selected work, home/back-to-top and the existing portfolio link.
