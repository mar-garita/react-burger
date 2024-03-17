import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useModal from '../../../hooks/useModal.ts';
import { addIngredientDetails } from '../../../services/actions/ingredientDetailsActions.ts';
import { TIngredient } from '../../../types/types.ts';


interface IIngredientCard {
    ingredient: TIngredient;
    count: number;
}

function IngredientCard({ ingredient, count }: IIngredientCard) {
    const dispatch = useDispatch();
    const { onOpenModal }  = useModal();

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
        </>
    )
}

export default IngredientCard;
