import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../actions/ingredientDetailsActions.js';


const initialState = {
    ingredient: {}
}

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case (ADD_INGREDIENT_DETAILS): {
            return { ...state, ingredient: action.payload }
        }
        case (DELETE_INGREDIENT_DETAILS): {
            return { ingredient: {} }
        }
        default: {
            return state;
        }
    }
}
