# Деплой на Editing.bg в Plesk

## 1. Подготовка на проекта

### Локална подготовка
```bash
# Клонирайте проекта
git clone <your-repo-url>
cd tsvetan-portfolio

# Инсталирайте зависимости
npm install

# Създайте production build
npm run build

# Тествайте локално
npm start
```

## 2. Plesk конфигурация

### Създаване на домейн
1. Влезте в Plesk панела
2. Отидете на "Domains" → "Add Domain"
3. Въведете: `editing.bg`
4. Изберете "Node.js" като hosting type

### Node.js настройки
1. Отидете на "Node.js" секцията
2. Конфигурирайте:
   - **Node.js version**: 18.x или по-нова
   - **Application mode**: Production
   - **Application startup file**: `server.js` (ще създадем)
   - **Application URL**: `http://localhost:3000`

## 3. Създаване на server.js

Създайте `server.js` файл в root директорията:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
```

## 4. Environment Variables

В Plesk панела, отидете на "Environment Variables" и добавете:

```env
NODE_ENV=production
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USER=noreply@editing.bg
SMTP_PASS=your_smtp_password
NEXT_PUBLIC_SITE_URL=https://editing.bg
```

## 5. Upload на файловете

### Вариант 1: Git (Препоръчителен)
```bash
# В Plesk, отидете на "Git" секцията
# Добавете вашия repository URL
# Настройте auto-deploy при push
```

### Вариант 2: FTP/SFTP
1. Използвайте File Manager в Plesk
2. Upload всички файлове в домейн директорията
3. Уверете се, че `.env.local` е качен

## 6. SMTP конфигурация

### В Plesk Mail секцията:
1. Създайте имейл акаунт: `noreply@editing.bg`
2. Задайте силна парола
3. Активирайте SMTP достъп

### Тестване на SMTP:
```bash
# В Plesk терминала
telnet localhost 587
```

## 7. SSL сертификат

1. Отидете на "SSL/TLS Certificates"
2. Активирайте "Let's Encrypt" сертификат
3. Настройте автоматично пренасочване от HTTP към HTTPS

## 8. Домейн настройки

### DNS записи:
```
A     @     your-server-ip
CNAME www   editing.bg
MX    @     mail.editing.bg
```

## 9. Тестване

### Проверете:
1. [https://editing.bg](https://editing.bg) - основен сайт
2. [https://editing.bg/portfolio](https://editing.bg/portfolio) - портфолио
3. Контакт формата - изпратете тестово съобщение
4. Проверете логовете в Plesk

## 10. Мониторинг

### Настройте в Plesk:
1. **Error Logs**: Мониторирайте за грешки
2. **Access Logs**: Следете трафика
3. **Performance**: Мониторирайте ресурсите
4. **Backup**: Автоматични backup-и

## 11. Оптимизация

### Next.js оптимизации:
```javascript
// next.config.js
const nextConfig = {
  output: 'standalone', // За Plesk
  compress: true,
  poweredByHeader: false,
  // ... останалите настройки
}
```

### Plesk оптимизации:
1. Активирайте Gzip компресия
2. Настройте кеширане
3. Оптимизирайте изображенията

## 12. Troubleshooting

### Често срещани проблеми:

1. **Node.js не стартира**
   - Проверете версията
   - Проверете `server.js` файла
   - Проверете логовете

2. **SMTP грешки**
   - Проверете credentials
   - Проверете firewall настройките
   - Тествайте с telnet

3. **SSL проблеми**
   - Проверете сертификата
   - Проверете DNS настройките
   - Изчакайте propagation

## 13. Backup стратегия

### Автоматични backup-и:
1. **Код**: Git repository
2. **Данни**: Plesk backup
3. **Конфигурация**: Environment variables
4. **Съдържание**: Public файлове

## 14. Security

### Безопасностни мерки:
1. Регулярни updates
2. Сигурни пароли
3. Firewall настройки
4. SSL/TLS
5. Rate limiting (вече имплементирано)

## 15. Поддръжка

### Регулярни задачи:
1. Мониториране на логовете
2. Проверка на performance
3. Update на зависимостите
4. Backup проверка
5. Security сканиране
