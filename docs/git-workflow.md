# Git Workflow

This workflow should be followed by all developers contributing to the repository.

# Branches

Use setup, feature, or fix branches instead of committing directly to `main`.

Examples:

```txt
setup/add-prettier
setup/create-folder-structure
feature/add-faq-section
feature/add-navigation
fix/mobile-navbar
```

# Recommended Workflow

1. Pull the latest changes from `main`
2. Create a new branch
3. Make changes
4. Test locally
5. Commit changes
6. Push branch
7. Open pull request
8. Request review

# Pull Requests

Before opening a pull request:

1. Check what files changed using:

   ```bash
   git status
   ```

2. Ensure unrelated files are not included.

3. Run:

   ```bash
   npm run lint
   npm run format:check
   ```

4. Verify the site runs locally:

   ```bash
   npm run dev
   ```

5. Commit your changes:

   ```bash
   git add .
   git commit -m "your commit message"
   ```

6. Push your branch:

   ```bash
   git push
   ```

7. Open a pull request on GitHub.

# Commit Guidelines

Write clear and specific commit messages.

Examples:

```txt
chore: add Prettier configuration
docs: update onboarding instructions
feat: add FAQ section
fix: correct mobile navigation spacing
```

# Rules

Do not commit:

```txt
node_modules
.next
```

Keep pull requests focused and avoid mixing unrelated changes together.

# Important Notes

Commit early and commit often.

Small focused pull requests are easier to review and safer to merge.
