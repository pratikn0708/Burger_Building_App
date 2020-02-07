import * as actionTypes from '../actions/actionTypes';

const initialState = {
    order: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading:false,
                orders:state.order.concat()
            }

        case actionTypes.PURCHASE_BURGER_FAIL:
            return {}

        default:
            return state;
    }
};

export default reducer;