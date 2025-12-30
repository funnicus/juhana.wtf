# juhana.wtf

My (yet another) new website, build with SvelteKit and Tailwind CSS!

Vercel address https://juhana-wtf.vercel.app

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# Or start the server and open the app in a new browser tab
pnpm dev --open
```

## Building

To create a production version of your app:

```bash
pnpm build # Build for local testing
docker build -t juhana-wtf . # Docker for production
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Docker

```bash
docker run -d -p 3000:3000 juhana-wtf # Run
docker stop juhana-wtf && docker rm juhana-wtf # Remove
```

## Blogs

Format like this:

```md
---
title: 'Your Post Title'
description: 'A brief description'
date: '2025-12-29'
author: 'Your Name'
---
```
