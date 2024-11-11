import * as actionType from "./../actionTypes";


  
export const HistoryReducer = (state = [], action) => {
    switch (action.type) {
        case actionType.HISTORY:
            return [...action.payload];

        case actionType.ADD_HISTORY:
            return [...state, action.payload]
        case actionType.REMOVE_HISTORY:
            return {
                ...state,
                items: state.filter(item => item.id !== action.payload),
              };
        default:
            return state;
    }
}