import { useMediaQuery } from '@mui/material';

import AuthMedia from '../../components/Auth/AuthMedia';
import AuthPageWrapper from '../../components/Auth/AuthPageWrapper';
import RegisterForm from '../../components/Auth/RegisterForm';
import Footer from "../../components/Footer"

import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const matches = useMediaQuery('(min-width:768px)');

  return (
    <>
    <AuthPageWrapper>
      {matches && <AuthMedia className={styles.bgImage} />}
      <RegisterForm />
    </AuthPageWrapper>
    <Footer />
    </>
  );
}
