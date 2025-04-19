'use server';

import apiError from '@/functions/api-error';
import { photoDeleteUrl } from '@/functions/api-requests';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type State = {
  ok: boolean;
  error: string | null;
  data: null;
};

export default async function photoDelete(id: string): Promise<State> {
  const token = (await cookies()).get('token')?.value;

  try {
    if (!token) throw new Error('Token inválido.');

    const response = await fetch(photoDeleteUrl(id), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Erro ao deletar foto.');
  } catch (error: unknown) {
    return apiError(error);
  }

  revalidateTag('photos');
  redirect('/conta');
}
