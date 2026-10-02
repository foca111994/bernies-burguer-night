# Bernie's Burger Night

A Next.js app for building and tracking burgers for Bernie's Burger Night. It is configured for static export and Cloudflare Pages.

## Deploy with Cloudflare Pages

In Cloudflare Pages, connect this repository and set:

- Framework preset: Next.js (Static HTML Export)
- Build command: `pnpm build`
- Build output directory: `out`
- Root directory: `/`

Use Node.js 22 or newer and pnpm 10 or newer. The app stores demo orders in each browser localStorage; this prototype does not share order data between devices.

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_v3MEfqqE5V5AupluNOpRHYFEMPeR)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
