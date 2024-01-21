import styles from './burger-ingredients.module.css';
import CardIngredient from "../card-ingredients/card-ingredient.jsx";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import PropTypes from "prop-types";

function BurgerIngredients({ data }) {
    const [activeTab, setActiveTab] = useState('bun');

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
                    {data.map((card => {
                        if (card.type === 'bun') {
                            return (
                                <CardIngredient
                                    key={card._id}
                                    card={card}
                                />
                            )}
                        })
                    )}
                </div>
                <h2 id="sauce" className={styles.cards__header}>Соусы</h2>
                <div className={styles.cards}>
                    {data.map((card => {
                            if (card.type === 'sauce') {
                                return (
                                    <CardIngredient
                                        key={card._id}
                                        card={card}
                                    />
                                )}
                        })
                    )}
                </div>
                <h2 id="main" className={styles.cards__header}>Начинки</h2>
                <div className={styles.cards}>
                    {data.map((card => {
                            if (card.type === 'main') {
                                return (
                                    <CardIngredient
                                        key={card._id}
                                        card={card}
                                    />
                                )}
                        })
                    )}
                </div>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.array
}

export default BurgerIngredients;
