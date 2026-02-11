# Google OAuth Setup (Fix "OAuth client was not found" / invalid_client)

You need to **create your own OAuth client** in Google Cloud Console. There is no automatic Globe OAuth — your app registers with Google so users can sign in with their Google accounts (including @globe.com.ph).

## Step-by-step

### 1. Go to Google Cloud Console
[https://console.cloud.google.com/](https://console.cloud.google.com/)

### 2. Create or select a project
- Top bar: click the project dropdown → **New Project**
- Name it (e.g. "Globe ICX Survey") → **Create**

### 3. Configure OAuth consent screen
- Left menu: **APIs & Services** → **OAuth consent screen**
- Choose **Internal** (only users in your org) or **External** (anyone with Google)
- For @globe.com.ph only: **Internal** is best if your org uses Google Workspace
- Fill: App name, User support email, Developer contact
- **Save and Continue** through scopes (default is fine)

### 4. Create OAuth 2.0 credentials
- Left menu: **APIs & Services** → **Credentials**
- **+ Create Credentials** → **OAuth client ID**
- Application type: **Web application**
- Name: e.g. "Globe ICX Survey"
- **Authorized redirect URIs** → **+ Add URI**:
  - Local: `http://localhost:3000/api/auth/callback/google`
  - Production: `https://YOUR-VERCEL-URL.vercel.app/api/auth/callback/google` (replace with your real URL)
- **Create**
- Copy the **Client ID** and **Client secret**

### 5. Update your `.env`
```env
GOOGLE_CLIENT_ID="123456789-xxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxxxxxx"
NEXTAUTH_SECRET="your-generated-secret"   # run: openssl rand -base64 32
```

### 6. Restart your dev server
```bash
npm run dev
```

---

**Note:** If you use **Internal** consent and the signed-in Google account is not in your org, you may get "Access blocked". Sign in with an account that’s part of the same Google Workspace, or use **External** consent for testing.
