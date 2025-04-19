import { Photo } from '@/actions/photos-get';
import Image from 'next/image';
import Link from 'next/link';
import styles from './feed.module.css';

type FeedPhotosProps = {
  photos: Photo[];
};

export default function FeedPhotos({ photos }: FeedPhotosProps) {
  if (!photos.length) return null;

  return (
    <ul className={`${styles.feed} animeLeft`}>
      {photos.map((photo, index) => (
        <li key={`${photo.id}-${index}`} className={styles.photo}>
          <Link
            href={`/foto/${photo.id}`}
            as={`/foto/${photo.id}`}
            scroll={false}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              width={1500}
              height={1500}
              sizes="80vw"
            />
            <span className={styles.visualizacao}>{photo.acessos}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
