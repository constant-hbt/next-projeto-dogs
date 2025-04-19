'use server';

import apiError from '@/functions/api-error';
import { tokenValidateUrl } from '@/functions/api-requests';
import { cookies } from 'next/headers';

export default async function validateToken() {
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) throw new Error('Acesso negado.');

    const response = await fetch(tokenValidateUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error('Erro ao validar token.');

    const data = await response.json();
    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
