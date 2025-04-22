# Frontend for Landing Page

This is the frontend application for the landing page.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

## Deployment to Vercel

### Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A deployed backend API (e.g., on Render)

### Deployment Steps

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login to Vercel**

```bash
vercel login
```

3. **Deploy to Vercel**

```bash
vercel
```

4. **Set Environment Variables**

After deployment, go to your project settings on Vercel and add the following environment variable:
- `VITE_API_URL`: The URL of your deployed backend API (e.g., `https://your-render-backend-url.onrender.com`)

5. **Redeploy with Environment Variables**

```bash
vercel --prod
```

## Deployment to Netlify

### Prerequisites

1. A Netlify account (sign up at [netlify.com](https://netlify.com))
2. A deployed backend API (e.g., on Render)

### Deployment Steps

1. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Login to Netlify**

```bash
netlify login
```

3. **Initialize Netlify**

```bash
netlify init
```

4. **Build and Deploy**

```bash
npm run build
netlify deploy --prod
```

5. **Set Environment Variables**

After deployment, go to your site settings on Netlify and add the following environment variable:
- `VITE_API_URL`: The URL of your deployed backend API (e.g., `https://your-render-backend-url.onrender.com`)

## Features

- Responsive design
- Dark mode support
- User authentication
- Admin dashboard
- Job listings and applications
