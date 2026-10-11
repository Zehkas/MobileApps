import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'; // necesario en RN

const supabaseUrl = 'https://ujxqfhnhurzacefwjzgg.supabase.co';
const supabaseAnonKey = 'sb_publishable_DZdx74kbCkYnjoNQXz2Vxw_c8Zqgj-H';


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,      // persiste la sesión en el dispositivo
    autoRefreshToken: true,     // renueva el token solo
    persistSession: true,       // recuerda al usuario al reabrir
    detectSessionInUrl: false,  // false en apps móviles
  },
});