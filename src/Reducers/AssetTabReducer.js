



import * as actionType from "./../actionTypes";

let initialState = {
    CategoryId: 0,
    HashtagName: null,
    TypeId : 0,
    SearchWord : null,
    ColorTag: null,
    IsActiveTab : false,
    StickerPackId : 0,
    LogoPackId : 0,

};



export const AssetTabReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_ASSET_TAB:
            return { ...state, ...action.payload }; 
              
                  
        default:
            return state;
    }
}