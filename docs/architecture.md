# Architecture

This document provides a high-level overview of the current project architecture for developers.

The HackNC 2026 Website is a frontend-only Next.js application.

# Frontend

The website uses:

- Next.js
- React
- TypeScript
- Tailwind CSS

The website uses the Next.js App Router for page routing and layouts.

# Project Structure

## App Router

The `app/` directory contains:

- routes/pages
- layouts
- metadata
- shared route structure

## Components

Reusable UI components should be stored in:

```txt
components/
```

Examples may include:

- navigation components
- buttons
- cards
- FAQ components
- footer components

## Shared Content Data

Shared content data should be stored in:

```txt
data/
```

Examples include:

- FAQs
- sponsor information
- navigation links
- social links
- board member information

This keeps content separate from UI components whenever possible.

## Shared Types

Shared TypeScript types should be stored in:

```txt
types/
```

This helps keep shared data structures consistent across the project.

## Utilities

Shared helper functions and utilities should be stored in:

```txt
lib/
```

# Styling

The project uses Tailwind CSS for styling.

# Accessibility Goals

The website should aim to be:

- keyboard accessible
- responsive across screen sizes
- readable and navigable
- semantically structured

# Performance Goals

The website should aim to:

- minimize unnecessary client-side JavaScript
- optimize image usage
- avoid unnecessary large dependencies
- remain responsive on mobile devices

# Development Philosophy

The project should prioritize:

- maintainability
- readability
- clear separation of concerns
- consistency across contributors
