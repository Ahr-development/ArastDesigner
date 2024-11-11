




import * as actionType from "./../actionTypes";

  
export const DesignCollectionReducer = (state = [], action) => {
    switch (action.type) {
        case actionType.DESIGN_COLLECTION:
            return [...action.payload];

        default:
            return state;
    }
}