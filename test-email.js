const nodemailer = require('nodemailer');
require('dotenv').config();

// Тестови данни
const testData = {
  name: 'Тест Потребител',
  email: 'test@example.com',
  message: 'Това е тестово съобщение за проверка на SMTP настройките.',
  projectType: 'YouTube Video'
};

async function testEmail() {
  console.log('🔧 Тестване на SMTP настройките...\n');

  // Проверка на environment variables
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log('📋 Environment Variables:');
  console.log(`SMTP_HOST: ${host || '❌ НЕ Е ЗАДАДЕН'}`);
  console.log(`SMTP_PORT: ${port || '❌ НЕ Е ЗАДАДЕН'}`);
  console.log(`SMTP_USER: ${user || '❌ НЕ Е ЗАДАДЕН'}`);
  console.log(`SMTP_PASS: ${pass ? '✅ ЗАДАДЕН' : '❌ НЕ Е ЗАДАДЕН'}\n`);

  if (!host || !port || !user || !pass) {
    console.error('❌ Грешка: Липсват SMTP настройки!');
    console.log('Моля проверете .env файла или Environment Variables в Vercel.');
    process.exit(1);
  }

  try {
    // Създаване на транспорта
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: parseInt(port) === 465,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('🔌 Свързване с SMTP сървъра...');

    // Тестване на връзката
    await transporter.verify();
    console.log('✅ SMTP връзката е успешна!\n');

    // Подготовка на тестов имейл
    const mailOptions = {
      from: `"Editing.bg Test" <${user}>`,
      to: 'editing.bg.official@gmail.com',
      replyTo: testData.email,
      subject: `Тест - ${testData.name} - ${testData.projectType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; text-align: center;">🧪 ТЕСТОВО СЪОБЩЕНИЕ</h1>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Тестови данни:</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4F46E5;">Име:</strong>
              <span style="margin-left: 10px;">${testData.name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4F46E5;">Имейл:</strong>
              <span style="margin-left: 10px;">${testData.email}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4F46E5;">Тип проект:</strong>
              <span style="margin-left: 10px;">${testData.projectType}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #4F46E5;">Съобщение:</strong>
              <div style="margin-top: 10px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #4F46E5; border-radius: 5px;">
                ${testData.message}
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>✅ Това е тестово съобщение за проверка на SMTP настройките</p>
            <p>Време на изпращане: ${new Date().toLocaleString('bg-BG')}</p>
          </div>
        </div>
      `,
      text: `
🧪 ТЕСТОВО СЪОБЩЕНИЕ

Име: ${testData.name}
Имейл: ${testData.email}
Тип проект: ${testData.projectType}

Съобщение:
${testData.message}

---
✅ Това е тестово съобщение за проверка на SMTP настройките
Време: ${new Date().toLocaleString('bg-BG')}
      `
    };

    console.log('📧 Изпращане на тестов имейл...');
    
    // Изпращане на имейла
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Тестовият имейл е изпратен успешно!');
    console.log(`📨 Message ID: ${info.messageId}`);
    console.log(`📤 От: ${mailOptions.from}`);
    console.log(`📥 До: ${mailOptions.to}`);
    console.log(`⏰ Време: ${new Date().toLocaleString('bg-BG')}\n`);
    
    console.log('🎉 SMTP настройките работят правилно!');
    console.log('Можете да продължите с Vercel deployment-а.');

  } catch (error) {
    console.error('❌ Грешка при тестване на SMTP:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Възможни решения:');
      console.log('1. Проверете дали SMTP_USER и SMTP_PASS са правилни');
      console.log('2. За Gmail - уверете се, че използвате App Password, не паролата');
      console.log('3. Проверете дали 2FA е активиран за Gmail акаунта');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n💡 Възможни решения:');
      console.log('1. Проверете дали SMTP_HOST е правилен');
      console.log('2. Проверете дали SMTP_PORT е правилен');
      console.log('3. Проверете интернет връзката');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('\n💡 Възможни решения:');
      console.log('1. SMTP сървърът не отговаря');
      console.log('2. Проверете firewall настройките');
      console.log('3. Опитайте с друг SMTP порт (587 или 465)');
    }
    
    process.exit(1);
  }
}

// Стартиране на теста
testEmail();
