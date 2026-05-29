# HackNC 2026 Website

This repository contains the HackNC 2026 Website.

The website will be used to share event information, display sponsor and board members, answer participant questions, and provide important external links.

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- npm

## Tooling

- ESLint
- Prettier

# Repository Structure

```txt
app/          Next.js App Router pages and layouts
components/   Reusable UI components
data/         Shared website content data
docs/         Project documentation
lib/          Shared utilities and helper functions
public/       Static assets
types/        Shared TypeScript types
.github/      Repository templates and GitHub config
```

# Local Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

The local website should be available at:

```txt
http://localhost:3000
```

# Available Scripts

## Start development server

```bash
npm run dev
```

## Create production build

```bash
npm run build
```

## Run production build locally

```bash
npm run start
```

## Run ESLint

```bash
npm run lint
```

## Automatically fix ESLint issues

```bash
npm run lint:fix
```

## Format files with Prettier

```bash
npm run format
```

## Check Prettier formatting

```bash
npm run format:check
```

# Git Workflow

Use branches for setup and feature work.

Example branch names:

```txt
setup/add-prettier
setup/create-folder-structure
feature/add-faq-section
feature/add-navigation
fix/mobile-navbar
```

Keep pull requests focused on a single task or feature whenever possible.

Before opening a pull request:

```bash
npm run lint
npm run format:check
```

Also verify the site runs locally:

```bash
npm run dev
```

# Documentation

Project documentation is stored in:

```txt
docs/
```

Current documentation:

```txt
docs/onboarding.md
docs/git-workflow.md
docs/architecture.md
```

# Status

This repository is currently in the initial setup phase.
