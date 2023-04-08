import styles from './AuthPageWrapper.module.css';

export default function AuthPageWrapper({ children }) {
  return <section className={styles.authPageSection}>{children}</section>;
}
