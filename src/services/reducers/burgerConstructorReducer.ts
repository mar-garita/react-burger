// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
    ADD_BUN_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    MOVE_INGREDIENT,
    RESET_CONSTRUCTOR,
} from '../actions/burgerConstructorActions.ts';


const initialState = {
    bun: null,
    bunCounts: {},
    ingredients: [],
    ingredientCounts: {},
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case (ADD_BUN_TO_CONSTRUCTOR): {
            const newBunCounts = {};
            newBunCounts[action.payload._id] = 2; // учитываем верхнюю и нижнюю булочку

            return { ...state, bun: action.payload, bunCounts: newBunCounts }
        }
        case (ADD_INGREDIENT_TO_CONSTRUCTOR): {
            const newIngredientCounts = { ...state.ingredientCounts };
            newIngredientCounts[action.payload._id] = (newIngredientCounts[action.payload._id] || 0) + 1;

            return { ...state,  ingredients: [...state.ingredients, action.payload], ingredientCounts: newIngredientCounts }
        }
        case (DELETE_INGREDIENT_FROM_CONSTRUCTOR): {
            const newIngredientCounts = { ...state.ingredientCounts };
            if (newIngredientCounts[action.payload.id] > 1) {
                newIngredientCounts[action.payload.id] -= 1;
            } else {
                delete newIngredientCounts[action.payload.id];
            }

            return { ...state, ingredients: state.ingredients.filter(ingredient => ingredient.uuid !== action.payload.uuid),
                ingredientCounts: newIngredientCounts
            }
        }
        case (MOVE_INGREDIENT): {
            const { dragIndex, hoverIndex } = action.payload;
            const newIngredients = [...state.ingredients];
            // Извлекается перетаскиваемый элемент из массива newIngredients по индексу dragIndex
            const dragElement = newIngredients[dragIndex];
            // Перетаскиваемый элемент удаляется из массива newIngredients
            newIngredients.splice(dragIndex, 1);
            // Затем перетаскиваемый элемент вставляется обратно в массив newIngredients на позицию hoverIndex
            newIngredients.splice(hoverIndex, 0, dragElement);
            return { ...state, ingredients: newIngredients };
        }
        case RESET_CONSTRUCTOR:
            return initialState;
        default: {
            return state;
        }
    }
}
