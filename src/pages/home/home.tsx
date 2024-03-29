import styles from './home.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerConstructor from "../../components/burger-constructor/burger-constructor.tsx";
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients.tsx';


export function HomePage() {

    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </DndProvider>
    )
}
