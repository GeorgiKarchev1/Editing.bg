# Конфигурация на контакт формата за Plesk

## 1. Environment Variables

Създайте `.env.local` файл в root директорията на проекта със следните настройки:

```env
# Plesk SMTP настройки
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USER=noreply@editing.bg
SMTP_PASS=your_smtp_password_here

# Допълнителни настройки
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://editing.bg
```

## 2. Plesk SMTP конфигурация

### Вариант 1: Използване на Plesk Mail Server
1. Влезте в Plesk панела
2. Отидете на "Mail" секцията
3. Създайте нов имейл акаунт: `noreply@editing.bg`
4. Задайте парола за SMTP достъп
5. Използвайте следните настройки:
   - Host: `localhost` или `your-server-ip`
   - Port: `587` (STARTTLS) или `465` (SSL)
   - Username: `noreply@editing.bg`
   - Password: `your_password`

### Вариант 2: Използване на външен SMTP (Gmail, Outlook, etc.)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 3. Тестване на конфигурацията

1. Стартирайте development сървъра:
```bash
npm run dev
```

2. Отворете контакт формата и изпратете тестово съобщение

3. Проверете логовете в конзолата за грешки

## 4. Production деплой

### За Vercel:
1. Добавете environment variables в Vercel dashboard
2. Deploy проекта

### За Plesk:
1. Upload проекта в Plesk
2. Конфигурирайте Node.js приложение
3. Добавете environment variables в Plesk

## 5. Безопасност

- Никога не комитирайте `.env` файлове
- Използвайте силни пароли
- Ограничете SMTP достъпа само за необходимите IP адреси
- Регулярно сменяйте паролите

## 6. Troubleshooting

### Често срещани грешки:

1. **Authentication failed**
   - Проверете username/password
   - Уверете се, че SMTP е активиран

2. **Connection timeout**
   - Проверете SMTP_HOST и SMTP_PORT
   - Уверете се, че firewall позволява връзки

3. **TLS errors**
   - Променете `secure: false` в кода
   - Проверете SSL/TLS настройките

## 7. Мониторинг

- Проверете логовете в Plesk
- Настройте уведомления за грешки
- Мониторирайте SMTP статистики

## 8. Backup

- Регулярно backup-вайте конфигурацията
- Запазете environment variables на сигурно място
- Тествайте възстановяването
