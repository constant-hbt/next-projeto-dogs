'use server';

import apiError from '@/functions/api-error';
import { userPostUrl } from '@/functions/api-requests';
import { z } from 'zod';
import login from './login';

type State = {
  ok: boolean;
  error: string | null;
  data: null;
};

export default async function userPost(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const LoginSchema = z.object({
    username: z.string().min(1, 'Usuário obrigatório.'),
    email: z.string().email('E-mail inválido.'),
    password: z.string().min(6, 'A senha deve possuir no mínimo 6 caracteres.'),
  });

  try {
    const { success, error } = LoginSchema.safeParse({
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!success) throw new Error(error.issues[0].message);

    const response = await fetch(userPostUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Email ou usuário já cadastrado.');

    const responseData = await response.json();

    const { ok } = await login(
      { ok: true, error: '', data: responseData },
      formData,
    );

    if (!ok) throw new Error('Erro ao fazer login, tente novamente.');

    return {
      ok: true,
      error: null,
      data: null,
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
