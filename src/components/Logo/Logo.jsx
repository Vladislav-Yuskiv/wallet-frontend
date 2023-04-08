import { Link } from 'react-router-dom';

import logoImg from '../../images/logo.svg';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <Link className={styles.link} to="/">
      <div className={styles.logoWrapper}>
        <img
          className={styles.logoImg}
          src={logoImg}
          alt="logo"
          width="40"
          height="40"
        />

        <h1 className={styles.logoText}>Wallet</h1>
      </div>
    </Link>
  );
}
