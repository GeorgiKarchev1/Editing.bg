const nodemailer = require('nodemailer');

// Тестови настройки за Resend
const testConfig = {
  host: 'smtp.resend.com',
  port: 587,
  user: 'resend',
  pass: 're_j4Bsiqo3_CLkj2Sb31nTM2ekypjYKdXSx'
};

async function testResend() {
  console.log('🧪 Тестване на Resend настройките...\n');
  
  console.log('📋 Конфигурация:');
  console.log(`Host: ${testConfig.host}`);
  console.log(`Port: ${testConfig.port}`);
  console.log(`User: ${testConfig.user}`);
  console.log(`Pass: ${testConfig.pass ? 'SET' : 'NOT SET'}\n`);

  try {
    // Създаване на транспорта
    const transporter = nodemailer.createTransport({
      host: testConfig.host,
      port: testConfig.port,
      secure: false,
      auth: {
        user: testConfig.user,
        pass: testConfig.pass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('🔌 Тестване на връзката...');
    
    // Тестване на връзката
    await transporter.verify();
    console.log('✅ Връзката е успешна!\n');

    // Тестов имейл
    const mailOptions = {
      from: 'noreply@editing.bg',
      to: 'editing.bg.official@gmail.com',
      subject: 'Тест от Resend',
      text: 'Това е тестов имейл от Resend.com',
      html: '<h1>Тест от Resend</h1><p>Това е тестов имейл от Resend.com</p>'
    };

    console.log('📧 Изпращане на тестов имейл...');
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Имейлът е изпратен успешно!');
    console.log(`Message ID: ${info.messageId}`);
    console.log(`От: ${mailOptions.from}`);
    console.log(`До: ${mailOptions.to}`);
    
  } catch (error) {
    console.error('❌ Грешка:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Проблем с удостоверяването:');
      console.log('- Проверете дали API ключът е правилен');
      console.log('- Проверете дали домейнът е валидиран в Resend');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n💡 Проблем с връзката:');
      console.log('- Проверете интернет връзката');
      console.log('- Проверете SMTP_HOST и SMTP_PORT');
    } else if (error.message.includes('Bad sender address')) {
      console.log('\n💡 Проблем с from адреса:');
      console.log('- Проверете дали noreply@editing.bg е валидиран в Resend');
      console.log('- Опитайте с друг from адрес');
    }
  }
}

testResend();
