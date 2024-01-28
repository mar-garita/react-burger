import styles from './burger-ingredients.module.css';
import { useMemo, useState } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card.jsx';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientDataTypes from '../../propTypes/ingredientPropsTypes.js';
import { arrayOf } from 'prop-types';


function BurgerIngredients({ ingredients }) {
    const [activeTab, setActiveTab] = useState('bun');

    const buns = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
    const mains = useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]);

    const handleActiveTab = (tabValue) => {
        setActiveTab(tabValue)
        const section = document.getElementById(tabValue);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.ingredients}>
            <h1 className={styles.header}>Соберите бургер</h1>
            <div className={styles.tabs}>
                <Tab active={activeTab === 'bun' ? 'true' : null} value={'bun'} onClick={() => handleActiveTab('bun')}>Булки</Tab>
                <Tab active={activeTab === 'sauce' ? 'true' : null} value={'sauce'} onClick={() => handleActiveTab('sauce')}>Соусы</Tab>
                <Tab active={activeTab === 'main' ? 'true' : null} value={'main'} onClick={() => handleActiveTab('main')}>Начинки</Tab>
            </div>
            <div className={styles.scroll_container}>
                <h2 id="bun" className={styles.cards_header}>Булки</h2>
                <div className={styles.cards}>
                    {buns.map(bun => {
                        return (
                            <IngredientCard
                                key={bun._id}
                                ingredient={bun}
                            />
                        )}
                    )}
                </div>
                <h2 id="sauce" className={styles.cards_header}>Соусы</h2>
                <div className={styles.cards}>
                    {mains.map(main => {
                        return (
                            <IngredientCard
                                key={main._id}
                                ingredient={main}
                            />
                        )}
                    )}
                </div>
                <h2 id="main" className={styles.cards_header}>Начинки</h2>
                <div className={styles.cards}>
                    {sauces.map(sauce => {
                        return (
                            <IngredientCard
                                key={sauce._id}
                                ingredient={sauce}
                            />
                        )}
                    )}
                </div>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: arrayOf(ingredientDataTypes).isRequired
}

export default BurgerIngredients;
