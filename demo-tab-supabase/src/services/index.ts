import { supabase } from "@/lib/supabase";

// REGISTRARSE
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data.user;
};

// INICIAR SESIÓN
export const signIn = async (email: string, password: string) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({ email, password });
  if (error) return null;
  return data;
};

// CERRAR SESIÓN
export const signOut = () => supabase.auth.signOut();