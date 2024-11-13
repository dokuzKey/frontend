"use client";

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
    localStorage.setItem('token', data.token);
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
    localStorage.setItem('token', data.token);
  }

  return data;
}

export async function getToken() {
  return localStorage.getItem('token');
}
