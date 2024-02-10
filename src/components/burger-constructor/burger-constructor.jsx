import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '../../hooks/useModal.js';
import DraggableElement from './draggable-element/draggable-element.jsx';
import Loader from '../ui/loader/loader.jsx';
import ModalOrderDetails from './modal-order-details/modal-order-details.jsx';
import { getConstructorIngredients, getConstructorBun, getOrderNumber, getTotalPrice, createOrderIsLoading } from '../../services/selectors.js';
import { dispatchOrderCreationRequest } from '../../services/actions/orderDetailsAction.js';
import {
    addBunToConstructor,
    addIngredientToConstructor,
    deleteIngredientFromConstructor,
    moveIngredient,
} from '../../services/actions/burgerConstructorActions.js';


function BurgerConstructor() {
    const [isOpen, onOpenModal, onCloseModal] = useModal(false);
    const dispatch = useDispatch();

    const ingredients = useSelector(getConstructorIngredients);
    const bun = useSelector(getConstructorBun);
    const totalPrice = useSelector(getTotalPrice);
    const orderNumber = useSelector(getOrderNumber);
    const isLoading = useSelector(createOrderIsLoading);

    const [, dropRef] = useDrop({
        accept: "ingredient", // тип принимаемого элемента
        drop(ingredient) {
            if (ingredient.type === 'bun') {
                dispatch(addBunToConstructor(ingredient));
            } else {
                dispatch(addIngredientToConstructor(ingredient));
            }
        }
    });

    const deleteIngredient = (id, uuid) => {
        dispatch(deleteIngredientFromConstructor(id, uuid));
    }

    const createOrder = (data) => {
        dispatch(dispatchOrderCreationRequest(data));
        onOpenModal();
    }

    // Меняет местами элементы при перетаскивании
    const moveConstructorIngredient = (dragIndex, hoverIndex) => {
        dispatch(moveIngredient(dragIndex, hoverIndex));
    }

    const renderElements = useCallback((ingredient, index) => {
        return (
            <div key={ingredient.uuid}>
                <DraggableElement index={index} moveElement={moveConstructorIngredient} className={styles.constructor_element}>
                    <DragIcon type="primary"/>
                    <ConstructorElement
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={() => deleteIngredient(ingredient._id, ingredient.uuid)}
                    />
                </DraggableElement>
            </div>
        )
    }, [])

    return (
        <section className={styles.constructor}>
            <div ref={dropRef} className={styles.scroll}>
                <div className={styles.scroll_wrapper}>
                    {bun &&
                        <div className={styles.constructor_element}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={bun.name}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    }
                    <div className={styles.scroll_list}>
                        {ingredients.map(((ingredient, index) => {
                            if (ingredient.type !== 'bun') {
                                return renderElements(ingredient, index)
                            }
                        }))}
                    </div>
                    {bun &&
                        <div className={styles.constructor_element}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={bun.name}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className={styles.order}>
                <span className={styles.total}>
                    {totalPrice}
                    <CurrencyIcon type="primary"/>
                </span>
                <Button onClick={() => createOrder(ingredients)} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {isOpen && orderNumber &&
                <ModalOrderDetails
                    isOpen={isOpen}
                    onClose={onCloseModal}
                />
            }
        </section>
    )
}

export default BurgerConstructor;
