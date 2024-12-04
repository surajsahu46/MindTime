# Deployment Guide

This guide covers deploying MindTime to various platforms.

## Building for Production

Before deploying, build the project:

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

## Deployment Options

### 1. Netlify Deployment

The easiest way to deploy MindTime is through Netlify:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 16.x

### 2. Vercel Deployment

Vercel is another excellent option:

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### 3. GitHub Pages

To deploy to GitHub Pages:

1. Add homepage to package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/mindtime"
   }
   ```

2. Build and deploy:
   ```bash
   npm run build
   ```

3. Push the `dist` directory to the `gh-pages` branch

### 4. Docker Deployment

A Dockerfile is provided for containerized deployment:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]
```

Build and run:
```bash
docker build -t mindtime .
docker run -p 4173:4173 mindtime
```

## Environment Variables

Configure these environment variables for production:

```env
VITE_API_URL=your_api_url
VITE_STORAGE_PREFIX=mindtime
```

## Post-Deployment Checklist

- [ ] Verify all routes work correctly
- [ ] Check that data persistence works
- [ ] Confirm all charts render properly
- [ ] Test responsive design
- [ ] Validate form submissions
- [ ] Check performance metrics
- [ ] Monitor error tracking

## Monitoring and Analytics

Consider adding:

1. Google Analytics
2. Error tracking (Sentry)
3. Performance monitoring
4. User behavior analytics

## Security Considerations

1. Enable HTTPS
2. Set secure headers
3. Implement rate limiting
4. Add CORS policies
5. Sanitize user inputs