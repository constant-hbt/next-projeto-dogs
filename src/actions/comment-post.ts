'use server';

import apiError from '@/functions/api-error';
import { commentPostUrl } from '@/functions/api-requests';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { Comment } from './photo-get';

export default async function commentPost(prevState: {}, formData: FormData) {
  const token = (await cookies()).get('token')?.value;

  try {
    const { success, data, error } = z
      .object({
        id: z.coerce.number().positive(),
        comment: z.string(),
        token: z.string().min(3),
      })
      .safeParse({
        id: formData.get('id'),
        comment: formData.get('comment'),
        token: token,
      });

    console.log(error);

    if (!success) throw new Error(error.issues[0].path?.[0]?.toString());

    const response = await fetch(commentPostUrl(data.id), {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) throw new Error('Erro ao comentar.');

    const responseData = (await response.json()) as Comment;
    revalidateTag('comment');
    return { data: responseData, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
