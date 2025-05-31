
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  try {
    const { userId } = await req.json()
    console.log('Delete user request for user ID:', userId)
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // First, check the user's role to ensure we're not deleting admin users
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from('roles')
      .select('role')
      .eq('user_id', userId)
      .single()
    
    if (roleError) {
      console.error('Error checking user role:', roleError)
      return new Response(
        JSON.stringify({ error: 'Failed to verify user role' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    // Prevent deletion of admin users
    if (roleData?.role === 'admin') {
      console.log('Attempted to delete admin user, blocking request')
      return new Response(
        JSON.stringify({ error: 'Cannot delete admin users' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    // Delete the user's role first
    const { error: roleDeleteError } = await supabaseAdmin
      .from('roles')
      .delete()
      .eq('user_id', userId)
    
    if (roleDeleteError) {
      console.error('Error deleting user role:', roleDeleteError)
      return new Response(
        JSON.stringify({ error: 'Failed to delete user role' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    // Delete any contact views by this user
    const { error: contactViewsError } = await supabaseAdmin
      .from('contact_views')
      .delete()
      .eq('viewer_id', userId)
    
    if (contactViewsError) {
      console.error('Error deleting contact views:', contactViewsError)
      // Don't fail the whole operation for this
    }
    
    // Delete the user from auth.users (this will cascade to other tables)
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      userId
    )
    
    if (deleteError) {
      console.error('Error deleting user from auth:', deleteError)
      return new Response(
        JSON.stringify({ error: deleteError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    console.log('User deleted successfully:', userId)
    return new Response(
      JSON.stringify({ success: true, userId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
