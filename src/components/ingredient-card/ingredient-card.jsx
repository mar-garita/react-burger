import styles from './ingredient-card.module.css';
import ModalIngredient from '../modal-ingredient/modal-ingredient.jsx';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useModal from '../../hooks/useModal.js';
import ingredientDataTypes from '../../propTypes/ingredientPropsTypes.js';


function IngredientCard({ ingredient }) {
    const [isOpen, onOpenModal, onCloseModal] = useModal(false);

    return (
        <div className={styles.card} onClick={onOpenModal}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={ingredient.image} alt={ingredient.name} />
            <div className={styles.wrapper}>
                <span className={styles.price}>{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.name}>{ingredient.name}</p>
            {isOpen &&
                <ModalIngredient
                    ingredient={ingredient}
                    isOpen={isOpen}
                    onClose={onCloseModal}
                />
            }
        </div>
    )
}

IngredientCard.propTypes = {
    ingredient: ingredientDataTypes.isRequired
}

export default IngredientCard;
