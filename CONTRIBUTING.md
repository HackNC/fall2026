# Git Workflow

## Branches

Use `setup`, `feature`, or `fix` branches instead of committing directly to `main`.

Examples:

```txt
setup/initial-page
setup/folder-structure
feature/sponsors-section
feature/schedule-page
fix/nav-alignment
fix/mobile-layout
```

## Pull Requests

After making changes to the files, do the following:

1. Check what files were changed using `git status`. Ensure that only the files you've changed are listed there. Ensure that any keys and the following files aren't being committed:

   ```txt
   .env
   .env.local
   node_modules
   ```

2. Move the changes (files you want to commit) from your working directory to the staging area by running either `git add <filename>` to stage a specific file or `git add .` to stage all new and modified files.

3. Permanently save those staged changes to your local database by running `git commit -m "your commit message here"`.

4. Push your local commits to the GitHub repository by running `git push`.

5. Go to the GitHub repository via https://github.com/HackNC/fall2026.

6. Once you're on the GitHub repository, an orange banner will show up stating something along the lines of `<branchname> had recent pushes <time since you pushed> ago`. Click on `Compare & pull request` to create a pull request. Reference the relevant issue in the PR body (e.g. `Closes #17`) then click `Create pull request`.

7. The leads will review the changes and merge them into `main`. _Keep working on other tasks while your pull request is being reviewed!_

**Note:** Commit Early, Commit Often!

## Commit Guidelines

Prefix commit messages with the relevant label followed by a colon.

Examples:

```txt
setup: initialize Next.js project
setup: add folder structure
feature: add sponsors section
feature: create schedule page
fix: correct nav alignment
fix: resolve mobile layout issues
```

## Rules

Do not commit:

```txt
.env
.env.local
node_modules
```

Keep pull requests focused and avoid mixing unrelated changes together.

## Recommended Workflow

1. Pull latest changes from `main`
2. Create a new branch
3. Make changes
4. Test locally
5. Commit changes
6. Push branch
7. Open pull request
8. Request review from the leads

The leads are responsible for reviewing and merging pull requests into `main`.
