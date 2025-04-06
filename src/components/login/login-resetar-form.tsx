'use client';

import React from 'react';
import Button from '../forms/button';
import Input from '../forms/input';
import ErrorMessage from '../helper/error-message';
import styles from './login-form.module.css';
import passwordReset from '@/actions/password-reset';

type Props = {
  keyToken: string;
  login: string;
};

export default function LoginResetarForm({ keyToken, login }: Props) {
  const [state, action, isPending] = React.useActionState(passwordReset, {
    ok: false,
    error: '',
    data: null,
  });

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Nova Senha" name="password" type="password" />
        <input type="hidden" name="login" readOnly value={login} />
        <input type="hidden" name="key" readOnly value={keyToken} />
        <ErrorMessage error={state.error} />
        <Button disabled={isPending}>
          {isPending ? 'Resetando...' : 'Resetar senha'}
        </Button>
      </form>
    </>
  );
}
