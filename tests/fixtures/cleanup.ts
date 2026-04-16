import { createClient } from '@supabase/supabase-js'

export async function cleanupTestPets() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data: { users } } = await supabase.auth.admin.listUsers()
  const testUser = users.find(u => u.email === process.env.TEST_USER_EMAIL)
  if (!testUser) return
  await supabase.from('pets').delete().eq('owner_id', testUser.id)
}
