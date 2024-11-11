

import * as actionType from "./../actionTypes";


export const UserDesignReducer = (state = [], action) => {
    switch (action.type) {
        case actionType.USER_DESIGN:
            return [...state, ...action.payload];

            case actionType.USER_NEW_DESIGN:
                return [...state, action.payload];
    

        case actionType.OVERRIDE_DESIGN:
            return action.payload;


        default:
            return state;
    }
}