

import * as actionType from "./../actionTypes";



const initialState = {
    photos: [],
    stickers: [],
    stickerCollections : [],
    stickerPacksLoaded : [],
    logos: [],
    logoCollections: [],
    all: [],
    shapes : [],
    pages : {
        photosPage : 3,
        stickersPage : 1
    },
    isEnd : {
        photosEnd : false,
        stickersEnd : false
    }
};



export const AssetsReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.INITS_ASSETS:
            return {
                ...state,
                photos : action.payload.photos,
                stickerCollections : action.payload.stickerCollections,
                shapes : action.payload.shapes,
                logoCollections : action.payload.logoCollections
            };

            case actionType.ALL_ASSETS:
                return {
                    ...state,
                    all: action.payload.all,
                };


        case actionType.PHOTOS_ASSETS:
            return {
                ...state,
                photos: [...state.photos, ...action.payload]
            };


            

        case actionType.PHOTOS_ASSETS_SEARCH:
            return {
                ...state,
                photos: action.payload
            };


        case actionType.STICKERS_ASSETS:
            return {
                ...state,
                stickers: [...state.stickers, ...action.payload]
            };

            case actionType.STICKERS_PACKS_LOADED:
                return {
                    ...state.stickerPacksLoaded,
                    stickerPacksLoaded: [...state.stickerPacksLoaded, ...action.payload]
                };

        case actionType.LOGOS_ASSETS:
            return {
                ...state,
                logos: [...state.logos, ...action.payload]
            };


            
        case actionType.SHAPES_ASSETS:
            return {
                ...state,
                shapes: action.payload.shapes,
            };

        default:
            return state;
    }
}