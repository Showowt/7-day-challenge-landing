import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { email, referralCode } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const referralLink = `https://7-day-challenge-landing.vercel.app?ref=${referralCode}`

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're In! 🎉</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1)); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 40px;">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <span style="font-size: 24px; font-weight: bold; color: #ffffff;">✨ MachineMind</span>
            </td>
          </tr>
          
          <!-- Main Heading -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #ffffff;">You're In! 🎉</h1>
            </td>
          </tr>
          
          <!-- Subheading -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <p style="margin: 0; font-size: 18px; color: rgba(255,255,255,0.7); line-height: 1.6;">
                Get ready for <strong style="color: #ec4899;">7 days of free AI tools</strong> starting <strong style="color: #ffffff;">Monday, Feb 3rd</strong>.
              </p>
            </td>
          </tr>
          
          <!-- The Lineup -->
          <tr>
            <td style="padding-bottom: 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 16px 0; font-size: 16px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px;">THE LINEUP</h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="padding: 8px 0; color: #ffffff; font-size: 14px;">💰 <strong>Monday</strong> — Revenue Leak Detector</td></tr>
                      <tr><td style="padding: 8px 0; color: #ffffff; font-size: 14px;">🛠️ <strong>Tuesday</strong> — Content Calendar Generator</td></tr>
                      <tr><td style="padding: 8px 0; color: #ffffff; font-size: 14px;">💅 <strong>Wednesday</strong> — Self-Care Concierge</td></tr>
                      <tr><td style="padding: 8px 0; color: #ffffff; font-size: 14px;">🔥 <strong>Thursday</strong> — Party & Vibe Planner</td></tr>
                      <tr><td style="padding: 8px 0; color: #ffffff; font-size: 14px;">💎 <strong>Friday</strong> — Luxury Concierge</td></tr>
                      <tr><td style="padding: 8px 0; color: #ffffff; font-size: 14px;">🎯 <strong>Saturday</strong> — Business Idea Validator</td></tr>
                      <tr><td style="padding: 8px 0; color: #ffffff; font-size: 14px;">👑 <strong>Sunday</strong> — Personal Brand Builder</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- What to Expect -->
          <tr>
            <td style="padding-bottom: 30px;">
              <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #ffffff;">What happens next?</h3>
              <p style="margin: 0; font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.7;">
                Every morning at <strong style="color: #ffffff;">9 AM EST</strong>, I'll send you that day's free tool. Each one is fully functional — not a demo, not a teaser. Real tools you can use immediately.
              </p>
            </td>
          </tr>
          
          <!-- Share Section -->
          <tr>
            <td style="padding-bottom: 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2)); border-radius: 16px; padding: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #ffffff;">🎁 Want a Bonus Tool?</h3>
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: rgba(255,255,255,0.7);">
                      Share the challenge with your friends. The more people who join, the more bonus tools I'll create.
                    </p>
                    <a href="${referralLink}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #ec4899, #a855f7); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px;">
                      Share Your Link →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Instagram CTA -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <p style="margin: 0 0 12px 0; font-size: 14px; color: rgba(255,255,255,0.5);">Follow for daily updates & behind-the-scenes:</p>
              <a href="https://instagram.com/showowt" style="display: inline-block; padding: 12px 24px; background: rgba(255,255,255,0.1); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px;">
                📸 @showowt on Instagram
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px;">
              <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.4);">
                See you Monday 🚀
              </p>
              <p style="margin: 8px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.4);">
                — Phil, MachineMind
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'MachineMind <onboarding@resend.dev>', // Change to your domain once verified
        to: email,
        subject: "You're in! 🎉 7 Days of Free AI Tools starts Monday",
        html: htmlContent,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Resend error:', data)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
