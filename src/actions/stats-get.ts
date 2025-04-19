'use server';

import apiError from '@/functions/api-error';
import { statsGetUrl } from '@/functions/api-requests';
import { cookies } from 'next/headers';

export type StatsData = {
  id: number;
  title: string;
  acessos: string;
};

export default async function statsGet() {
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) throw new Error('Acesso negado.');

    const url = statsGetUrl;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error('Erro ao obter os dados.');

    const data = (await response.json()) as StatsData[];
    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
