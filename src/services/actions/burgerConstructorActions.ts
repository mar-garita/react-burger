// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { v4 as uuid } from 'uuid';


export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';


export const addBunToConstructor = (ingredient) => {
    return { type: ADD_BUN_TO_CONSTRUCTOR, payload: { ...ingredient, uuid: uuid() }}
}

export const addIngredientToConstructor = (ingredient) => {
    return { type: ADD_INGREDIENT_TO_CONSTRUCTOR, payload: { ...ingredient, uuid: uuid() }}
}

// id - идентификатор ингредиента, который приходит с сервера, используется для изменения
// количества ингредиента в конструкторе
// uuid - генерируется при добавлении ингредиента в конструктор, используется для определения,
// какой именно ингредиент нужно удалить из конструктора
export const deleteIngredientFromConstructor = (id, uuid) => {
    return { type: DELETE_INGREDIENT_FROM_CONSTRUCTOR, payload: { id, uuid }}
}

export const moveIngredient = (dragIndex, hoverIndex) => {
   return { type: MOVE_INGREDIENT, payload: { dragIndex, hoverIndex } }
};

export const resetConstructor = () => {
    return { type: RESET_CONSTRUCTOR };
}
