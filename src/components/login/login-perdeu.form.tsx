'use client';

import Button from '@/components/forms/button';
import React from 'react';
import Input from '@/components/forms/input';
import ErrorMessage from '../helper/error-message';
import styles from './login-form.module.css';
import passwordLost from '@/actions/password-lost';

//export const dynamic = 'force-dynamic';

export default function LoginPerdeuForm() {
  const [url, setUrl] = React.useState('');

  const [state, action, isPending] = React.useActionState(passwordLost, {
    ok: false,
    error: '',
    data: null,
  });

  React.useEffect(() => {
    setUrl(`${window.location.origin}/login/resetar`);
  }, []);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Email / Usuário" name="login" />
        <input type="hidden" name="url" readOnly value={url} />
        <ErrorMessage error={state.error} />
        {state.ok ? (
          <p style={{ color: '#4c1' }}>Email enviado com sucesso.</p>
        ) : (
          <Button disabled={isPending}>
            {isPending ? 'Enviando...' : 'Enviar Email'}
          </Button>
        )}
      </form>
    </>
  );
}
