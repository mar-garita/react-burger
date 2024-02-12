import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Loader from '../ui/loader/loader.jsx';
import { pageIsLoading } from '../../services/selectors.js';
import { fetchIngredients } from '../../services/actions/ingredientsActions.js';


function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector(pageIsLoading);

    useEffect( () => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <>
            <AppHeader/>
            {isLoading ?
                <Loader /> :
                <DndProvider backend={HTML5Backend}>
                    <main className={styles.main}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </main>
                </DndProvider>
            }
        </>
    )
}

export default App;
