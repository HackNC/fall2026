# Onboarding

This document explains how developers can set up the HackNC 2026 Website locally.

# Prerequisites

Install the following before starting:

- Git
- Node.js
- npm
- VS Code (recommended)

# Repository Structure

```txt
app/          Next.js App Router pages and layouts
components/   Reusable UI components
docs/         Project documentation
public/       Static assets
.github/      Repository templates and GitHub config
```

# Project Setup

Install dependencies:

```bash
npm install
```

# Running the Website Locally

Start the local development server:

```bash
npm run dev
```

The website should start locally on:

```txt
http://localhost:3000
```

# Recommended VS Code Extensions

Recommended extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense

# Common Commands

## Start development server

```bash
npm run dev
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

## Check formatting

```bash
npm run format:check
```

# Important Notes

Do not commit:

```txt
node_modules
.next
```

Before opening a pull request:

```bash
npm run lint
npm run format:check
```

Also verify the website runs locally:

```bash
npm run dev
```
