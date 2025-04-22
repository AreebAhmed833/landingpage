# Backend API for Landing Page

This is the backend API for the landing page application.

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

## Deployment to Render

### Prerequisites

1. A Render account (sign up at [render.com](https://render.com))
2. A MongoDB database (you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Deployment Steps

1. **Create a new Web Service on Render**

   - Log in to your Render account
   - Click "New" and select "Web Service"
   - Connect your GitHub repository

2. **Configure the Web Service**

   - **Name**: Choose a name for your service (e.g., `landing-page-api`)
   - **Environment**: Select "Node"
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose a plan (Free tier is available)

3. **Set Environment Variables**

   Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT token generation
   - `FRONTEND_URL`: The URL of your frontend application
   - `NODE_ENV`: Set to `production`

4. **Deploy**

   - Click "Create Web Service"
   - Render will automatically deploy your application

5. **Update Frontend Configuration**

   - Update the API URL in your frontend application to point to your Render deployment URL

## API Endpoints

- `POST /api/auth/login`: User login
- `POST /api/auth/register`: User registration
- `POST /api/admin/login`: Admin login
- `GET /api/jobs`: Get all jobs
- `POST /api/jobs`: Create a new job (admin only)
- `GET /api/jobs/applications`: Get all job applications (admin only)

## Troubleshooting

- If you encounter CORS issues, make sure the `FRONTEND_URL` environment variable is set correctly
- If MongoDB connection fails, check your connection string and ensure your IP is whitelisted in MongoDB Atlas 