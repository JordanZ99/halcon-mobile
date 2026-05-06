'use server'

import { cookies } from 'next/headers';

export async function loginAction(email: string, pass: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password: pass })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      const cookieStore = await cookies();
      cookieStore.set('halcon_token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      return { success: true, user: data.user };
    }
    return { success: false, message: data.message || "Error al iniciar sesión" };
  } catch (error: any) {
    console.error("Login Action Error:", error);
    return { success: false, message: "Error de conexión: " + (error.message || String(error)) };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('halcon_token');
}
