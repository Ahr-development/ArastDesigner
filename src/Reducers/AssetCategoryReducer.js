

import * as actionType from "./../actionTypes";



const initialState = {
    category: [],
    subCategory : []
};



export const AssetCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ASSET_CATEGORY:
            return {
                ...state,
                category: action.payload.category,
                subCategory : action.payload.subCategory
            };
    
        default:
            return state;
    }
}