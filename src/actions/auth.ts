"use server";

import { createClient } from "@/utils/server";

export async function loginAction(email: string, password: string) {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({ email, password });
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  } catch (e) {
    console.log(e);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function signupAction(email: string, password: string) {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signUp({ email, password });
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  } catch {
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

export const SignOutAction = async () => {
  const { auth } = await createClient();
  const { error } = await auth.signOut();
  if (error) {
    return { error: error.message };
  }
  return { error: null };
};
