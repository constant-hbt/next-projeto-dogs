import photoGet from '@/actions/photo-get';
import PhotoContent from '@/components/photo/photo-content';
import { notFound } from 'next/navigation';

type FotoIdPageParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: FotoIdPageParams) {
  const { id } = await params;
  const { data } = await photoGet(id);

  if (!data) return { title: 'Fotos' };

  return {
    title: data.photo.title,
  };
}

export default async function FotoIdPage({ params }: FotoIdPageParams) {
  const { id } = await params;
  const { data } = await photoGet(id);

  if (!data) return notFound();

  return (
    <section className="container mainContainer">
      <PhotoContent data={data} single={true} />
    </section>
  );
}
