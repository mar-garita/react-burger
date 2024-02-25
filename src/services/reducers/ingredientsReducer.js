import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_BUNS,
    SET_MAINS,
    SET_SAUCES,
} from '../actions/ingredientsActions.js';


const initialState = {
    ingredients: [],
    buns: [],
    mains: [],
    sauces: [],
    isLoading: false,
    error: undefined,
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case (GET_INGREDIENTS_REQUEST): {
            return { ...state, isLoading: true }
        }
        case (GET_INGREDIENTS_SUCCESS): {
            return { ...state, ingredients: action.payload, isLoading: false }
        }
        case (GET_INGREDIENTS_FAILED): {
            return { ...state, error: action.payload, isLoading: false }
        }
        case (SET_BUNS): {
                return { ...state, buns: action.payload }
            }
        case (SET_MAINS): {
                return { ...state, mains: action.payload }
            }
        case (SET_SAUCES): {
                return { ...state, sauces: action.payload }
            }
        default: {
            return state;
        }
    }
}
