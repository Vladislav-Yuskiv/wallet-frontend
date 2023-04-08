import styles from './ButtonAdd.module.css';

export default function ButtonAdd({ onClick }) {
    return (
        <button
            type="submit"
            className={styles.button}
            onClick={onClick}>
            Add
        </ button>
    )
}
