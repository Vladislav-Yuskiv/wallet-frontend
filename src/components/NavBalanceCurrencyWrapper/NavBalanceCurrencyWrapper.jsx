import s from './NavBalanceCurrencyWrapper.module.css';

export default function NavBalanceCurrencyWrapper(props) {
  return <div className={s.wrapper}>{props.children}</div>;
}
