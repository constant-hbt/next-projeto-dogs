'use server';

import apiError from '@/functions/api-error';
import { passwordResetUrl } from '@/functions/api-requests';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type State = {
  ok: boolean;
  error: string | null;
  data: null;
};

export default async function passwordReset(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const LoginSchema = z.object({
    login: z.string().min(1, 'Login obrigatório.'),
    password: z.string().min(6, 'A senha deve possuir no mínimo 6 caracteres.'),
    key: z.string().min(1, 'Key obrigatória.'),
  });

  try {
    const { success, data, error } = LoginSchema.safeParse({
      login: formData.get('login'),
      password: formData.get('password'),
      key: formData.get('key'),
    });

    if (!success) throw new Error(error.issues[0].message);

    const response = await fetch(passwordResetUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Não autorizado.');
  } catch (error: unknown) {
    return apiError(error);
  }

  redirect('/login');
}
