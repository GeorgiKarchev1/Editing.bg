const nodemailer = require('nodemailer')
require('dotenv').config()

// Тестова конфигурация
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'noreply@editing.bg',
    pass: process.env.SMTP_PASS || '',
  },
  tls: {
    rejectUnauthorized: false
  }
})

async function testEmail() {
  try {
    console.log('🔧 Тестване на SMTP конфигурация...')
    console.log(`Host: ${process.env.SMTP_HOST || 'localhost'}`)
    console.log(`Port: ${process.env.SMTP_PORT || '587'}`)
    console.log(`User: ${process.env.SMTP_USER || 'noreply@editing.bg'}`)
    
    // Тестване на връзката
    await transporter.verify()
    console.log('✅ SMTP връзката е успешна!')
    
    // Изпращане на тестов имейл
    const mailOptions = {
      from: `"Editing.bg Test" <${process.env.SMTP_USER || 'noreply@editing.bg'}>`,
      to: 'editing.bg.official@gmail.com',
      subject: 'Тестов имейл от Editing.bg',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4F46E5;">Тестов имейл</h2>
          <p>Това е тестов имейл за проверка на SMTP конфигурацията.</p>
          <p><strong>Време на изпращане:</strong> ${new Date().toLocaleString('bg-BG')}</p>
          <p><strong>Сървър:</strong> ${process.env.SMTP_HOST || 'localhost'}</p>
        </div>
      `,
      text: `
Тестов имейл от Editing.bg

Това е тестов имейл за проверка на SMTP конфигурацията.

Време на изпращане: ${new Date().toLocaleString('bg-BG')}
Сървър: ${process.env.SMTP_HOST || 'localhost'}
      `
    }
    
    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Тестовият имейл е изпратен успешно!')
    console.log(`Message ID: ${info.messageId}`)
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
    
  } catch (error) {
    console.error('❌ Грешка при тестване на SMTP:')
    console.error(error.message)
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Възможни решения:')
      console.log('1. Проверете SMTP_USER и SMTP_PASS в .env файла')
      console.log('2. Уверете се, че SMTP е активиран в Plesk')
      console.log('3. Проверете firewall настройките')
    } else if (error.code === 'ECONNECTION') {
      console.log('\n💡 Възможни решения:')
      console.log('1. Проверете SMTP_HOST и SMTP_PORT')
      console.log('2. Уверете се, че сървърът е достъпен')
      console.log('3. Проверете мрежовите настройки')
    }
  }
}

// Изпълнение на теста
testEmail()
