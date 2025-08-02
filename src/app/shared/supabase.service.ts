import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { environment } from '@/environments/environment'; // For production settings

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      'https://ydfujqyyedtussfgydfi.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZnVqcXl5ZWR0dXNzZmd5ZGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNzQzNzIsImV4cCI6MjA2NDY1MDM3Mn0.m6IxWw-pU1WmKTmp6jqk5m8UjNU2LvVI8bvd_Eezcmg'
      // environment.supabaseUrl,
      // environment.supabaseKey
    );
  }



}