import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '../../hooks/useModal.ts';
import DraggableElement from './draggable-element/draggable-element.tsx';
import ModalCreateOrder from './modal-create-order/modal-create-order.tsx';
import ModalOrderDetails from './modal-order-details/modal-order-details.tsx';
import { dispatchOrderCreationRequest } from '../../services/actions/orderDetailsAction.ts';
import { getUser } from '../../services/selectors.ts';
import {
    addBunToConstructor,
    addIngredientToConstructor,
    deleteIngredientFromConstructor,
    moveIngredient,
} from '../../services/actions/burgerConstructorActions.ts';
import {
    createOrderIsLoading,
    getConstructorBun,
    getConstructorIngredients,
    getOrderNumber,
    getTotalPrice
} from '../../services/selectors.ts';
import { TIngredient } from '../../types/types.ts';


function BurgerConstructor() {
    const { isOpen, onOpenModal, onCloseModal } = useModal();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const navigate = useNavigate();

    const ingredients = useSelector(getConstructorIngredients);
    const bun = useSelector(getConstructorBun);
    const totalPrice = useSelector(getTotalPrice);
    const orderNumber = useSelector(getOrderNumber);
    const isLoading = useSelector(createOrderIsLoading);

    const [, dropRef] = useDrop({
        accept: "ingredient", // тип принимаемого элемента
        drop(ingredient: TIngredient) {
            if (ingredient.type === 'bun') {
                dispatch(addBunToConstructor(ingredient));
            } else {
                dispatch(addIngredientToConstructor(ingredient));
            }
        }
    });

    const deleteIngredient = (id: string, uuid: string) => {
        dispatch(deleteIngredientFromConstructor(id, uuid));
    }

    const createOrder = (data: Array<TIngredient>) => {
        if (!user) {
            navigate('/login');
        } else {
            const dataWithBuns = [...data, bun, bun];
            //@ts-ignore
            dispatch(dispatchOrderCreationRequest(dataWithBuns));
            onOpenModal();
        }
    }

    // Меняет местами элементы при перетаскивании
    const moveConstructorIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch(moveIngredient(dragIndex, hoverIndex));
    }

    const renderElements = useCallback((ingredient: TIngredient, index: number) => {
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
        <section className={styles.constructor_wrapper}>
            <div ref={dropRef} className={styles.scroll}>
                <div className={styles.scroll_wrapper}>
                    {bun &&
                        <div className={styles.constructor_element}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    }
                    <div className={styles.scroll_list}>
                        {ingredients.map(((ingredient: TIngredient, index: number) => {
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
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    }
                </div>
            </div>
            {isLoading ? <ModalCreateOrder isOpen={isOpen} onClose={onCloseModal} /> :
                <div className={styles.order}>
                    <span className={styles.total}>
                        {totalPrice}
                        <CurrencyIcon type="primary"/>
                    </span>
                    <Button htmlType="button" type="primary" size="large" disabled={!bun && true}
                            onClick={() => createOrder(ingredients)}
                    >
                        Оформить заказ
                    </Button>
                </div>
            }
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
