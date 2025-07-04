# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cloudflare Workers project that serves random content through REST API endpoints.

## Common Commands

### Code Quality

- `npm run format` - Format code with Prettier
- `npm run lint` - Check code formatting with Prettier
- `npm run typecheck` - Run TypeScript type checking (includes test directory)

### Type Generation

- `npm run typegen` - Generate worker configuration types from Wrangler and format them

## Architecture

The project follows a simple Cloudflare Workers architecture:

### Core Structure

- `src/index.ts` - Main worker entry point with fetch handler
- `wrangler.jsonc` - Wrangler configuration for deployment
- `worker-configuration.d.ts` - Auto-generated TypeScript definitions for Cloudflare environment

### Request Handler Pattern

The main fetch handler uses URL pathname matching to route requests to different endpoints. Each endpoint contains its own logic for generating random responses.

### Configuration

- Uses TypeScript with strict mode enabled
- Configured for ES2021 target with bundler module resolution
- Prettier formatting with single quotes, no semicolons, and trailing commas
- Cloudflare Workers compatibility date set to 2025-07-04

## Testing

The project does not have tests.
