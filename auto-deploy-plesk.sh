#!/bin/bash

echo "🚀 Автоматична конфигурация на Plesk за Editing.bg"
echo "=================================================="

# Проверка на директорията
if [ ! -f "server.js" ]; then
    echo "❌ Грешка: server.js файлът не е намерен!"
    echo "Моля, изпълнете скрипта в правилната директория."
    exit 1
fi

echo "✅ Намерени са всички необходими файлове"

# Инсталиране на зависимости
echo "📦 Инсталиране на зависимости..."
npm ci --production

# Build за production
echo "🔨 Building за production..."
NODE_ENV=production npm run build

# Създаване на .env файл
echo "⚙️ Създаване на environment файл..."
cat > .env << 'EOF'
NODE_ENV=production
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USER=noreply@editing.bg
SMTP_PASS=4g_sZ30w1%
NEXT_PUBLIC_SITE_URL=https://editing.bg
EOF

# Проверка на permissions
echo "🔐 Настройване на permissions..."
chmod +x server.js
chmod +x plesk-deploy.sh

# Създаване на PM2 конфигурация
echo "⚡ Създаване на PM2 конфигурация..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'editing-bg',
    script: 'server.js',
    cwd: process.cwd(),
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      SMTP_HOST: 'localhost',
      SMTP_PORT: 587,
      SMTP_USER: 'noreply@editing.bg',
      SMTP_PASS: '4g_sZ30w1%',
      NEXT_PUBLIC_SITE_URL: 'https://editing.bg'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
EOF

# Създаване на logs директория
mkdir -p logs

# Стартиране на приложението
echo "🚀 Стартиране на приложението..."
if command -v pm2 &> /dev/null; then
    pm2 delete editing-bg 2>/dev/null || true
    pm2 start ecosystem.config.js
    pm2 save
    echo "✅ Приложението е стартирано с PM2"
else
    echo "⚠️ PM2 не е наличен, стартиране директно..."
    nohup node server.js > logs/app.log 2>&1 &
    echo $! > app.pid
    echo "✅ Приложението е стартирано директно"
fi

# Проверка на статуса
echo "🔍 Проверка на статуса..."
sleep 3

if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Приложението работи на http://localhost:3000"
else
    echo "❌ Приложението не отговаря на http://localhost:3000"
    echo "Проверете логовете в logs/ директорията"
fi

echo ""
echo "🎉 Автоматичната конфигурация е завършена!"
echo "🌐 Вашият сайт трябва да работи на: https://editing.bg"
echo "📧 Контакт формата е готов за тестване"
echo ""
echo "📋 Следващи стъпки:"
echo "1. Проверете https://editing.bg"
echo "2. Тествайте контакт формата"
echo "3. Проверете логовете ако има проблеми"
