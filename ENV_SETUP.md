# Environment setup

## Local (`.env`)

Create a `.env` in the project root with:

| Variable       | Description |
|----------------|-------------|
| `DATABASE_URL` | Neon **pooled** connection string |
| `DIRECT_URL`   | Same pooled URL (use for both; direct endpoint can be unreachable) |

Get the connection string from [Neon Console](https://console.neon.tech) → your project → **Connection string** → **Pooled**. Add `?sslmode=require` if not present.

- Do **not** commit `.env` (it’s in `.gitignore`).

## Vercel

In **Project → Settings → Environment Variables**, set:

- `DATABASE_URL` = same pooled URL
- `DIRECT_URL`  = same pooled URL

Use the same values as in `.env` (with your real Neon password). Redeploy after changing env vars.

## Connect with psql

```bash
psql "postgresql://USER:PASSWORD@HOST/globe-icx?sslmode=require"
```

Replace `USER`, `PASSWORD`, and `HOST` with the values from Neon (pooled connection).
