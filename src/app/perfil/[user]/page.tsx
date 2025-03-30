type PerfilUserPageParams = {
  params: Promise<{
    user: number;
  }>;
};

export default async function PerfilUserPage({ params }: PerfilUserPageParams) {
  const { user } = await params;

  return (
    <main>
      <h1>Usuário {user}</h1>
    </main>
  );
}
