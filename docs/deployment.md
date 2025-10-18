# Deployment Guide

## Overview

This guide covers the deployment process for LightChain Solana, including prerequisites, environment setup, and deployment strategies.

## Prerequisites

### System Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Git**: v2.30.0 or higher
- **Docker**: v20.10.0 or higher (optional)
- **Solana CLI**: v1.14.0 or higher

### Network Requirements

- **RPC Endpoint**: Solana mainnet-beta or devnet
- **Database**: PostgreSQL 13+ or MongoDB 5+
- **Redis**: v6.0+ (for caching and sessions)
- **Load Balancer**: Nginx or similar

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/degenwithheart/LightChain-AIO.git
cd LightChain-AIO
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Application
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Solana Configuration
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_NETWORK=mainnet-beta

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