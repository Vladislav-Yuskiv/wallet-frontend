import propTypes from 'prop-types';
import styles from './Button.module.css';

export default function Button({
  type = 'submit',
  text,
  color = 'green',
  onClick,
  disabled
}) {
  return (
    <button type={type} className={`${styles[color]}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

Button.prototypes = {
  type: propTypes.string,
  text: propTypes.string,
  color: propTypes.oneOf(['green', 'white']),
  onClick: propTypes.func,
  disabled: propTypes.bool
};
