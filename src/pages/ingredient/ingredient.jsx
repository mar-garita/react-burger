import styles from './ingredient.module.css';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details.jsx';


export function IngredientPage() {
    return (
        <div className={styles.wrapper}>
            <IngredientDetails />
        </div>
    )
}
