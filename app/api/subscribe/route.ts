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
    
    const { data, error } = await supabase
      .from('challenge_subscribers')
      .insert({
        email: email.toLowerCase().trim(),
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
    
    return NextResponse.json({ success: true, referralCode: data?.referral_code })
  } catch (error: any) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
