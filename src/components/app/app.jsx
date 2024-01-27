import styles from './app.module.css';
import { useEffect, useState } from "react";
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { getIngredients } from '../../utils/api';


function App() {
    const [dataIngredients, setDataIngredients] = useState([]);

    useEffect( () => {
        const fetchDataIngredients = async () => {
            try {
                const result = await getIngredients();
                setDataIngredients(result.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchDataIngredients();
    }, [])

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients ingredients={dataIngredients}/>
                <BurgerConstructor ingredients={dataIngredients} />
            </main>
        </>
    )
}

export default App;
