import * as actionType from "./../actionTypes";


  
export const FontsReducer = (state = [], action) => {
    switch (action.type) {
        case actionType.FONTS:
            return [...action.payload];

        default:
            return state;
    }
}