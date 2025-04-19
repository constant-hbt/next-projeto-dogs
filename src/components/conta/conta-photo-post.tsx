'use client';

import { useFormStatus } from 'react-dom';
import Button from '@/components/forms/button';
import React from 'react';
import Input from '@/components/forms/input';
import ErrorMessage from '../helper/error-message';
import styles from './conta-photo-post.module.css';
import photoPost from '@/actions/photo-post';

// Essa função sempre deve estar do lado de fora do componente
function FormButton() {
  const { pending } = useFormStatus();

  return pending ? (
    <Button disabled={true}>Enviando...</Button>
  ) : (
    <Button>Enviar</Button>
  );
}

export default function ContaPhotoPost() {
  const [state, action] = React.useActionState(photoPost, {
    ok: false,
    error: '',
    data: null,
  });

  const [img, setImg] = React.useState('');

  function handleImgChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  }

  return (
    <section className={`animeLeft ${styles.photoPost}`}>
      <form action={action} className={styles.form}>
        <Input label="Nome" name="nome" />
        <Input label="Peso" name="peso" type="number" />
        <Input label="Idade" name="idade" type="number" />
        <input
          type="file"
          name="img"
          id="img"
          className={styles.file}
          onChange={handleImgChange}
        />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <div>
        {img && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img}')` }}
          ></div>
        )}
      </div>
    </section>
  );
}
