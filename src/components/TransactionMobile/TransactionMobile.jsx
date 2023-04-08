import s from './TransactionMobile.module.css';
import TransactionMobileItem from '../TransactionMobileItem';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { transactionsSelectors } from '../../redux/transactions';

export default function TransactionMobile(props) {
  const allTransactions = useSelector(transactionsSelectors.getTransactions);
  const isLoading = useSelector(transactionsSelectors.getIsLoading);
  const toSort = [...allTransactions];
  const toRender = toSort.sort((a, b) =>
    a.date > b.date ? -1 : b.date > a.date ? 1 : 0
  );

  return isLoading ? (
    <Loader />
  ) : toRender.length < 1 ? (
    <p className={s.empty}>'No Transactions'</p>
  ) : (
    toRender.map((operation) => {
      return <TransactionMobileItem key={operation._id} data={operation} />;
    })
  );
}
