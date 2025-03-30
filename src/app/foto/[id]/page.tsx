type FotoIdPageParams = {
  params: Promise<{
    id: number;
  }>;
};

export default async function FotoIdPage({ params }: FotoIdPageParams) {
  const { id } = await params;

  return (
    <main>
      <h1>Foto id: {id}</h1>
    </main>
  );
}
