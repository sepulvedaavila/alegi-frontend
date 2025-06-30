# Alegi Frontend

## Project Overview

This is a modern React application built with Vite, TypeScript, and shadcn-ui components.

## Features

### Custom Reports
The platform now includes a comprehensive Custom Reports system that allows users to generate three different types of reports from their case data:

1. **Case Performance Summary (PDF)**
   - Total cases, active cases, and settled cases
   - Settlement values and resolution times
   - Cases by type and outcome analysis
   - Average confidence scores

2. **Financial Analysis Report (Excel)**
   - Total estimated and settled values
   - Average settlement amounts and settlement rates
   - Financial breakdown by case type
   - Monthly settlement tracking

3. **Risk Assessment Report (CSV)**
   - Risk analysis by case type, judge, and jurisdiction
   - Confidence score distribution
   - Common risk factors identification
   - Judge performance metrics

Each report provides different insights and can be downloaded in various formats (PDF, Excel, CSV) for further analysis and presentation.

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
git clone git@github.com:sepulvedaavila/alegi-frontend.git

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

Copyright (c) 2024 Alegi. All Rights Reserved.

This software and associated documentation files (the "Software") are proprietary and confidential. The Software is protected by copyright laws and international copyright treaties, as well as other intellectual property laws and treaties.

Unauthorized copying, distribution, modification, public display, or public performance of the Software is strictly prohibited. No part of this Software may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of Alegi.

For licensing inquiries, please contact [your contact information].