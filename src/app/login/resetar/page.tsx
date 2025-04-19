import LoginResetarForm from '@/components/login/login-resetar-form';
import { Metadata } from 'next';

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ key: string; login: string }>;

export const metadata: Metadata = {
  title: 'Resetar a senha | Dogs',
  description: 'Resete a sua senha',
};

export default async function ResetarPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="animeLeft">
      <h1 className="title">Resete a senha</h1>
      <LoginResetarForm
        keyToken={searchParams.key}
        login={searchParams.login}
      />
    </div>
  );
}
