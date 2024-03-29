'use client';

import { useRouter } from 'next/navigation';
import { logout } from './action';
import styles from './LogoutButton.module.scss';

export function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        className={styles.logoutButton}
        formAction={async () => {
          await logout();
          router.refresh();
        }}
      >
        logout
      </button>
    </form>
  );
}
