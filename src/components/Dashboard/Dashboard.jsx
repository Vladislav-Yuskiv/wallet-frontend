import s from './Dashboard.module.css';
import { useSelector } from 'react-redux';
import { transactionsSelectors } from '../../redux/transactions';
import Chart from './../Chart';
import Loader from '../Loader/Loader';

import DashboardItem from '../DashboardItem';

export default function Dashboard({ chart, ...props }) {
  const isLoading = useSelector(transactionsSelectors.getIsLoading);

  const allTransactions = useSelector(transactionsSelectors.getTransactions);
  const toSort = [...allTransactions];
  const toRender = toSort.sort((a, b) =>
    a.date > b.date ? -1 : b.date > a.date ? 1 : 0
  );

  return (
    <>
      {!chart && (
        <div className={s.wrapper}>
          <ul className={s.table}>
            <li>
              <ul className={s.tableHeader}>
                <li className={s.tableHeaderItemDate}>Date</li>
                <li className={s.tableHeaderItemType}>Type</li>
                <li className={s.tableHeaderItemCategory}>Category</li>
                <li className={s.tableHeaderItemComment}>Comment</li>
                <li className={s.tableHeaderItemAmount}>Amount</li>
                <li className={s.tableHeaderItemBalance}>Balance</li>
              </ul>
            </li>

            <li className={s.tableitems}>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {toRender.length < 1 ? (
                    'The list is empty'
                  ) : (
                    <ul className={s.transactionsList}>
                      {toRender.map((row) => {
                        return <DashboardItem key={row._id} row={row} />;
                      })}
                    </ul>
                  )}
                </>
              )}
            </li>
          </ul>
        </div>
      )}
      {chart && <Chart />}
    </>
  );
}
