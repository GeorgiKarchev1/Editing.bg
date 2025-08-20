# Deployment Guide - Editing.bg

## 🚀 Автоматичен Deployment с Plesk Webhook

### Как работи:
1. Push към GitHub → Plesk получава webhook
2. Plesk автоматично изпълнява `plesk-deploy.sh`
3. Сайтът се обновява автоматично

## 📋 Настройка в Plesk:

### 1. Git Integration
1. Отидете в Plesk → Domains → editing.bg → Git
2. Настройте:
   - **Repository URL**: `https://github.com/GeorgiKarchev1/Editing.bg.git`
   - **Branch**: `main`
   - **Deployment script**: `./plesk-deploy.sh`

### 2. Webhook URL
1. Копирайте webhook URL-а от Plesk
2. Отидете в GitHub → Settings → Webhooks
3. Добавете webhook с URL-а от Plesk

## 🧪 Тестване на Deployment:

### Локално тестване:
```bash
# Build и push
./deploy.sh
```

### Проверка в Plesk:
1. Отидете в Plesk → Logs
2. Проверете за deployment съобщения
3. Проверете дали `plesk-deploy.sh` се изпълнява

## 🔍 Troubleshooting:

### Ако webhook не работи:
1. **Проверете Plesk логовете**
2. **Проверете GitHub webhook deliveries**
3. **Ръчен deployment**:
   ```bash
   # В Plesk терминала
   cd /var/www/vhosts/editing.bg
   ./plesk-deploy.sh
   ```

### Ако има грешки:
1. **Проверете Node.js версията** (18.x+)
2. **Проверете permissions** на файловете
3. **Проверете environment variables**

## ✅ Успешен Deployment:

След успешен deployment:
- ✅ https://editing.bg работи
- ✅ https://editing.bg/portfolio работи  
- ✅ Контакт формата работи
- ✅ SMTP интеграция работи

## 🎯 Следващи стъпки:

1. **Тествайте контакт формата**
2. **Проверете SMTP настройките**
3. **Мониторирайте логовете**
4. **Настройте backup стратегия**

---

**Успех с автоматичния deployment!** 🚀
