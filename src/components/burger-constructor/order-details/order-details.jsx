import styles from './order-details.module.css';
import { useSelector } from "react-redux";
import { getOrderNumber } from "../../../services/selectors.js";


function OrderDetails() {
    const orderNumber = useSelector(getOrderNumber);

    return (
        <div className={styles.details}>
            <p className={styles.number}>{orderNumber}</p>
            <p className={styles.number_text}>идентификатор заказа</p>
            <span className={styles.status_icon}/>
            <p className={styles.status_text}>Ваш заказ начали готовить</p>
            <p className={styles.wait_text}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;
