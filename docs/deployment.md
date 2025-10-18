# Deployment Guide

## Overview

LightChain Solana is a frontend-only Next.js application that can be deployed to various hosting platforms. This guide covers deployment options and configuration.

## Prerequisites

### System Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Git**: v2.30.0 or higher

### Hosting Requirements

- **Static Hosting**: Vercel, Netlify, or any static host
- **Domain**: Custom domain (optional)
- **SSL Certificate**: Automatic on most platforms

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the best experience for Next.js applications with automatic deployments and optimizations.

#### Steps:

1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Connect `degenwithheart/LightChain-AIO`

2. **Configure Build Settings:**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install",
     "devCommand": "npm run dev"
   }
   ```

3. **Environment Variables:**
   ```env
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   NEXT_PUBLIC_APP_ENV=production
   ```

4. **Deploy:**
   - Vercel automatically deploys on every push to main
   - Custom domain can be configured in project settings

### Option 2: Netlify

1. **Connect Repository:**
   - Go to [netlify.com](https://netlify.com)
   - Import from Git
   - Select your repository

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

3. **Environment Variables:**
   Same as Vercel configuration above.

### Option 3: Manual Build and Deploy

#### Build the Application:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Export static files (optional)
npm run export
```

#### Deploy to Static Host:

Upload the `.next` folder or exported files to:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Any static hosting service

## Environment Configuration

### Required Environment Variables

Create a `.env.local` file in production:

```env
# Solana Configuration
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Application Settings
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Optional: Analytics
NEXT_PUBLIC_GA_TRACKING_ID=your_google_analytics_id
```

### Environment Variable Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Solana RPC endpoint | Yes | `https://api.mainnet-beta.solana.com` |
| `NEXT_PUBLIC_APP_ENV` | Environment (development/production) | No | `development` |
| `NEXT_PUBLIC_APP_URL` | Application URL | No | `http://localhost:3000` |

## Build Optimization

### Next.js Optimizations

The application includes several performance optimizations:

- **Static Generation**: Pages are pre-rendered at build time
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Optimized bundle sizes

### Performance Monitoring

Monitor performance using:
- **Next.js Analytics**: Built-in performance metrics
- **Web Vitals**: Core Web Vitals tracking
- **Lighthouse**: Google Lighthouse audits

## Security Considerations

### Environment Security

- Never commit `.env.local` to version control
- Use different RPC endpoints for production
- Enable rate limiting on hosting platform

### Content Security Policy

Configure CSP headers on your hosting platform:

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self';
connect-src 'self' https://api.mainnet-beta.solana.com https://api.dexscreener.com;
```

## Custom Domain Setup

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Netlify
1. Go to Site Settings > Domain Management
2. Add custom domain
3. Update DNS records

## Monitoring and Maintenance

### Error Tracking

Set up error tracking with Sentry:

```bash
npm install @sentry/nextjs
```

Configure in `sentry.client.config.js` and `sentry.server.config.js`.

### Analytics

Add analytics tracking:

```bash
npm install @vercel/analytics
```

Import and use in `_app.tsx`.

### Performance Monitoring

Use Vercel Analytics or Google Analytics for performance monitoring.

## Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version compatibility
- Ensure all dependencies are installed
- Verify environment variables are set

#### Runtime Errors
- Check browser console for errors
- Verify RPC endpoint connectivity
- Ensure wallet connections work

#### Performance Issues
- Enable compression on hosting platform
- Optimize images and bundles
- Use CDN for static assets

## Cost Optimization

### Hosting Costs

- **Vercel**: Free tier available, paid plans for higher usage
- **Netlify**: Free tier with generous limits
- **Custom**: Depends on cloud provider

### Performance Optimization

- Use static generation where possible
- Implement proper caching strategies
- Optimize bundle sizes

---

**Last updated:** October 18, 2025

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/lightchain
REDIS_URL=redis://localhost:6379

# API Keys
JWT_SECRET=your_jwt_secret_here
API_SECRET_KEY=your_api_secret_key

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Social Media (optional)
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
TELEGRAM_BOT_TOKEN=your_bot_token
```

