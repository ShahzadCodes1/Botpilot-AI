
#!/bin/bash
# ──────────────────────────────────────────────────
# BOTPILOT AI — DigitalOcean Deployment Script
# Domain: botpilot.ahmaddataops.com
# ──────────────────────────────────────────────────
set -e

DOMAIN="botpilot.ahmaddataops.com"
EMAIL="ahmad.dstech@gmail.com"

echo "═══════════════════════════════════════════"
echo "  BOTPILOT AI — Deployment Script"
echo "  Domain: $DOMAIN"
echo "═══════════════════════════════════════════"

# 1. Update system & install Docker
echo ">> Installing Docker & Docker Compose..."
apt update && apt upgrade -y
apt install -y curl git
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose

# 2. Clone or pull the project
if [ -d "/root/website" ]; then
    echo ">> Pulling latest code..."
    cd /root/website && git pull
else
    echo ">> Cloning project..."
    cd /root
    git clone https://github.com/AhmadMughal-DS/website.git website
    cd /root/website
fi

# 3. Build & start containers (HTTP first for SSL cert)
echo ">> Building & starting containers..."
docker-compose up -d --build

# 4. Wait for nginx to start
echo ">> Waiting for Nginx..."
sleep 5

# 5. Get SSL certificate from Let's Encrypt
echo ">> Obtaining SSL certificate for $DOMAIN..."
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN

# 6. Copy SSL nginx config into container
echo ">> Enabling HTTPS..."
docker cp /root/website/frontend/nginx-ssl.conf botpilot-frontend:/etc/nginx/conf.d/default.conf
docker exec botpilot-frontend nginx -s reload

echo ""
echo "═══════════════════════════════════════════"
echo "  ✅ Deployment Complete!"
echo "  🌐 https://$DOMAIN"
echo "═══════════════════════════════════════════"
