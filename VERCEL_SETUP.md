# Vercel Deployment - Editing.bg

## 🚀 Стъпки за Vercel Deployment

### 1. Подготовка на проекта
```bash
# Уверете се, че всички промени са commit-нати
git add .
git commit -m "Prepare for Vercel deployment with improved contact form"
git push origin main
```

### 2. Свържете с Vercel
1. Отидете на [vercel.com](https://vercel.com)
2. Sign up с GitHub акаунта
3. Import repository: `GeorgiKarchev1/Editing.bg`
4. Vercel ще автоматично разпознае Next.js проекта

### 3. Настройте Environment Variables в Vercel

В Vercel Dashboard → Project Settings → Environment Variables, добавете:

#### За Gmail SMTP (препоръчителен):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://editing.bg
```

#### За Resend.com (алтернатива):
```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=your-resend-api-key
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://editing.bg
```

#### За Brevo (Sendinblue) - безплатно до 300 имейла/ден:
```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-brevo-email@domain.com
SMTP_PASS=your-brevo-smtp-key
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://editing.bg
```

### 4. Настройте домейна

#### В Vercel:
1. Отидете в Project Settings → Domains
2. Добавете: `editing.bg`
3. Vercel ще даде DNS настройки

#### В register.bg:
Добавете следните DNS записи:
```
Type: A
Name: @
Value: 76.76.19.36

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 5. Тестване на контакт формата
1. Сайтът ще бъде достъпен на: `https://editing.bg`
2. Контакт формата ще работи автоматично
3. Имейлите ще се изпращат чрез настроения SMTP

## 📧 SMTP настройки

### Gmail SMTP (безплатно):
1. Активирайте 2FA в Gmail
2. Генерирайте App Password:
   - Отидете в Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Генерирайте нов App Password за "Mail"
3. Използвайте App Password като SMTP_PASS

### Resend.com (безплатно до 100 имейла/ден):
1. Създайте акаунт на [resend.com](https://resend.com)
2. Валидирайте домейна
3. Използвайте API ключа като SMTP_PASS

### Brevo (Sendinblue) - препоръчителен:
1. Създайте акаунт на [brevo.com](https://brevo.com)
2. Валидирайте домейна
3. Генерирайте SMTP ключ
4. Използвайте SMTP ключа като SMTP_PASS

## 🔧 Troubleshooting

### Ако контакт формата не работи:

1. **Проверете Environment Variables:**
   - Уверете се, че всички SMTP настройки са правилни
   - Проверете дали SMTP_PASS е правилен

2. **Проверете Vercel Logs:**
   - Отидете в Vercel Dashboard → Functions
   - Проверете логовете на `/api/send-email`

3. **Тествайте SMTP настройките:**
   ```bash
   # Създайте test-email.js файл за тестване
   node test-email.js
   ```

4. **Проверете CORS настройките:**
   - Уверете се, че домейнът е в allowedOrigins списъка

### Често срещани грешки:

- **"SMTP настройките не са конфигурирани"** - Проверете Environment Variables
- **"authentication"** - Грешен SMTP_PASS
- **"connection"** - Грешен SMTP_HOST или SMTP_PORT

## ✅ След deployment:
- ✅ Сайтът работи на https://editing.bg
- ✅ Контакт формата изпраща имейли
- ✅ Автоматични updates при push към GitHub
- ✅ SSL сертификат автоматично
- ✅ CDN за бързо зареждане
- ✅ Rate limiting за защита от спам
- ✅ CORS защита
- ✅ XSS защита

## 🎯 Предимства на Vercel:
- 🚀 Много по-лесен deployment
- 🔄 Автоматични updates
- 🌐 Глобален CDN
- 🔒 Автоматичен SSL
- 📊 Analytics включени
- 🆓 Безплатен план
- 🔍 Детайлни логове
- ⚡ Edge Functions

## 📝 Допълнителни настройки

### За по-добра сигурност:
1. Добавете reCAPTCHA към контакт формата
2. Настройте rate limiting по-стриктно
3. Добавете email validation на сървъра

### За monitoring:
1. Настройте Vercel Analytics
2. Добавете error tracking (Sentry)
3. Настройте uptime monitoring

---

**Успех с Vercel deployment-а!** 🚀
