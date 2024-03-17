// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export const addIngredientDetails = (ingredient) => {
    return { type: ADD_INGREDIENT_DETAILS, payload: ingredient }
}

export const deleteIngredientDetails = () => {
    return { type: DELETE_INGREDIENT_DETAILS, payload: {} }
}
