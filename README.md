# Gemini Video

[![CI](https://github.com/eiei114/pi-gemini-video/actions/workflows/ci.yml/badge.svg)](https://github.com/eiei114/pi-gemini-video/actions/workflows/ci.yml)
[![Publish](https://github.com/eiei114/pi-gemini-video/actions/workflows/publish.yml/badge.svg)](https://github.com/eiei114/pi-gemini-video/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/pi-gemini-video.svg)](https://www.npmjs.com/package/pi-gemini-video)
[![npm downloads](https://img.shields.io/npm/dm/pi-gemini-video.svg)](https://www.npmjs.com/package/pi-gemini-video)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Pi package](https://img.shields.io/badge/pi-package-purple.svg)](https://pi.dev/packages)
[![Trusted Publishing](https://img.shields.io/badge/npm-Trusted%20Publishing-blue.svg)](docs/release.md)
<a href="https://buymeacoffee.com/ekawano114m"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="217" height="60"></a>

> Pi extension that detects local video files and proxies analysis to Gemini for multi-modal understanding with auto-split, merge, and quality-first profiles.

## What this is

**pi-gemini-video** is a Pi extension that lets agents analyze local video files through Google Gemini's multi-modal capabilities. It automatically detects video files, splits long content into manageable segments, merges analysis results, and applies quality-first profiles to balance detail vs. cost.

## Features

- **Auto-detect** local video files by path, glob, or directory scan
- **Smart split** — automatically splits videos longer than Gemini's context window into overlapping segments
- **Merge results** — combines per-segment analysis into a coherent summary
- **Quality profiles** — choose from `fast`, `balanced`, or `thorough` profiles to trade off speed, detail, and token cost
- **Multi-modal analysis** — proxy video frames and audio to Gemini for scene understanding, transcription, and visual QA

## Install

Install the published npm package with Pi:

```bash
pi install npm:pi-gemini-video
```

Pin a specific version when you want reproducible installs:

```bash
pi install npm:pi-gemini-video@0.1.0
```

Install into the current project instead of your user Pi settings:

```bash
pi install npm:pi-gemini-video -l
```

Or install from GitHub:

```bash
pi install git:github.com/eiei114/pi-gemini-video
```

Try it without permanently installing:

```bash
pi -e npm:pi-gemini-video
```

## Quick start

Try this package locally:

```bash
pi -e .
```

Then run:

```txt
/gemini-video-info
```

## Package contents

| Path | Purpose |
|---|---|
| `extensions/` | Pi TypeScript extension entrypoints |
| `lib/` | Shared TypeScript helpers |
| `skills/` | Agent Skills |
| `prompts/` | Prompt templates |
| `themes/` | Pi themes |
| `docs/` | Optional supporting docs |

## Development

```bash
npm install
npm run ci
```

## Development flow

1. Write PRD and split tracer-bullet issues
2. Implement in the OSS repo
3. Run `npm run ci`, `npm test`, and `npm pack --dry-run`
4. Release with Trusted Publishing

## Release

This package is set up for npm Trusted Publishing, so no `NPM_TOKEN` is required.

```bash
npm version patch
git push
```

See [`docs/release.md`](docs/release.md) for setup details.

## Security

Pi packages can execute code with your local permissions. Review extensions before installing third-party packages.

For vulnerability reporting, see [`SECURITY.md`](SECURITY.md).

## Links

- npm: https://www.npmjs.com/package/pi-gemini-video
- GitHub: https://github.com/eiei114/pi-gemini-video
- Issues: https://github.com/eiei114/pi-gemini-video/issues

## License

MIT