### 4. Database Setup

#### PostgreSQL

```sql
-- Create database
CREATE DATABASE lightchain;

-- Create user
CREATE USER lightchain_user WITH PASSWORD 'your_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE lightchain TO lightchain_user;
```

#### MongoDB

```javascript
// MongoDB connection string
mongodb://username:password@localhost:27017/lightchain
```

## Development Deployment

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Docker Development

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t lightchain .
docker run -p 3000:3000 lightchain
```

## Production Deployment

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings

2. **Environment Variables**
   - Add all environment variables from `.env.local`
   - Configure domain settings

3. **Deploy**
   ```bash
   git push origin main
   ```

### Option 2: Docker + Nginx

#### Docker Compose Setup

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    environment:
      - NODE_ENV=production
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: lightchain
      POSTGRES_USER: lightchain_user
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

#### Nginx Configuration

```nginx
# /etc/nginx/sites-available/lightchain
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # SSL Configuration (Let's Encrypt)
    listen 443 ssl http2;
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
}
```

### Option 3: AWS Deployment

#### EC2 + RDS + ElastiCache

1. **Launch EC2 Instance**
   ```bash
   # Ubuntu 20.04 LTS
   aws ec2 run-instances \
     --image-id ami-0c55b159cbfafe1d0 \
     --instance-type t3.medium \
     --key-name your-key-pair
   ```

2. **Setup RDS PostgreSQL**
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier lightchain-db \
     --db-instance-class db.t3.micro \
     --engine postgres \
     --master-username lightchain_user \
     --master-user-password your_password \
     --allocated-storage 20
   ```

3. **Setup ElastiCache Redis**
   ```bash
   aws elasticache create-cache-cluster \
     --cache-cluster-id lightchain-redis \
     --cache-node-type cache.t3.micro \
     --engine redis \
     --num-cache-nodes 1
   ```

4. **Deploy Application**
   ```bash
   # On EC2 instance
   git clone https://github.com/degenwithheart/LightChain-AIO.git
   cd LightChain-AIO
   npm install
   npm run build
   npm start
   ```

## Monitoring & Maintenance

### Health Checks

```bash
# Application health
curl https://yourdomain.com/api/health

# Database connectivity
curl https://yourdomain.com/api/health/db

# Solana RPC connectivity
curl https://yourdomain.com/api/health/solana
```

### Logs

```bash
# View application logs
pm2 logs lightchain

# View nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Backup Strategy

#### Database Backup

```bash
# PostgreSQL backup
pg_dump lightchain > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump lightchain > /backups/backup_$DATE.sql
find /backups -name "backup_*.sql" -mtime +7 -delete
```

#### File Backup

```bash
# Backup user uploads and configs
tar -czf /backups/files_$DATE.tar.gz /app/uploads /app/config
```

### Scaling

#### Horizontal Scaling

```yaml
# docker-compose.scale.yml
version: '3.8'

services:
  app:
    build: .
    deploy:
      replicas: 3
    environment:
      - NODE_ENV=production

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
```

#### Load Balancing

```nginx
# nginx.conf
upstream app_backend {
    server app1:3000;
    server app2:3000;
    server app3:3000;
}

server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://app_backend;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}
```

## Security Considerations

### SSL/TLS

```bash
# Let's Encrypt SSL certificate
certbot --nginx -d yourdomain.com
```

### Firewall Configuration

```bash
# UFW firewall rules
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
```

### Environment Security

- Use strong, unique passwords
- Rotate API keys regularly
- Enable 2FA for admin accounts
- Use environment-specific configurations
- Never commit secrets to version control

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### Database Connection Issues

```bash
# Test database connection
psql -h localhost -U lightchain_user -d lightchain

# Check connection string
echo $DATABASE_URL
```

#### Memory Issues

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm start
```

### Performance Optimization

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
  },
  images: {
    domains: ['yourdomain.com'],
  },
}
```

## Support

For deployment assistance, please contact our technical support team at [support@lightchain.solana](mailto:support@lightchain.solana) or join our [Discord community](https://discord.gg/lightchain).