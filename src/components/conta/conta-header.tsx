'use client';

import React from 'react';
import styles from '@/components/conta/conta-header.module.css';
import { usePathname } from 'next/navigation';
import useMedia from '@/hooks/use-media';
import EstatisticaIcon from '@/icons/estatistica-icon';
import SairIcon from '@/icons/sair-icon';
import FeedIcon from '@/icons/feed-icon';
import AdicionarIcon from '@/icons/adicionar-icon';
import Link from 'next/link';
import logout from '@/actions/logout';
import { useUser } from '../../contexts/user-context';

function getTitle(pathname: string) {
  switch (pathname) {
    case '/conta/postar':
      return 'Poste Sua Foto';
    case '/conta/estatisticas':
      return 'Estatísticas';
    default:
      return 'Minha Conta';
  }
}

function setActiveButtonClassName(pathname: string, linkPathname: string) {
  return pathname === linkPathname ? 'active' : '';
}

export default function ContaHeader() {
  const { setUser } = useUser();
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  async function handleLogout() {
    setUser(null);
    await logout();
  }

  return (
    <header className={styles.header}>
      <h1 className="title">{getTitle(pathname)}</h1>
      {mobile && (
        <button
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <Link
          href="/conta"
          className={setActiveButtonClassName(pathname, '/conta')}
        >
          <FeedIcon /> {mobile && 'Minhas Fotos'}
        </Link>
        <Link
          href="/conta/estatisticas"
          className={setActiveButtonClassName(pathname, '/conta/estatisticas')}
        >
          <EstatisticaIcon />
          {mobile && 'Estatísticas'}
        </Link>
        <Link
          href="/conta/postar"
          className={setActiveButtonClassName(pathname, '/conta/postar')}
        >
          <AdicionarIcon />
          {mobile && 'Adicionar Foto'}
        </Link>
        <button onClick={handleLogout}>
          <SairIcon />
          {mobile && 'Sair'}
        </button>
      </nav>
    </header>
  );
}
