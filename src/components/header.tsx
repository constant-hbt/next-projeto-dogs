import Link from 'next/link';
import styles from './header.module.css';
import Image from 'next/image';

export default async function Header() {
  const user = false; // Temporário

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link href={'/'} className={styles.logo}>
          <Image
            src={'/assets/dogs.svg'}
            alt="Dogs"
            width={28}
            height={22}
            priority
          />
        </Link>
        {user ? (
          <Link href={'/conta'} className={styles.login}>
            Dogs
          </Link>
        ) : (
          <Link href={'/login'} className={styles.login}>
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
}
