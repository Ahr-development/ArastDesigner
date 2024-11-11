
import * as actionType from "./../actionTypes";

let initialState = {
    AllAssetTab: false,
    LogoTab: false,
    StickerTab: false,
    LoadUserDesign: false,
    Canvas: false
};



export const LoaderActionsReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.SET_ALL_ASSET_TAB_LOADER:
            return {
                ...state,
                AllAssetTab: action.payload
            };
        case actionType.SET_LOGO_TAB_LOADER:
            return {
                ...state,
                LogoTab: action.payload
            };
        case actionType.SET_STICKER_TAB_LOADER:
            return {
                ...state,
                StickerTab: action.payload
            };

        case actionType.SET_USERDESIGN_LOADER:
            return {
                ...state,
                LoadUserDesign: action.payload
            };


        case actionType.SET_CANVAS_LOADER:
            return {
                ...state,
                Canvas: action.payload
            };


        default:
            return state;
    }
}