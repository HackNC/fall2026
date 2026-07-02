# Git Workflow

This is the step-by-step process everyone follows when contributing to this repository. If you're new to Git, read through this whole doc once before you start — every command you'll need is here.

A few quick definitions if you're new:

- **Branch** — your own copy of the code to work in, so you never edit `main` or `stage` directly.
- **Commit** — a saved snapshot of your changes, with a message describing what changed.
- **Push** — uploading your commits from your computer to GitHub.
- **Pull Request (PR)** — a request asking the leads to review your branch and merge it into `stage`.

## `main` vs `stage`

- **`main`** — the live website. **Do not branch off this or target it with PRs!**
- **`stage`** — where the new website is being built. This is the default base branch for all new work.

## The Workflow at a Glance

1. Pull the latest changes from `stage`
2. Create a new branch
3. Make your changes
4. Test locally
5. Commit your changes
6. Push your branch
7. Open a pull request
8. Request review from the leads

The leads are responsible for reviewing and merging pull requests into `stage`. Details for each step are below.

## Step-by-Step Guide

### 1. Get the latest code

Before starting anything new, make sure you're on `stage` and up to date, so you're not working on outdated code:

```bash
git checkout stage
git pull
```

### 2. Create a new branch

Never commit directly to `stage` or `main`. Instead, create a branch off `stage` named after what you're doing. See [Branch Naming](#branch-naming) below for the naming convention.

```bash
git checkout -b feature/add-faq-section
```

`-b` creates the branch and switches you onto it in one step.

### 3. Make your changes

Edit the code as needed for your task.

### 4. Test locally

Before committing, make sure your code is clean and actually works:

```bash
npm run lint
npm run format:check
npm run dev
```

- `lint` catches code issues.
- `format:check` makes sure your code follows the project's formatting rules (run `npm run format` to auto-fix).
- `dev` starts the local site — open it in your browser and click around to confirm your change works.

### 5. Check what changed

```bash
git status
```

This lists every file you've changed. Double check:

- Only files you actually meant to change are listed.
- None of these show up (if they do, **do not commit them** — see [Rules](#rules)):

  ```txt
  .env
  .env.local
  node_modules
  .next
  ```

### 6. Stage and commit your changes

"Staging" means picking which changes to include in your next commit.

```bash
git add <filename>   # stage one specific file
git add .            # or stage everything that changed
```

Then save the snapshot with a message (see [Commit Guidelines](#commit-guidelines) for how to write it):

```bash
git commit -m "your commit message here"
```

### 7. Push your branch to GitHub

```bash
git push -u origin <branchname>
```

The `-u` links your local branch to the one on GitHub — you only need it the first time you push this branch. After that, `git push` alone is enough.

### 8. Open a pull request (PR)

1. Go to the repository on GitHub: https://github.com/HackNC/fall2026
2. You'll see a banner like `<branchname> had recent pushes <time> ago`. Click **Compare & pull request**.
3. **Make sure the base branch is `stage`, not `main`.** GitHub defaults to whichever branch was checked out first, so double check this before opening the PR.
4. Reference the GitHub project task/issue number in the PR description (e.g. `Closes #17`) so it closes automatically when merged.
5. Click **Create pull request**.

### 9. Wait for review

The leads will review your PR and either request changes or merge it into `stage`. You can keep working on something else in the meantime — no need to wait around.

**Note:** Commit early, commit often. Small commits are easier to review and easier to undo if something goes wrong.

## Branch Naming

Use `setup`, `feature`, or `fix` as a prefix, followed by a short description of the work:

```txt
setup/add-prettier
setup/create-folder-structure
feature/add-faq-section
feature/add-navigation
fix/mobile-navbar
fix/nav-alignment
```

- `setup/` — project configuration, tooling, folder structure
- `feature/` — new functionality
- `fix/` — bug fixes

## Commit Guidelines

Prefix your commit message with the same label as your branch type, followed by a colon, then a short description of what you did:

```txt
setup: initialize Next.js project
setup: add folder structure
feature: add sponsors section
feature: create schedule page
fix: correct nav alignment
fix: resolve mobile layout issues
```

## Rules

Never commit these — they either contain secrets or are auto-generated and don't belong in the repo:

```txt
.env
.env.local
node_modules
.next
```

If one of these accidentally shows up in `git status`, do not run `git add .`. Add files individually instead, or ask a lead for help before committing.

Keep pull requests focused — one feature or fix per PR. Avoid mixing unrelated changes together, since it makes reviews harder.

## Common Issues

**I already ran `git add .` and staged something I shouldn't have.**
Unstage it before committing: `git restore --staged <filename>`

**`git pull` says I have local changes that would be overwritten.**
Commit or stash your work first (`git stash`), then pull, then bring your changes back (`git stash pop`).

**I'm not sure what branch I'm on.**
Run `git status` — the first line tells you your current branch.

**I have a merge conflict.**
Ask a lead for help rather than guessing — conflicts are easy to resolve incorrectly if you're not sure what you're looking at.
