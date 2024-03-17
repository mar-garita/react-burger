import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../../services/selectors.ts';
import { TIngredient } from '../../../types/types.ts';


function IngredientDetails() {
    const { id } = useParams();
    const ingredients = useSelector(getIngredients);

    const ingredient = ingredients.find((ingredient: TIngredient) => ingredient._id === id);

    return (
        <div className={styles.details}>
            <img className={styles.image} src={ingredient ? ingredient.image : null} alt={ingredient ? ingredient.name : null} />
            <p className={styles.name}>{ingredient ? ingredient.name : null}</p>
            <div className={styles.info}>
                <div className={styles.nutrition}>
                    <p className={styles.element}>Калории, ккал</p>
                    <span className={styles.count}>{ingredient ? ingredient.calories : null}</span>
                </div>
                <div className={styles.nutrition}>
                    <p className={styles.element}>Белки, г</p>
                    <span className={styles.count}>{ingredient ? ingredient.proteins : null}</span>
                </div>
                <div className={styles.nutrition}>
                    <p className={styles.element}>Жиры, г</p>
                    <span className={styles.count}>{ingredient ? ingredient.fat : null}</span>
                </div>
                <div className={styles.nutrition}>
                    <p className={styles.element}>Углеводы, г</p>
                    <span className={styles.count}>{ingredient ? ingredient.carbohydrates : null}</span>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails;
