import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './reducers/ingredientsReducer.js';
import { ingredientDetailsReducer } from './reducers/ingredientDetailsReducer.js';
import { burgerConstructorReducer } from './reducers/burgerConstructorReducer.js';
import {orderDetailsReducer} from "./reducers/orderDetailsReducer.js";


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredientsConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
});

const store = configureStore({ reducer: rootReducer })

export default store;
