var supabase;
try {
  supabase = window.supabase.createClient(
    'https://owavyvaparyftjxwcocr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YXZ5dmFwYXJ5ZnRqeHdjb2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MzQ3NTIsImV4cCI6MjA5MjIxMDc1Mn0._c2i5hFpBa03yggCJGOsEJvtnnCBZD-AxOOJWJrNnVg'
  );
} catch (e) {
  console.error('Supabase init failed:', e);
}
