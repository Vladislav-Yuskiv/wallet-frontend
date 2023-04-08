import s from './NavBalanceWrapper.module.css';

export default function NavBalanceWrapper(props) {
  return <div className={s.wrapper}>{props.children}</div>;
}
