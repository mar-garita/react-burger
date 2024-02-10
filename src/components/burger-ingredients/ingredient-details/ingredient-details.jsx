import styles from './ingredient-details.module.css';
import { useSelector } from "react-redux";
import { getIngredientDetails } from '../../../services/selectors.js';


function IngredientDetails() {
    const ingredient = useSelector(getIngredientDetails);

    return (
        <div className={styles.details}>
            <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
            <p className={styles.name}>{ingredient.name}</p>
            <div className={styles.info}>
                <div className={styles.nutrition}>
                    <p className={styles.element}>Калории, ккал</p>
                    <span className={styles.count}>{ingredient.calories}</span>
                </div>
                <div className={styles.nutrition}>
                    <p className={styles.element}>Белки, г</p>
                    <span className={styles.count}>{ingredient.proteins}</span>
                </div>
                <div className={styles.nutrition}>
                    <p className={styles.element}>Жиры, г</p>
                    <span className={styles.count}>{ingredient.fat}</span>
                </div>
                <div className={styles.nutrition}>
                    <p className={styles.element}>Углеводы, г</p>
                    <span className={styles.count}>{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails;
