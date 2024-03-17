export type TIngredient = {
    _id: string;
    uuid: string;
    name: string;
    image: string;
    type: string;
    price: number;
    calories: number;
    carbohydrates: number;
    proteins: number;
    fat: number;
    image_large: string;
    image_mobile: string;
}

export type TUser = {
    name: string;
    email: string;
}
