'use client';

import photosGet, { Photo } from '@/actions/photos-get';
import FeedPhotos from './feed-photos';
import React from 'react';
import Loading from '../helper/loading';
import styles from './feed.module.css';

type FeedProps = {
  photos: Photo[];
  user?: 0 | string;
};

export default function Feed({ photos, user = 0 }: FeedProps) {
  const itemsPerPage = 6;
  const [photosFeed, setPhotosFeed] = React.useState<Photo[]>(photos);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [infinite, setInfinite] = React.useState(photos.length >= itemsPerPage);

  const fetching = React.useRef(false);

  function infiniteScroll() {
    console.log('Aconteceu');

    if (fetching.current) return;

    fetching.current = true;
    setLoading(true);

    setTimeout(() => {
      setPage((currentPage) => currentPage + 1);
      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  React.useEffect(() => {
    async function getPagePhotos(page: number) {
      if (page === 1) return;

      const actionData = await photosGet(
        {
          page,
          total: itemsPerPage,
          user,
        },
        { cache: 'no-store' },
      );

      if (actionData?.data) {
        setPhotosFeed((currentPhotos) => [
          ...currentPhotos,
          ...actionData.data,
        ]);

        if (actionData.data.length < itemsPerPage) setInfinite(false);
      }
    }

    getPagePhotos(page);
  }, [page]);

  React.useEffect(() => {
    if (infinite) {
      window.addEventListener('scroll', infiniteScroll);
      window.addEventListener('wheel', infiniteScroll);
    } else {
      window.removeEventListener('scroll', infiniteScroll);
      window.removeEventListener('wheel', infiniteScroll);
    }

    return () => {
      window.removeEventListener('scroll', infiniteScroll);
      window.removeEventListener('wheel', infiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      <FeedPhotos photos={photosFeed} />
      <div className={styles.loadingWrapper}>
        {infinite ? loading && <Loading /> : <p>Não existem mais postagens</p>}
      </div>
    </div>
  );
}
