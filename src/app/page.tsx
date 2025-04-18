import photosGet from '@/actions/photos-get';
import Feed from '@/components/feed/feed';

export default async function Home() {
  const { ok, data } = await photosGet();

  if (!ok) return null;

  return (
    <section className="container mainContainer">
      <Feed photos={data} />
    </section>
  );
}
