import styles from './card-ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function CardIngredient({ card }) {
    return (
        <div className={styles.card}>
            <span className={styles.counter}>1</span>
            <img src={card.image} alt={card.name} />
            <div className={styles.wrapper}>
                <span className={styles.price}>{card.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.name}>{card.name}</p>
        </div>
    )
}

export default CardIngredient;
