import styles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './ingredient-card/ingredient-card.jsx';
import { getBuns, getMains, getSauces, getBunCounts, getIngredientCounts } from '../../services/selectors.js';


function BurgerIngredients() {
    const location = useLocation();
    const buns = useSelector(getBuns);
    const mains = useSelector(getMains);
    const sauces = useSelector(getSauces);

    const bunCounts = useSelector(getBunCounts);
    const ingredientCounts = useSelector(getIngredientCounts);

    const [activeTab, setActiveTab] = useState('bun');
    const sections = ['bun', 'sauce', 'main'];

    useEffect(() => {
        const handleScroll = () => {
            const offset = 300; // смещение в пикселях

            sections.forEach((sectionId) => {
                const section = document.getElementById(sectionId);
                const rect = section.getBoundingClientRect();

                if (rect.top <= offset) {
                    setActiveTab(sectionId);
                }
            });
        };

        const scrollContainer = document.getElementById('scroll_container');
        scrollContainer.addEventListener('scroll', handleScroll);

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                <Tab
                    value={'bun'}
                    active={activeTab === 'bun' ? 'true' : null}
                    onClick={() => handleActiveTab('bun')}
                >
                    Булки
                </Tab>
                <Tab
                    value={'sauce'}
                    active={activeTab === 'sauce' ? 'true' : null}
                    onClick={() => handleActiveTab('sauce')}
                >
                    Соусы
                </Tab>
                <Tab
                    value={'main'}
                    active={activeTab === 'main' ? 'true' : null}
                    onClick={() => handleActiveTab('main')}
                >
                    Начинки
                </Tab>
            </div>
            <div id='scroll_container' className={styles.scroll_container}>
                <h2 id="bun" className={styles.cards_header}>Булки</h2>
                <div className={styles.cards}>
                    {buns.map(bun => {
                        return (
                            <Link
                                key={bun._id}
                                to={`/ingredients/${bun._id}`}
                                state={{ backgroundLocation: location }}
                                className={styles.link}
                            >
                                <IngredientCard
                                    ingredient={{...bun}}
                                    count={bunCounts[bun._id] || 0}
                                />
                            </Link>
                        )}
                    )}
                </div>
                <h2 id="sauce" className={styles.cards_header}>Соусы</h2>
                <div className={styles.cards}>
                    {sauces.map(sauce => {
                        return (
                            <Link
                                key={sauce._id}
                                to={`/ingredients/${sauce._id}`}
                                state={{ backgroundLocation: location }}
                                className={styles.link}
                            >
                                <IngredientCard
                                    ingredient={{...sauce}}
                                    count={ingredientCounts[sauce._id] || 0}
                                />
                            </Link>
                        )}
                    )}
                </div>
                <h2 id="main" className={styles.cards_header}>Начинки</h2>
                <div className={styles.cards}>
                    {mains.map(main => {
                        return (
                            <Link
                                key={main._id}
                                to={`/ingredients/${main._id}`}
                                state={{ backgroundLocation: location }}
                                className={styles.link}
                            >
                                <IngredientCard
                                    ingredient={{...main}}
                                    count={ingredientCounts[main._id] || 0}
                                />
                            </Link>
                        )}
                    )}
                </div>
            </div>
        </section>
    )
}

export default BurgerIngredients;
