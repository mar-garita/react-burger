import styles from './burger-ingredients.module.css';
import CardIngredient from "../card-ingredients/card-ingredient.jsx";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {useMemo, useState} from "react";
import PropTypes from "prop-types";
import ingredientDataTypes from "../../propTypes/ingredientPropTypes";

function BurgerIngredients({ data }) {
    const [activeTab, setActiveTab] = useState('bun');

    const buns = useMemo(() => data.filter(item => item.type === 'bun'), [data]);
    const mains = useMemo(() => data.filter(item => item.type === 'main'), [data]);
    const sauces = useMemo(() => data.filter(item => item.type === 'sauce'), [data]);

    const handleActiveTab = (tabValue) => {
        setActiveTab(tabValue)
        const section = document.getElementById(tabValue);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.ingredients}>
            <h1 className={styles.ingredients__header}>Соберите бургер</h1>
            <div className={styles.tabs}>
                <Tab active={activeTab === 'bun' ? 'true' : null} value={'bun'} onClick={() => handleActiveTab('bun')}>Булки</Tab>
                <Tab active={activeTab === 'sauce' ? 'true' : null} value={'sauce'} onClick={() => handleActiveTab('sauce')}>Соусы</Tab>
                <Tab active={activeTab === 'main' ? 'true' : null} value={'main'} onClick={() => handleActiveTab('main')}>Начинки</Tab>
            </div>
            <div className={styles.scroll_container}>
                <h2 id="bun" className={styles.cards__header}>Булки</h2>
                <div className={styles.cards}>
                    {buns.map(bun => {
                        return (
                            <CardIngredient
                                key={bun._id}
                                card={bun}
                            />
                        )}
                    )}
                </div>
                <h2 id="sauce" className={styles.cards__header}>Соусы</h2>
                <div className={styles.cards}>
                    {mains.map(main => {
                        return (
                            <CardIngredient
                                key={main._id}
                                card={main}
                            />
                        )}
                    )}
                </div>
                <h2 id="main" className={styles.cards__header}>Начинки</h2>
                <div className={styles.cards}>
                    {sauces.map(sauce => {
                        return (
                            <CardIngredient
                                key={sauce._id}
                                card={sauce}
                            />
                        )}
                    )}
                </div>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientDataTypes).isRequired
}

export default BurgerIngredients;
