import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './reducers/ingredientsReducer.ts';
import { ingredientDetailsReducer } from './reducers/ingredientDetailsReducer.ts';
import { burgerConstructorReducer } from './reducers/burgerConstructorReducer.ts';
import { orderDetailsReducer } from './reducers/orderDetailsReducer.ts';
import { userAuthReducer } from './reducers/authReducer.ts';


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredientsConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    userAuth: userAuthReducer,
});

const store = configureStore({ reducer: rootReducer })

export default store;
