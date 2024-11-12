
import * as actionType from "./../actionTypes";

let initialState = {
    DisableSave : false,
    CurrentActiveDesignIndex : 0,
    LastDesignsLength : 0,

};



export const DesignChangeControlReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.DESIGN_MANAGER_SAVE_CONTROL:
            return {
                ...state,
                DisableSave: action.payload,

            };

            case actionType.CHANGE_CURRENT_DESIGN:
                return {
                    ...state,
                    CurrentActiveDesignIndex: action.payload,
    
                };
                case actionType.LAST_DESIGN_NUMBER:
                    return {
                        ...state,
                        LastDesignsLength: action.payload,
        
                    };

        default:
            return state;
    }
}