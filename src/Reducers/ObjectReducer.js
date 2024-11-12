


import * as actionType from "./../actionTypes";

let initialState = {
    activeObjectId: 0,
    objectActiveCurrent: {},
    selectionObjects: [],
    objects : []
};



export const ObjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_OBJECT_ID:
            return { ...state, activeObjectId: action.payload };
              

            case actionType.SET_SELECTION_OBJECTS:
                return { ...state, selectionObjects: action.payload };
                  
                case actionType.SET_OBJECTS:
                    return {
                      ...state,
                      objects: [...state.objects, action.payload],
                    };
        default:
            return state;
    }
}