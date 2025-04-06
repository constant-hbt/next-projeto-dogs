'use server';

import apiError from '@/functions/api-error';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { tokenPostUrl } from '@/functions/api-requests';

type State = {
  ok: boolean;
  error: string | null;
  data: null;
};

export default async function login(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const LoginSchema = z.object({
    username: z.string().min(1, 'Usuário obrigatório.'),
    password: z.string().min(3, 'A senha deve possuir no mínimo 3 caracteres.'),
  });

  try {
    const { success } = LoginSchema.safeParse({
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
