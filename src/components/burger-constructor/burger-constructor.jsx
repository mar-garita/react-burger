import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOrderDetails from '../modal-order-details/modal-order-details.jsx';
import useModal from '../../hooks/useModal.js';
import ingredientDataTypes from '../../propTypes/ingredientPropsTypes.js';
import { arrayOf } from 'prop-types';



function BurgerConstructor({ ingredients }) {
    const [isOpen, onOpenModal, onCloseModal] = useModal(false);

    return (
        <section className={styles.constructor}>
            <div className={styles.scroll}>
                <div className={styles.scroll_static}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                    />
                </div>
                <div className={styles.scroll_list}>
                    {ingredients.map((ingredient => {
                        if (ingredient.type !== 'bun') {
                            return (
                                <div key={ingredient._id} className={styles.scroll_element}>
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
                <div className={styles.scroll_static}>
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
                <Button onClick={onOpenModal} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {isOpen &&
                <ModalOrderDetails
                    onClose={onCloseModal}
                    isOpen={isOpen}
                />
            }
        </section>
    )
}

BurgerConstructor.propTypes = {
    ingredients: arrayOf(ingredientDataTypes).isRequired
}

export default BurgerConstructor;
