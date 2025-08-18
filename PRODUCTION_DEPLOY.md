# Production Deployment - Editing.bg

## 🚀 Готово за Production!

Вашият проект е напълно готов за deployment в Plesk.

## 📋 Checklist преди deployment:

### ✅ Конфигурация
- [x] SMTP настройки са готови
- [x] Environment variables са конфигурирани
- [x] Production build скрипт е готов
- [x] Server.js файл е създаден

### ✅ Файлове за upload
- [x] Всички source файлове
- [x] package.json
- [x] next.config.js
- [x] server.js
- [x] .env файл (с production настройки)

## 🎯 Стъпки за deployment:

### 1. Подготовка на файловете
```bash
# Build за production
./build-production.sh

# Или ръчно:
npm run build:production
```

### 2. Upload в Plesk
1. Отидете в Plesk панела
2. File Manager → editing.bg домейн
3. Upload всички файлове

### 3. Node.js конфигурация в Plesk
1. Отидете на "Node.js" секцията
2. Настройте:
   - **Node.js version**: 18.x или по-нова
   - **Application mode**: Production
   - **Application startup file**: `server.js`
   - **Application URL**: `http://localhost:3000`

### 4. Environment Variables в Plesk
Добавете следните променливи:
```env
NODE_ENV=production
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USER=noreply@editing.bg
SMTP_PASS=4g_sZ30w1%
NEXT_PUBLIC_SITE_URL=https://editing.bg
```

### 5. Стартиране на приложението
1. В Plesk Node.js секцията
2. Кликнете "Restart Application"
3. Проверете логовете за грешки

## 🧪 Тестване в Production

### 1. Основен сайт
- [ ] https://editing.bg работи
- [ ] https://editing.bg/portfolio работи

### 2. Контакт форма
- [ ] Формата се зарежда
- [ ] Валидацията работи
- [ ] Имейлите се изпращат
- [ ] Успешно съобщение се показва

### 3. SMTP тестване
```bash
# В Plesk терминала
cd /path/to/your/app
node test-email.js
```

## 🔍 Troubleshooting

### Ако имате проблеми:

1. **Приложението не стартира**
   - Проверете Node.js версията
   - Проверете server.js файла
   - Проверете логовете

2. **SMTP грешки**
   - Проверете environment variables
   - Проверете имейл акаунта в Plesk
   - Тествайте с test-email.js

3. **404 грешки**
   - Проверете next.config.js
   - Проверете routing-а

## 📊 Мониторинг

### След deployment:
1. Проверете логовете редовно
2. Мониторирайте SMTP статуса
3. Следете error rate
4. Проверете performance

## 🎉 Готово!

След тези стъпки вашият сайт ще бъде напълно функционален в production с:
- ✅ Работеща контакт форма
- ✅ SMTP интеграция
- ✅ Безплатна система
- ✅ Професионален дизайн

**Успех с deployment-а!** 🚀
