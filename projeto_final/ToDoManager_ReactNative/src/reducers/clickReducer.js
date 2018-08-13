import { CLICK_UPDATE_VALUE } from '../actions/actionTypes';

export const clickReducer = (state = '', action) => {
    switch (action.type) {
        case CLICK_UPDATE_VALUE:
            return {
                ...state,
                newValue: action.newValue
            };
        default:
            return state;
    }
};