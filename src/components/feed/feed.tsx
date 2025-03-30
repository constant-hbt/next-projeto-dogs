import { Photo } from '@/actions/photos-get';
import FeedPhotos from './feed-photos';

type FeedProps = {
  photos: Photo[];
};

export default function Feed({ photos }: FeedProps) {
  return (
    <div>
      <FeedPhotos photos={photos} />
    </div>
  );
}
