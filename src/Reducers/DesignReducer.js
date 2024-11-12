

import * as actionType from "./../actionTypes";


const initialState = {
    designs: [],
    pages : {
        designPage : 1,
    },
    isEnd : {
        designEnd : false,
    }
};
  
export const DesignReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.DESIGN:
            return {
                ...state,
                designs: [...state.designs, ...action.payload]
            };
        default:
            return state;
    }
}