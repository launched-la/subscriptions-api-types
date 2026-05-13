# subscriptions-api-types

TypeScript types for the Launched LA subscription API.

## What changed in 2.0.0

This package moved from the public npm registry to **GitHub Packages**, hosted under the `launched-la` org. The scope also changed from `@launchedla` (no hyphen) to `@launched-la` (with hyphen) to satisfy GitHub Packages' requirement that the scope match the owning org's slug.

| | Before 2.0.0 | 2.0.0+ |
|---|---|---|
| Package name | `@launchedla/subscriptions-api-types` | `@launched-la/subscriptions-api-types` |
| Registry | `https://registry.npmjs.org` (public npm) | `https://npm.pkg.github.com` (GitHub Packages) |
| Auth | `NPM_TOKEN` | `GITHUB_PACKAGES_TOKEN` (a GitHub PAT) |

The old `@launchedla/subscriptions-api-types` on npm is frozen at its final version and being deprecated. No new versions will be published there.

The exported types didn't change — this is a major version bump only because every consumer must update its `package.json`, `.npmrc`, imports, and CI secrets to keep working.

## Consumer setup

Each consumer repo needs to do the following once.

### 1. Get a GitHub PAT for package reads

Pick one:

- **Classic PAT**: <https://github.com/settings/tokens> → "Generate new token (classic)" → check `read:packages`. Belongs to a maintainer or, preferably, a service account.
- **Fine-grained token**: <https://github.com/settings/personal-access-tokens> scoped to the `launched-la` org with **Packages: Read-only**.

Store it as `GITHUB_PACKAGES_TOKEN` (or any name — what matters is that your `.npmrc` references the same env var). One PAT can be reused across every `@launched-la` package, so if you already created one for `@launched-la/hb-shared`, the same token works here.

For non-interactive shells (the kind that CI tooling and editor subprocesses launch), put the export in `~/.zshenv`, not just `~/.zshrc` — `.zshrc` is interactive-only.

### 2. Update `.npmrc`

If your repo already routes `@launched-la` to GitHub Packages for `hb-shared`, you're done — the scope-level route covers every `@launched-la/*` package. Otherwise add to your `.npmrc`:

```
@launched-la:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

The `@launched-la:registry=...` line routes only the `@launched-la` scope to GitHub Packages — anything else still resolves from public npm.

### 3. Update `package.json`

Find every `"@launchedla/subscriptions-api-types": "^x.y.z"` and change it to `"@launched-la/subscriptions-api-types": "^2.0.0"` (or whatever the current major is).

In monorepos this may be in multiple files (`apps/*/package.json`, `packages/*/package.json`).

### 4. Update imports

Codebase-wide find/replace:

```
@launchedla/subscriptions-api-types  →  @launched-la/subscriptions-api-types
```

Tests included.

### 5. Reinstall

Using the consumer's package manager:

```
pnpm install     # website
yarn install     # meatball, cs-app, cloud-party
npm install      # subscriptions-api
```

Commit the updated lockfile.

### 6. Add the token to deploy targets

Wherever the consumer runs `npm install` / `yarn install` / `pnpm install`, the env var (defaulting to `GITHUB_PACKAGES_TOKEN`) must be set:

- **Vercel**: project Settings → Environment Variables.
- **Render.com**: service env vars.
- **AWS Elastic Beanstalk**: `.ebextensions` env config or EB console.
- **GitHub Actions** (e.g. CI workflows in the consumer repo): add as a repo secret and expose under the env-var name your `.npmrc` interpolates. **Note**: GitHub forbids secret names that start with `GITHUB_`, so the secret has to be named something else (e.g. `GH_PACKAGES_TOKEN`) and aliased in the workflow's `env:` block to `GITHUB_PACKAGES_TOKEN`.
- **Local development**: add to your shell profile (`~/.zshenv` for zsh so non-interactive shells see it).

### 7. Verify

- Repo builds: `pnpm build` / `yarn build` / `npm run build`.
- Lint and typecheck pass per the workspace's task-completion convention.
- App boots locally and code paths that import types from this package compile cleanly.
- Deploy to staging; watch for `MODULE_NOT_FOUND` errors.

## Install (after setup)

```
npm i -D @launched-la/subscriptions-api-types
# or yarn add -D / pnpm add -D
```

Then:

```ts
import type { Shopify } from '@launched-la/subscriptions-api-types'
import type { CreateItemParams } from '@launched-la/subscriptions-api-types/types/shopify'
```

## To develop

Edit `.ts` files in `src/`. The published artifact is type declarations only (`types/`); `prepack` runs `tsc` to regenerate them. No runtime code ships.

## Semantic Release

This repo uses semantic-release configured in [`release.config.js`](./release.config.js) and run by [`.github/workflows/publish.yml`](./.github/workflows/publish.yml). Every push to `master` runs the workflow, and releases are decided by [conventional-commit](https://github.com/semantic-release/semantic-release#how-does-it-work) prefixes:

- `fix: …` → patch bump
- `feat: …` → minor bump
- `feat!: …` or a `BREAKING CHANGE:` line in the body → major bump
- Anything else (including merge-commit subjects like `Merge pull request #N…`) → no release

Because PRs merge with merge commits (not squash) here, the prefix must appear on **at least one commit inside the feature branch** — the merge-commit subject itself doesn't qualify. Don't manually publish.
