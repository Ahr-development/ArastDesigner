



import * as actionType from "./../actionTypes";

  
export const StoreReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.STORE:
            return {...action.payload};

        default:
            return state;
    }
}