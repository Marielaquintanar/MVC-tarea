import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hcsmwpkdncukrdgnutjv.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjc213cGtkbmN1a3JkZ251dGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MDY4MzAsImV4cCI6MjA1NjE4MjgzMH0.ami2Jmhbql7Rdn1fZEh7aPh6EbCCNd6vMrqxUBF7GX8'; // Reemplázalo con tu clave anon

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
