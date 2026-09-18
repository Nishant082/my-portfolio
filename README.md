# My Portfolio

This is a Vite + React portfolio site. The app entry is [src/main.jsx](src/main.jsx), which renders [src/App.jsx](src/App.jsx).

## Prerequisites

- Node.js 18 or newer
- npm
- A terminal such as PowerShell, Command Prompt, or Git Bash

## Run the app locally

From the project folder:

```bash
cd portfolio
npm install
npm run dev
```

Then open:

```text
http://localhost:5173/
```

If you are using PowerShell and scripts are blocked, run this once in the current terminal before installing:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then continue with:

```powershell
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

This creates the production files in the `dist` folder.

## Useful commands

```bash
npm run dev
npm run build
npm run preview
```

- `npm run dev` starts the local development server
- `npm run build` builds the app for deployment
- `npm run preview` serves the production build locally

## Project structure

```text
portfolio/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── assets/
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Notes

You do not run [src/App.jsx](src/App.jsx) directly. Vite loads it through [src/main.jsx](src/main.jsx), and the browser renders the app from there.
