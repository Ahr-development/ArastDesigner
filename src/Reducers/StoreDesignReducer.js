





import * as actionType from "./../actionTypes";

  
export const StoreDesignReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.STORE_DESIGN:
            return {...action.payload};

        default:
            return state;
    }
}