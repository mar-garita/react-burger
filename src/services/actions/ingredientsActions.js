import { getIngredientsData } from '../../utils/api.js';


export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_BUNS = 'SET_BUNS';
export const SET_MAINS = 'SET_MAINS';
export const SET_SAUCES = 'SET_SAUCES';


export const fetchIngredients = () => {
    return (dispatch) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        const fetchAndFilterIngredients = async () => {
            try {
                const result = await getIngredientsData();
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: result.data
                });

                const buns = result.data.filter(item => item.type === 'bun');
                const mains = result.data.filter(item => item.type === 'main');
                const sauces = result.data.filter(item => item.type === 'sauce');

                dispatch({ type: SET_BUNS, payload: buns });
                dispatch({ type: SET_MAINS, payload: mains });
                dispatch({ type: SET_SAUCES, payload: sauces });

            } catch (error) {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                    payload: error
                });
            }
        }
        fetchAndFilterIngredients();
    }
}
