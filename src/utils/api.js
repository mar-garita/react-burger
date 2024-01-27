import { apiConfig } from './api-config.js';

export const getIngredients = async () => {
    return fetch(apiConfig.baseUrl)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => console.log(error))
}
