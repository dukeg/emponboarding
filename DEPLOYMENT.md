# OnboardHub Web Application - Deployment Guide

## Overview

The Employee Onboarding Web Application (OnboardHub) has been successfully converted from a React Native mobile app to a Next.js web application. This guide explains how to deploy it to production using Vercel, the recommended hosting platform for Next.js applications.

## Quick Start - Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Click "New Project"
4. Select your `emponboarding` repository from GitHub
5. Click "Import"
6. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
7. Click "Deploy"

Your app will be live in seconds!

### Option 2: Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
cd /home/ubuntu/onboarding-app
vercel

# Follow the prompts to connect your GitHub account and deploy
```

## Environment Variables

Add these to your Vercel project settings under "Settings" → "Environment Variables":

```
DATABASE_URL=your_database_url_here
API_URL=your_api_url_here
```

## Project Structure

```
onboarding-app/
├── pages/              # Next.js pages
│   ├── index.tsx       # Login page
│   ├── dashboard.tsx   # Employee dashboard
│   ├── 404.tsx         # 404 page
│   └── onboarding/
│       ├── checklist.tsx      # Onboarding checklist
│       ├── documents.tsx      # Document upload
│       └── training.tsx       # Training schedule
├── styles/
│   └── globals.css     # Global Tailwind styles
├── public/             # Static assets
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## Features

- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Fast Performance**: Next.js optimizations and static generation
- ✅ **SEO Friendly**: Server-side rendering and meta tags
- ✅ **Tailwind CSS**: Modern, utility-first styling
- ✅ **TypeScript**: Type-safe development
- ✅ **Authentication**: JWT-based login system (mock data for demo)

## Pages

### 1. Login Page (`/`)
- Email and password authentication
- Demo credentials: demo@example.com / password
- Responsive design with gradient background

### 2. Dashboard (`/dashboard`)
- Overview of onboarding progress
- Stats cards showing completed, in-progress, and pending tasks
- Quick access to documents and training
- Task list with status indicators

### 3. Onboarding Checklist (`/onboarding/checklist`)
- Complete list of onboarding tasks
- Filter by category (Admin, IT, Training, Documents)
- Progress tracking with percentage
- Task status indicators

### 4. Document Upload (`/onboarding/documents`)
- Required and optional document uploads
- Document status tracking
- Upload guidelines
- Approval workflow display

### 5. Training Schedule (`/onboarding/training`)
- Upcoming training sessions
- Session details (date, time, location, instructor)
- Add to calendar functionality
- Completed sessions history

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Customization

### Update App Name
Edit `pages/index.tsx` and `pages/dashboard.tsx` to change "OnboardHub" to your company name.

### Change Colors
Edit `tailwind.config.js` to customize the color scheme:

```js
theme: {
  extend: {
    colors: {
      primary: '#0066CC',  // Change this
      secondary: '#667085',
    },
  },
}
```

### Add Database Integration
Connect to a real database (PostgreSQL, MySQL, etc.) by:
1. Setting `DATABASE_URL` environment variable
2. Creating API routes in `pages/api/`
3. Replacing mock data with real API calls

## Performance Optimization

- **Image Optimization**: Use Next.js Image component for images
- **Code Splitting**: Automatic code splitting per page
- **Caching**: Vercel's global CDN caches static content
- **Compression**: Automatic gzip compression

## Security

- **HTTPS**: Automatic SSL/TLS certificates
- **Environment Variables**: Sensitive data stored securely
- **CORS**: Configure CORS headers in `next.config.js` if needed
- **CSP**: Content Security Policy headers recommended

## Monitoring & Analytics

Vercel provides built-in analytics:
- Visit your Vercel dashboard to view:
  - Page load times
  - Web vitals
  - Error rates
  - Traffic patterns

## Troubleshooting

### Build Fails
- Check `npm run build` locally first
- Ensure all dependencies are listed in `package.json`
- Check build logs in Vercel dashboard

### Pages Not Loading
- Clear browser cache
- Check network tab in DevTools
- Verify environment variables are set

### Slow Performance
- Enable Image Optimization in Vercel settings
- Use Vercel Analytics to identify bottlenecks
- Consider adding caching headers

## Next Steps

1. **Connect Real Database**: Replace mock data with actual database
2. **Add Authentication**: Implement real JWT authentication
3. **Enable File Uploads**: Integrate with S3 or similar for document storage
4. **Add Email Notifications**: Send task reminders and approvals
5. **Mobile App**: Keep the React Native mobile app in sync
6. **Analytics**: Add Google Analytics or Mixpanel

## Support

For issues or questions:
- Check Vercel documentation: https://vercel.com/docs
- Next.js documentation: https://nextjs.org/docs
- GitHub Issues: https://github.com/dukeg/emponboarding/issues

## License

This project is proprietary and confidential.
