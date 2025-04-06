'use server';

import { cookies } from 'next/headers';
import { userGetUrl } from '@/functions/api-requests';
import apiError from '@/functions/api-error';

export type User = {
  id: number;
  email: string;
  username: string;
  nome: string;
};

export default async function userGet() {
  const token = (await cookies()).get('token')?.value;

  try {
    if (!token) throw new Error('Token não encontrado.');

    const response = await fetch(userGetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error('Erro ao obter o usuário.');

    const data = (await response.json()) as User;

    return { data, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
