# Web Performance Fundamentals Lab

Hands-on Node.js + Express training project focused on practical web performance experiments.

Maintainer: Muhmmad Medhat

## Project Purpose

This repository powers a small ecommerce demo, Developer Stickers Online, designed to make performance behavior easy to observe and tune. It intentionally includes configurable bottlenecks and toggles so you can compare user experience and network behavior under different settings.

## Tech Stack

- Node.js (CommonJS)
- Express 5
- SQLite in-memory database via better-sqlite3
- Static HTML, CSS, and vanilla JavaScript frontend
- Optional response compression via http-compression (gzip/brotli)
- Asset tooling for CSS bundling and PNG/WebP image processing

## Quick Start

Prerequisites:
- Node.js 20.x (recommended)

Run locally:
1. Install dependencies: npm install
2. Start the server: npm start
3. Open: http://localhost:3000/

## Runtime Architecture

1. Entry point: index.js starts the server on port 3000.
2. App setup: src/app.js configures request delay simulation, compression, API routes, and static file hosting.
3. API layer: src/routes/api.js exposes product, user, and cart endpoints.
4. Data layer: src/data/*.js executes prepared SQLite statements against an in-memory database.
5. Frontend: public/*.html + public/assets/js/*.js fetch API data and update the UI.

## Performance Controls

Use performance-config.js to toggle behavior without changing server logic:

- enableGzipCompression: enable/disable gzip compression
- enableBrotliCompression: enable/disable brotli compression
- enable304CachingHeaders: toggle ETag and Last-Modified headers
- enableBrowserCache: toggle Cache-Control behavior for static assets
- serverDuration: artificial per-request server delay (ms)

These options are intentionally centralized so you can benchmark and profile controlled deltas.

## API Surface

Products:
- GET /api/products

Users:
- GET /api/users/:userId
- POST /api/users

Cart:
- GET /api/users/:userId/cart
- POST /api/users/:userId/cart
- DELETE /api/users/:userId/cart
- DELETE /api/users/:userId/cart/:cartItemId

Notes:
- New users are created with POST /api/users and returned via a Location header.
- The database is in-memory and re-seeded on each restart.

## Database Model

Defined in src/data/schema.sql:

- products(id, t, slug, name, description, imagePath)
- users(id, t, name)
- cartItems(id, t, userId, productId)

Seed data includes four products used by the storefront.

## Available Scripts

- npm start: run nodemon against index.js
- npm run bundle: bundle CSS with lightningcss
- npm run imagePngResizer: resize PNG assets
- npm run imagePngOptimize: optimize PNG assets
- npm run imagePngToWebP: generate WebP assets
- npm run deploy: run tools/deploy.sh

## Repository Layout

- index.js: server launcher
- performance-config.js: performance toggles
- src/app.js: Express app composition
- src/routes/api.js: REST API endpoints
- src/data/: database initialization and SQL queries
- public/: static pages and browser assets
- tools/: asset and deployment scripts

## Important Behavior Notes

- Static serving is configured with express.static and optional cache headers.
- Compression is always registered, but algorithm support depends on config flags.
- The frontend persists userId in localStorage and auto-recovers if a user no longer exists.
- The cart and product UI are rendered client-side from API responses.

## Ownership

This project is branded and maintained by Muhmmad Medhat across metadata, documentation, runtime comments, and storefront attribution.
