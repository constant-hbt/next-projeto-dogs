'use client';

import { useFormStatus } from 'react-dom';
import Button from '@/components/forms/button';
import React from 'react';
import Input from '@/components/forms/input';
import ErrorMessage from '../helper/error-message';
import styles from './login-form.module.css';
import userPost from '@/actions/user-post';

// Essa função sempre deve estar do lado de fora do componente
function FormButton() {
  const { pending } = useFormStatus();

  return pending ? (
    <Button disabled={true}>Cadastrando...</Button>
  ) : (
    <Button>Cadastrar</Button>
  );
}

export default function LoginCriarForm() {
  const [state, action] = React.useActionState(userPost, {
    ok: false,
    error: '',
    data: null,
  });

  React.useEffect(() => {
    if (state.ok) window.location.href = '/conta';
  }, [state.ok]);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Usuário" name="username" />
        <Input label="Email" name="email" type="email" />
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
    </>
  );
}
