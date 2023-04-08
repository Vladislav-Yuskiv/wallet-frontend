import s from './DashboardItem.module.css';

export default function DashboardItem({ row }) {
  const dateToFormat = new Date(row.date);
  const splitedDate = dateToFormat.toLocaleDateString().split('.');
  const cuttedYear = splitedDate[2].substr(-2);
  const formatedDate = splitedDate[0] + '.' + splitedDate[1] + '.' + cuttedYear;
  const formatedSum = row.sum / 100;
  const formatedBalance = row.balance / 100;
  return (
    <li className={s.transactionRowWrapper}>
      <ul className={s.transactionRow}>
        <li className={s.transactionCellDate}>{formatedDate}</li>
        <li className={s.transactionCellType}>{row.type ? '+' : '-'}</li>
        <li className={s.transactionCellCategory}>{row.category}</li>
        <li className={s.transactionCellComment}>{row.comment}</li>
        <li
          className={s.transactionCellSum}
          style={row.type ? { color: 'green' } : { color: 'red' }}
        >
          {formatedSum.toFixed(2).toLocaleString().replace(/,/i, '.')}
        </li>
        <li className={s.transactionCellBalance}>
          {formatedBalance.toFixed(2).toLocaleString().replace(/,/i, '.')}
        </li>
      </ul>
    </li>
  );
}
