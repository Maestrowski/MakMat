# MakMat - Maks Matusiak Portfolio

Welcome to my portfolio website! This project showcases my work as a Software Developer, UI/UX Designer, Web Developer, and Data Scientist based in London.

## About

This portfolio website is built with React, Vite, and Tailwind CSS. It features:
- Responsive design with dark/light mode toggle
- Interactive sections for skills, portfolio, and certificates
- Contact information and social links
- Optimized for deployment on Vercel

## Getting started

> **Prerequisites:**
> The following steps require [NodeJS](https://nodejs.org/en/) to be installed on your system, so please
> install it beforehand if you haven't already.

To get started with your project, you'll first need to install the dependencies with:

```
npm install
```

Then, you'll be able to run a development version of the project with:

```
npm run dev
```

After a few seconds, your project should be accessible at the address
[http://localhost:5173/](http://localhost:5173/)

If you are satisfied with the result, you can finally build the project for release with:

```
npm run build
```

## Deployment

This project is configured for deployment on Vercel. The build process includes:
- Optimized static assets
- Proper favicon configuration
- SEO meta tags
- Web manifest for PWA capabilities

## Storybook

After installing, you can view your storybook by running:

```
npm run storybook
```

After a few seconds, your storybook should be accessible at the address
[http://localhost:6006/](http://localhost:6006/)

You can build your storybook for release with:

```
npm run build-storybook
```

## Local Development Setup

### 1. Frontend: Environment Variables
- Create a `.env.local` file in the project root (not committed to git).
- Add the following line to use your local backend:

```
VITE_API_URL=http://localhost:5000/api/maksai
```

- The frontend will use this URL when running locally. In production, it will use the deployed backend URL as a fallback.

### 2. Backend: CORS Configuration
- Ensure your Flask backend allows CORS from both your deployed frontend and localhost:

```
CORS(app, origins=[
    "https://your-frontend.vercel.app",
    "http://localhost:5173"
])
```

- Replace `5173` with your local dev server port if different.

### 3. Running Locally
- Start your backend (Flask) on port 5000.
- Start your frontend (Vite/React) on port 5173 (default).
- The local frontend will call the local backend, and the deployed site will call the deployed backend.

---
