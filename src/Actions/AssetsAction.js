import { GetAllCategoriesAndSubCategory, GetAllFonts, GetSomeAssetsByCategories, getInitAssetsService, getMoreAssetsByCategoryIdService } from "../Services/assetService";
import * as actionType from "./../actionTypes";






export const LoadFontsAction =() => {
    return async dispatch => {
        const {data} = await GetAllFonts();
        await dispatch({type:actionType.FONTS,payload:data});

    }
}


export const LoadCategoriesAction =() => {
    return async dispatch => {
        const {data} = await GetAllCategoriesAndSubCategory();
        await dispatch({type:actionType.ASSET_CATEGORY,payload:data});

    }
}



export const LoadInitAssetsAction =() => {
    return async dispatch => {
        const {data} = await getInitAssetsService();
        await dispatch({type:actionType.INITS_ASSETS,payload:data});

    }
}


export const getAssetPackByIdAction = (CollectionId) => {
    return async dispatch => {
        const {data} = await getAssetPackService(CollectionId);
        await dispatch({type:actionType.STICKERS_PACKS_LOADED,payload:data});

    }
}

export const LoadMorePhotosAssetAction = (object) => ({
    type: actionType.PHOTOS_ASSETS,
    payload: object,

});

/* export const LoadAssetsByCategoriesAction =() => {
    return async dispatch => {
        const {data} = await GetSomeAssetsByCategories();
        await dispatch({type:actionType.SOME_ASSETS,payload:data});

    }
} */