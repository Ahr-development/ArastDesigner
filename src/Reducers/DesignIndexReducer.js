





import * as actionType from "./../actionTypes";



export const DesignIndexReducer = (state = 0, action) => {
    switch (action.type) {
        case actionType.CHANGE_INDEX_DESIGN:
            state = action.payload
            return action.payload
        default:
            return state;
    }
}