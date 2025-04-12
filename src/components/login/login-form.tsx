'use client';

import login from '@/actions/login';
import { useFormStatus } from 'react-dom';
import Button from '@/components/forms/button';
import React from 'react';
import Input from '@/components/forms/input';
import ErrorMessage from '../helper/error-message';
import Link from 'next/link';
import styles from './login-form.module.css';
import { useUser } from '@/contexts/user-context';

// Essa função sempre deve estar do lado de fora do componente
function FormButton() {
  const { pending } = useFormStatus();

  return pending ? (
    <Button disabled={true}>Enviando...</Button>
  ) : (
    <Button>Entrar</Button>
  );
}

export default function LoginForm() {
  const [state, action] = React.useActionState(login, {
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
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
        <Link href="/login/perdeu" className={styles.perdewu}>
          Perdeu a senha?
        </Link>
        <div className={styles.cadastro}>
          <h2 className={styles.subtitle}>
            Cadastre-se <p>Ainda não possui conta? Cadastre-se no site.</p>
            <Link href="/login/criar" className="button">
              Cadastro
            </Link>
          </h2>
        </div>
      </form>
    </>
  );
}
