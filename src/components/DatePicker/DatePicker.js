import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import styles from "./DataPicker.module.css";

export default function DatePicker({ date, updateDate }) {
    return (
        <Datetime
            className={styles.input}
            dateFormat="DD.MM.YYYY"
            timeFormat={false}
            value={date}
            onChange={(moment) => {
                updateDate({
                    type: "change",
                    target: { name: "date", value: moment._d },
                });
            }}
        />
    );
}
