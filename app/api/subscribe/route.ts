import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, referredBy, source } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    
    const cleanEmail = email.toLowerCase().trim()
    
    const { data, error } = await supabase
      .from('challenge_subscribers')
      .insert({
        email: cleanEmail,
        referred_by: referredBy || null,
        source: source || 'landing_page',
      })
      .select('referral_code')
      .single()
    
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Already registered' }, { status: 409 })
      }
      throw error
    }
    
    // Send welcome email (fire and forget - don't block on this)
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
    
    fetch(`${baseUrl}/api/send-welcome`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: cleanEmail, 
        referralCode: data?.referral_code 
      }),
    }).catch(err => console.error('Welcome email failed:', err))
    
    // Update referrer's count if they were referred
    if (referredBy) {
      supabase
        .from('challenge_subscribers')
        .update({ referral_count: supabase.rpc('increment_referral') })
        .eq('referral_code', referredBy)
        .then(() => {})
        .catch(err => console.error('Referral update failed:', err))
    }
    
    return NextResponse.json({ success: true, referralCode: data?.referral_code })
  } catch (error: any) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
