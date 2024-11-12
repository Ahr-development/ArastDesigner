

import * as actionType from "./../actionTypes";

let initialState = {
    SendId: 0,
    PopupName: null,
};



export const PopupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_POPUP:
            return { ...state, ...action.payload }; 
              
                  
        default:
            return state;
    }
}