import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { count } = await supabase
      .from('challenge_subscribers')
      .select('*', { count: 'exact', head: true })
    
    return NextResponse.json({ count: (count || 0) + 500 })
  } catch (error) {
    return NextResponse.json({ count: 523 })
  }
}
