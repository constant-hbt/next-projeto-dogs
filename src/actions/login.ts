'use server';

import apiError from '@/functions/api-error';
import { tokenPostUrl } from '@/functions/api-requests';
import { cookies } from 'next/headers';
import { z } from 'zod';

export default async function login(state: {}, formData: FormData) {
  const LoginSchema = z.object({
    username: z.string().min(1, 'Usuário obrigatório.'),
    password: z.string().min(1, 'Senha obrigatória.'),
  });

  try {
    const { success, data, error } = LoginSchema.safeParse({
      username: formData.get('username'),
      password: formData.get('password'),
    });

    if (!success) throw new Error('Preencha todos os campos corretamente.');

    const response = await fetch(tokenPostUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok)
      throw new Error('Senha ou usuário incorretos, tente novamente.');

    const responseData = await response.json();
    (await cookies()).set('token', responseData.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });

    return {
      ok: true,
      error: null,
      data: null,
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
