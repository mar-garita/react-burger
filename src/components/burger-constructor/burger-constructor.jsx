import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredientDataTypes from "../../propTypes/ingredientPropTypes.js";

function BurgerConstructor({ data }) {

    return (
        <section className={styles.constructor}>
            <div className={styles.scroll}>
                <div className={styles.scroll__static}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                    />
                </div>
                <div className={styles.scroll__list}>
                    {data.map((ingredient => {
                        if (ingredient.type !== 'bun') {
                            return (
                                <div key={ingredient._id} className={styles.scroll__element}>
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                        text={ingredient.name}
                                        thumbnail={ingredient.image}
                                        price={ingredient.price}
                                    />
                                </div>
                            )}
                        })
                    )}
                </div>
                <div className={styles.scroll__static}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                    />
                </div>
            </div>
            <div className={styles.order}>
                <span className={styles.total}>
                    610
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientDataTypes).isRequired
}

export default BurgerConstructor;
