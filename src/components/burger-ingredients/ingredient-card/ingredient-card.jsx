import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useModal from '../../../hooks/useModal.js';
import ModalIngredient from '../modal-ingredient/modal-ingredient.jsx';
import ingredientDataTypes from '../../../propTypes/ingredientPropsTypes.js';
import { addIngredientDetails } from '../../../services/actions/ingredientDetailsActions.js';


function IngredientCard({ ingredient, count }) {
    const dispatch = useDispatch();
    const [isOpen, onOpenModal, onCloseModal] = useModal(false);

    const [, dragRef] = useDrag({
        type: "ingredient",  // тип перетаскиваемого элемента
        item: ingredient,
    });

    const handleCardClick = () => {
        dispatch(addIngredientDetails(ingredient));
        onOpenModal();
    }

    return (
        <>
            <div ref={dragRef} className={styles.card} onClick={handleCardClick}>
                {count ? <Counter count={count} size="default" /> : null}
                <img src={ingredient.image} alt={ingredient.name} />
                <div className={styles.wrapper}>
                    <span className={styles.price}>{ingredient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={styles.name}>{ingredient.name}</p>
            </div>
            {isOpen &&
                <ModalIngredient
                    isOpen={isOpen}
                    onClose={onCloseModal}
                />
            }
        </>
    )
}

IngredientCard.propTypes = {
    ingredient: ingredientDataTypes.isRequired,
    count: PropTypes.number.isRequired,
}

export default IngredientCard;
