'use client';

import React, { useActionState } from 'react';
import styles from './photo-comment-form.module.css';
import EnviarIcon from '@/icons/enviar-icon';
import ErrorMessage from '../helper/error-message';
import { Comment } from '@/actions/photo-get';
import commentPost from '@/actions/comment-post';

type PhotoCommentFormProps = {
  single: boolean;
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export default function PhotoCommentForm({
  single,
  id,
  setComments,
}: PhotoCommentFormProps) {
  const [comment, setComment] = React.useState('');
  const [state, action, isPending] = useActionState(commentPost, {
    ok: false,
    data: null,
    error: '',
  });

  React.useEffect(() => {
    if (state.ok && state.data) {
      setComments((comments) => [...comments, state.data]);
      setComment('');
    }
  }, [state, setComments]);

  return (
    <form
      action={action}
      className={`${styles.form} ${styles.single ? styles.single : ''}`}
    >
      <input type="hidden" name="id" id="id" value={id} readOnly />
      <textarea
        name="comment"
        id="comment"
        placeholder="Comente..."
        className={styles.textarea}
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <button type="submit" disabled={isPending} className={styles.button}>
        <EnviarIcon />
      </button>
      <ErrorMessage error={state.error} />
    </form>
  );
}
