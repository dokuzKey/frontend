"use client";

import { cookies } from 'next/headers';

export async function login(username: string, password: string) {
  const response = await fetch('https://api.sifre.org.tr/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  
  if (data.status === 1) {
    cookies().set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
  }

  return data;
}

export async function register(email: string, username: string, password: string) {
  const response = await fetch('https://api.sifre.org.tr/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  });

  const data = await response.json();

  if (data.status === 1) {
    cookies().set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
  }

  return data;
}

export async function getToken() {
  const cookieStore = cookies();
  return cookieStore.get('token')?.value;
}