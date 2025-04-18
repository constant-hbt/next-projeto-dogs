'use server';

import apiError from '@/functions/api-error';
import { photoPostUrl } from '@/functions/api-requests';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type State = {
  ok: boolean;
  error: string | null;
  data: null;
};

export default async function photoPost(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const token = (await cookies()).get('token')?.value;

  const PhotoSchema = z.object({
    nome: z.string(),
    peso: z.coerce.number().positive(),
    idade: z.coerce.number().positive(),
    img: z.instanceof(File),
    token: z.string().min(3),
  });

  try {
    const { success, error } = PhotoSchema.safeParse({
      nome: formData.get('nome'),
      peso: formData.get('peso'),
      idade: formData.get('idade'),
      img: formData.get('img'),
      token: token,
    });

    console.log(error);

    if (!success) throw new Error(error.issues[0].path?.[0]?.toString());

    const response = await fetch(photoPostUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) throw new Error('Erro ao criar nova postagem.');
  } catch (error: unknown) {
    return apiError(error);
  }

  revalidateTag('photos');
  redirect('/conta');
}
