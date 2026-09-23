'use client'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()
  return (
    <button className="btn btn-outline-secondary btn-sm"
      onClick={async () => {
        await supabase.auth.signOut()
        router.push('/')
      }}>Sign out</button>
  )
}