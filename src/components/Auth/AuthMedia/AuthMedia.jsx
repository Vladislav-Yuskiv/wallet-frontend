import PropTypes from 'prop-types';

import { Fade } from '@mui/material';

import styles from './AuthMedia.module.css';

export default function AuthMedia({ className }) {
  return (
    <Fade in={true} timeout={500} mountOnEnter unmountOnExit>
      <div className={styles.authMediaWrapper}>
        <div className={`${styles.authMediaImage} ${className}`}></div>
        <div className={styles.textContainer}>
          <h2 className={styles.text}>Finance App</h2>
        </div>
      </div>
    </Fade>
  );
}

AuthMedia.propTypes = {
  className: PropTypes.string.isRequired
};
