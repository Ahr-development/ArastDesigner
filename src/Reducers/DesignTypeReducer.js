

import * as actionType from "./../actionTypes";

  
export const DesignTypeReducer = (state = [], action) => {
    switch (action.type) {
        case actionType.DESIGN_TYPE_REDUCER:
            return [...action.payload];

        default:
            return state;
    }
}