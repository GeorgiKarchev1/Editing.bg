import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { validateContactForm, checkRateLimit, sanitizeInput } from './validate'

// Конфигурация на имейл транспорта за Plesk
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost', // Plesk SMTP сървър
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true за 465, false за други портове
  auth: {
    user: process.env.SMTP_USER || 'noreply@editing.bg',
    pass: process.env.SMTP_PASS || '',
  },
  tls: {
    rejectUnauthorized: false // За Plesk сървъри
  }
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Твърде много опити за изпращане. Моля опитайте по-късно.' },
        { status: 429 }
      )
    }



    // Sanitize входните данни
    const sanitizedData = {
      name: sanitizeInput(body.name || ''),
      email: sanitizeInput(body.email || ''),
      message: sanitizeInput(body.message || ''),
      projectType: sanitizeInput(body.projectType || 'YouTube Video')
    }

    // Валидация на данните
    const validation = validateContactForm(sanitizedData)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      )
    }

    const { name, email, message, projectType } = sanitizedData

    // Подготовка на имейл съдържанието
    const mailOptions = {
      from: `"Editing.bg Contact Form" <${process.env.SMTP_USER || 'noreply@editing.bg'}>`,
      to: 'editing.bg.official@gmail.com', // Вашият имейл адрес
      replyTo: email,
      subject: `Ново запитване от ${name} - ${projectType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; text-align: center;">Ново запитване от Editing.bg</h1>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Детайли на запитването:</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4F46E5;">Име:</strong>
              <span style="margin-left: 10px;">${name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4F46E5;">Имейл:</strong>
              <span style="margin-left: 10px;">
                <a href="mailto:${email}" style="color: #4F46E5; text-decoration: none;">${email}</a>
              </span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #4F46E5;">Тип проект:</strong>
              <span style="margin-left: 10px;">${projectType}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #4F46E5;">Съобщение:</strong>
              <div style="margin-top: 10px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #4F46E5; border-radius: 5px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Отговор на запитване - Editing.bg" 
                 style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                Отговори на запитването
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>Това съобщение е изпратено от контакт формата на <a href="https://editing.bg" style="color: #4F46E5;">editing.bg</a></p>
            <p>Време на изпращане: ${new Date().toLocaleString('bg-BG')}</p>
          </div>
        </div>
      `,
      text: `
Ново запитване от Editing.bg

Име: ${name}
Имейл: ${email}
Тип проект: ${projectType}

Съобщение:
${message}

---
Изпратено от: https://editing.bg
Време: ${new Date().toLocaleString('bg-BG')}
      `
    }

    // Изпращане на имейла
    await transporter.sendMail(mailOptions)

    // Логване на успешното изпращане
    console.log(`Имейл изпратен успешно от ${email} на ${new Date().toISOString()}`)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Съобщението е изпратено успешно! Ще се свържем с вас скоро.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Грешка при изпращане на имейл:', error)
    
    return NextResponse.json(
      { 
        error: 'Възникна грешка при изпращането на съобщението. Моля опитайте отново по-късно.' 
      },
      { status: 500 }
    )
  }
}

// OPTIONS метод за CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
