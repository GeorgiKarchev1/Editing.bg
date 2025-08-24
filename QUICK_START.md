# 🚀 Бързо стартиране - Контакт форма във Vercel

## 1. Подготовка на SMTP настройки

### Gmail (най-лесен вариант):
1. Активирайте 2FA в Gmail
2. Генерирайте App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Изберете "Mail" и копирайте паролата

### Brevo (препоръчителен):
1. Създайте акаунт на [brevo.com](https://brevo.com)
2. Валидирайте домейна
3. Генерирайте SMTP ключ

## 2. Vercel Deployment

### Автоматично:
1. Push към GitHub: `git push origin main`
2. Отидете на [vercel.com](https://vercel.com)
3. Import repository: `GeorgiKarchev1/Editing.bg`

### Environment Variables в Vercel:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://editing.bg
```

## 3. Тестване

### Локално тестване:
```bash
# Копирайте env.example като .env.local
cp env.example .env.local
# Редактирайте .env.local с вашите настройки
npm run test:email
```

### Във Vercel:
1. Отидете на https://editing.bg
2. Попълнете контакт формата
3. Проверете дали получавате имейл

## 4. Troubleshooting

### Ако не работи:
1. Проверете Vercel Logs: Dashboard → Functions → /api/send-email
2. Проверете Environment Variables
3. Тествайте SMTP настройките локално

### Често срещани грешки:
- **EAUTH**: Грешен SMTP_PASS
- **ECONNECTION**: Грешен SMTP_HOST/PORT
- **ETIMEDOUT**: SMTP сървърът не отговаря

## 5. Домейн настройки

### В register.bg:
```
Type: A
Name: @
Value: 76.76.19.36

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

**Готово!** 🎉 Контакт формата ще работи на https://editing.bg
