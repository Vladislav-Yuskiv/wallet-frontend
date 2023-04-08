import { useMediaQuery } from '@mui/material';

import AuthMedia from '../../components/Auth/AuthMedia';
import AuthPageWrapper from '../../components/Auth/AuthPageWrapper';
import LoginForm from '../../components/Auth/LoginForm';
import Footer from "../../components/Footer"

import styles from './LoginPage.module.css';

export default function LoginPage() {
  const matches = useMediaQuery('(min-width:768px)');

  return (
    <>
    <AuthPageWrapper>
      {matches && <AuthMedia className={styles.bgImage} />}
      <LoginForm />
    </AuthPageWrapper>
    <Footer />
    </>
  );
}
