// App
export const ingredientsIsLoading = state => state.ingredients.isLoading;

// BurgerIngredients
export const getBuns = state => state.ingredients.buns;
export const getMains = state => state.ingredients.mains;
export const getSauces = state => state.ingredients.sauces;
export const getIngredients = state => state.ingredients.ingredients;

// BurgerConstructor
export const getConstructorBun = state => state.ingredientsConstructor.bun;
export const getConstructorIngredients = state => state.ingredientsConstructor.ingredients;
export const getBunCounts = state => state.ingredientsConstructor.bunCounts;
export const getIngredientCounts = state => state.ingredientsConstructor.ingredientCounts;

export const getTotalPrice = state => {
    const bun = getConstructorBun(state);
    const bunPrice = bun ? bun.price * 2 : 0;

    return state.ingredientsConstructor.ingredients.reduce((acc, item) => {
        return acc + item.price;
    }, bunPrice);
}

// IngredientDetails
export const getIngredientDetails = state => state.ingredientDetails.ingredient;

// OrderDetails
export const getOrderNumber = state => state.orderDetails.orderNumber;
export const createOrderIsLoading = state => state.orderDetails.isLoading;

// Auth
export const getUser = state => state.userAuth.user;
export const userIsLoading = state => state.userAuth.isLoading;
export const authChecked = state => state.userAuth.isAuthChecked;
