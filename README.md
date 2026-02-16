# Globe ICX Website

Next.js app with a landing page and Quick Check-in survey. Survey responses are stored in a PostgreSQL database (Neon).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Set `DATABASE_URL` and `DIRECT_URL` in `.env` (Neon pooled connection string). See [ENV_SETUP.md](ENV_SETUP.md) for details.

## Build

```bash
npm run build
```

## Deploy (Vercel)

Connect the repo to Vercel and set `DATABASE_URL` and `DIRECT_URL` in project Environment Variables. Production branch is `master`. See [ENV_SETUP.md](ENV_SETUP.md) for connection string format.
