import s from './HomeTabWrapper.module.css';

export default function HomeTabWrapper(props) {
  return <div className={s.wrapper}>{props.children}</div>;
}
