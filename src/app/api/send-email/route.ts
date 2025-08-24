import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { validateContactForm, checkRateLimit, sanitizeInput } from './validate'

// Конфигурация на имейл транспорта за Vercel
const createTransporter = () => {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || '587')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  console.log('🔧 SMTP Configuration:', {
    host,
    port,
    user: user ? 'SET' : 'NOT SET',
    pass: pass ? 'SET' : 'NOT SET'
  })

  if (!host || !user || !pass) {
    throw new Error(`SMTP настройките не са конфигурирани правилно. Host: ${host}, User: ${user ? 'SET' : 'NOT SET'}, Pass: ${pass ? 'SET' : 'NOT SET'}`)
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true за 465, false за други портове
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false // За някои SMTP сървъри
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    // Проверка на CORS
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'https://editing.bg',
      'https://www.editing.bg',
      'http://localhost:3000',
      'https://editing-bg.vercel.app'
    ]
    
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'CORS не е разрешен за този домейн' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               request.headers.get('cf-connecting-ip') || 
               'unknown'
    
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

    console.log('📧 Подготовка за изпращане на имейл от:', email)

    // Създаване на транспорта
    const transporter = createTransporter()

    // Подготовка на имейл съдържанието
    const mailOptions = {
      from: `"Editing.bg Contact Form" <${process.env.SMTP_USER}>`,
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
            <p>IP адрес: ${ip}</p>
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
IP адрес: ${ip}
      `
    }

    console.log('📤 Опит за изпращане на имейл...')

    // Изпращане на имейла
    await transporter.sendMail(mailOptions)

    // Логване на успешното изпращане
    console.log(`✅ Имейл изпратен успешно от ${email} (IP: ${ip}) на ${new Date().toISOString()}`)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Съобщението е изпратено успешно! Ще се свържем с вас скоро.' 
      },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    )

  } catch (error) {
    console.error('❌ Грешка при изпращане на имейл:', error)
    
    // По-детайлни грешки за debugging
    let errorMessage = 'Възникна грешка при изпращането на съобщението. Моля опитайте отново по-късно.'
    
    if (error instanceof Error) {
      if (error.message.includes('SMTP настройките не са конфигурирани')) {
        errorMessage = 'Сървърната конфигурация не е правилна. Моля свържете се с администратора.'
      } else if (error.message.includes('authentication')) {
        errorMessage = 'Грешка при удостоверяване на имейл сървъра.'
      } else if (error.message.includes('connection')) {
        errorMessage = 'Грешка при свързване с имейл сървъра.'
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Не може да се свърже с имейл сървъра. Проверете SMTP настройките.'
      } else if (error.message.includes('EAUTH')) {
        errorMessage = 'Грешка при удостоверяване. Проверете SMTP_USER и SMTP_PASS.'
      } else {
        errorMessage = `Грешка: ${error.message}`
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

// OPTIONS метод за CORS
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')
  const allowedOrigins = [
    'https://editing.bg',
    'https://www.editing.bg',
    'http://localhost:3000',
    'https://editing-bg.vercel.app'
  ]
  
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin || '') ? origin! : '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}
