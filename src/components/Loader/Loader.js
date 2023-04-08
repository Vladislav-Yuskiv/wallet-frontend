import { TailSpin } from 'react-loader-spinner';
import css from "./Loader.module.css";

export default function Loader() {
    return (
        <div className={css.wrap}>
            <TailSpin color="#4A56E2" height={80} width={80} />
        </div>
    );
}