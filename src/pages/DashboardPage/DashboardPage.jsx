import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import showModal from '../../redux/modal/modalActions';

import SplitLineDesktop from '../../components/SplitLineDesktop';
import HomeTabWrapper from '../../components/HomeTabWrapper';
import Modal from '../../components/Modal';
import Form from '../../components/FormAddTransaction';


import Container from '../../components/Container';
import HomeTab from '../../components/HomeTab';
import ButtonAdd from '../../components/ButtonAdd';
import { transactionsOperations } from '../../redux/transactions';
// import { userOperations } from '../../redux/user';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modal);
  
  useEffect(
    () => dispatch(transactionsOperations.getTransactions()),
    [dispatch]
  );
  const match = useLocation();

  return (
    <div>
      <Header />
      <Container>
        <HomeTabWrapper>
          <HomeTab />
          <SplitLineDesktop />
          <Outlet />
        </HomeTabWrapper>
      </Container>
      {match.pathname === '/home' ? <ButtonAdd onClick={(event) => dispatch(showModal())}></ButtonAdd> : null}
      <Footer />
      {isModalOpen && (
        <Modal>
          <Form />
        </Modal>
      )}
    </div>
  );
}
