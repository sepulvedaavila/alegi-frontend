# Alegi Frontend

## Project Overview

This is a modern React application built with Vite, TypeScript, and shadcn-ui components.

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase
- React Query
- React Router DOM

## Local Development

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Setup Instructions

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd alegi-frontend

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

The development server will start at `http://localhost:8080` with hot-reloading enabled.

## Deployment

### Deploying to Vercel

1. **Prerequisites**
   - A Vercel account
   - Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

2. **Deployment Steps**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Configure your environment variables (especially Supabase credentials)
   - Deploy

3. **Environment Variables**
   Make sure to set up the following environment variables in your Vercel project:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - Any other environment variables your application needs

### Build Commands

- Development build: `npm run build:dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Project Structure

The project follows a standard Vite + React structure with TypeScript support. Key directories include:

- `/src` - Source code
- `/public` - Static assets
- `/supabase` - Supabase configuration and types

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[Add your license information here]
