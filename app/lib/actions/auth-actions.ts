"use client"
import { createClient } from "@/utils/supabase/client";

export type authResponse = {
  success: boolean;
  message: string;
};

export async function login(
  email: string,
  password: string
): Promise<authResponse> {
  const supabase = createClient();

  // TODO: VALIDATE INPUTS
  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) return { success: false, message: error.message };
  return { success: true, message: "You are now successfully logged in!" };
}

export async function signup(
  displayName: string,
  email: string,
  password: string
): Promise<authResponse> {
  const supabase = createClient();

  // TODO: VALIDATE INPUTS
  const formDataNew = {
    email: email,
    password: password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  };

  const { error } = await supabase.auth.signUp(formDataNew);
  if (error) return { success: false, message: error.message };
  return { success: true, message: "You are now successfully registered!" };
}
