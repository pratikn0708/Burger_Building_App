import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { fetchOrdersFail } from '../actions/order';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredients = (state, action) => {
    const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updateIngredients = updateObject(state.ingredients, updateIngredient)
    const updatedState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
    };

    return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
    const updateIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updateIngs = updateObject(state.ingredients, updateIng)
    const updatedSt = {
        ingredients: updateIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
    };

    return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return addIngredients(state, action);

        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredients(stae, action);

        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(stae, action);

        default:
            return state;
    }
};

export default reducer;