import statsGet from '@/actions/stats-get';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Lazy loading do next
const ContaEstatisticas = dynamic(
  () => import('@/components/conta/conta-estatisticas'),
  {
    loading: () => <p>Carregando...</p>,
  },
);

export const metadata: Metadata = {
  title: 'Estatísticas | Minha Conta',
};

export default async function EstatisticasPage() {
  const { data } = await statsGet();

  if (!data) return null;

  return (
    <section>
      <ContaEstatisticas data={data} />
    </section>
  );
}
