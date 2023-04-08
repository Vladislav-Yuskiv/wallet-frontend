import { Fade } from '@mui/material';
import styles from './AuthFormWrapper.module.css';

import Logo from '../../Logo';

export default function AuthFormWrapper({ children }) {
  return (
    <div className={styles.blurBackgroundWrapper}>
      <Fade in={true} timeout={500} mountOnEnter unmountOnExit>
        <div className={styles.formWrapper}>
          <Logo />
          {children}
        </div>
      </Fade>
    </div>
  );
}
