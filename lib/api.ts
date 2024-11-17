import axios from 'axios';

const API_URL = 'https://api.sifre.org.tr';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginResponse {
  status: number;
  message: string;
  token: string;
}

export interface RegisterResponse {
  status: number;
  token: string;
}

export interface PasswordData {
  id: string;
  siteAddress: string;
  username: string;
  password: string;
  createdAt: string;
}

export interface NoteData {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface ApiResponse {
  status: number;
  message: string;
}

export interface FetchPasswordsResponse {
  status: number;
  data: Record<string, PasswordData>;
}

export interface FetchNotesResponse {
  status: number;
  data: Record<string, NoteData>;
}

export const authApi = {
  login: (username: string, password: string) =>
    api.post<LoginResponse>('/auth/login', { username, password }),
  
  register: (email: string, username: string, password: string) =>
    api.post<RegisterResponse>('/auth/register', { email, username, password }),
};

export const passwordsApi = {
  fetch: (token: string) =>
    api.post<FetchPasswordsResponse>('/fetch/passwords', { token }),
  
  create: (token: string, data: { siteAddress: string; username: string; password: string }) =>
    api.post<ApiResponse>('/create/passwords', { token, ...data }),
};

export const notesApi = {
  fetch: (token: string) =>
    api.post<FetchNotesResponse>('/fetch/notes', { token }),
  
  create: (token: string, data: { title: string; body: string }) =>
    api.post<ApiResponse>('/create/notes', { token, ...data }),
};