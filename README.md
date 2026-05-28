# HackNC 2026 Website

This repository contains the HackNC 2026 website.

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- npm
- ESLint
- Prettier

## Getting started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open the local URL shown in your terminal. By default, this is usually:

```txt
http://localhost:3000
```

## Available scripts

### Start development server

```bash
npm run dev
```

Starts the local development server.

---

### Create production build

```bash
npm run build
```

Creates a production build.

---

### Run production build locally

```bash
npm run start
```

Runs the production build locally after building.

---

### Run ESLint

```bash
npm run lint
```

Checks the project for lint issues.

---

### Automatically fix ESLint issues

```bash
npm run lint:fix
```

Attempts to automatically fix lint issues.

---

### Format files with Prettier

```bash
npm run format
```

Formats project files using Prettier.

---

### Check Prettier formatting

```bash
npm run format:check
```

Checks whether project files are formatted correctly.

## Project structure

```txt
app/
components/
data/
lib/
public/
types/
```

### `app/`

Contains Next.js App Router files such as pages, layouts, and metadata.

### `components/`

Contains reusable UI components.

### `data/`

Contains shared website content data such as FAQs, navigation links, sponsors, social links, and board members.

### `lib/`

Contains shared utilities, helper functions, or constants.

### `public/`

Contains static assets such as images, icons, and logos.

### `types/`

Contains shared TypeScript types.

## Development workflow

Create a new branch for each task or feature.

Suggested branch naming examples:

```txt
setup/add-prettier
docs/update-readme-onboarding
feature/add-faq-section
fix/navbar-link
```

Before opening a pull request, run:

```bash
npm run lint
npm run format:check
```

Also verify the site runs locally:

```bash
npm run dev
```
