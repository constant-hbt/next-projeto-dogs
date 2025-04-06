'use server';

import apiError from '@/functions/api-error';
import { passwordLostUrl } from '@/functions/api-requests';
import { z } from 'zod';

type State = {
  ok: boolean;
  error: string | null;
  data: null;
};

export default async function passwordLost(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const LoginSchema = z.object({
    login: z.string().min(1, 'Login ou e-mail obrigatório.'),
    url: z.string().min(1, 'URL obrigatória.'),
  });

  try {
    const { success, data } = LoginSchema.safeParse({
      login: formData.get('login'),
      url: formData.get('url'),
    });

    if (!success) throw new Error('Login ou e-mail obrigatório.');

    const response = await fetch(passwordLostUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: data.login,
        url: data.url,
      }),
    });

    if (!response.ok) throw new Error('Email ou usuário não cadastrado.');

    return {
      ok: true,
      error: null,
      data: null,
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
