

import * as actionType from "./../actionTypes";

let initialState = {
    FirstName : null,
    LastName : null,
    RoleId : 0,
    ServerToken : null,
    Token : null,
};



export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return { ...state, ...action.payload }; 
              
                  
        default:
            return state;
    }
}