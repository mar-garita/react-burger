import styles from './order-details.module.css';


function OrderDetails() {

    return (
        <div className={styles.details}>
            <p className={styles.number}>034536</p>
            <p className={styles.number_text}>идентификатор заказа</p>
            <span className={styles.status_icon} />
            <p className={styles.status_text}>Ваш заказ начали готовить</p>
            <p className={styles.wait_text}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;
