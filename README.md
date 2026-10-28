# Anthony Fuca Portfolio

Personal site for Anthony Fuca, a software developer. It shows a short bio, a technology bar, and a project gallery. Selecting a technology filters the projects. The header includes GitHub, LinkedIn, email, a resume download, and a light/dark theme toggle.

Built with React and Vite.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

`npm run build` writes the static site to `dist`. `npm run preview` serves that build locally.

## Edit content

Site copy, links, and projects live in `src/data/portfolioData.js`.

- Project images go in `public/images` and are referenced from each project’s `image` field.
- The portrait is `public/images/me.jpeg`.
- The Resume button downloads `public/Anthony Fuca Resume.pdf`. Replace that file to update the download.
- Technology icons are defined in `src/components/TechIcon.jsx`. A project’s `technologies` entries must use those catalog keys, such as `javascript` or `react`.
