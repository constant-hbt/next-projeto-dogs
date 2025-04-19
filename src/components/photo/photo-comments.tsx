'use client';

import React from 'react';
import styles from './photo-comments.module.css';
import { useUser } from '@/contexts/user-context';
import PhotoCommentForm from './photo-comment-form';
import { Comment } from '@/actions/photo-get';

type PhotoCommentsProps = {
  single: boolean;
  id: number;
  comments: Comment[];
};

const PhotoComments = (props: PhotoCommentsProps) => {
  const [comments, setComments] = React.useState<Comment[]>(
    () => props.comments,
  );
  const { user } = useUser();
  const commentsSection = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (commentsSection?.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <ul
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
        ref={commentsSection}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>
              {comment.comment_author}: <span>{comment.comment_content}</span>
            </b>
          </li>
        ))}
      </ul>
      {user && (
        <PhotoCommentForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PhotoComments;
