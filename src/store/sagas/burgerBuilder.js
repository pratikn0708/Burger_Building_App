import axios from '../../axios-order';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://pushnotification-927ca.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data));

    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
};