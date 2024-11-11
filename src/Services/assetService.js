import api from "./httpService";
import config from "./config.json";




export const GetAllFonts = () => {
    return api.get(`${config.apiLink}/api/asset/getAllFontsApi`);
}




export const GetSomeAssetsByCategories = () => {
    return api.get(`${config.apiLink}/api/asset/getSomeAssetsByCategories`);
}



export const GetAllCategoriesAndSubCategory = () => {
    return api.get(`${config.apiLink}/api/asset/getAllAssetsCategoryAndSubCategories`);
}



export const getInitAssetsService = () => {
    return api.get(`${config.apiLink}/api/asset/getInitAssets`);
}


export const getMoreAssetsByCategoryIdService = (categoryId,page) => {
    return api.get(`${config.apiLink}/api/asset/getMoreAssetsByPageRequestAndCategoryId/` + categoryId + "/" + page);
}


export const getAssetPackService = (CollectionId) => {
    return api.post(`${config.apiLink}/api/asset/getStickerPacksById`, JSON.stringify({ CollectionId }));
}


export const GetAssetInfoService = (AssetId) => {
    return api.post(`${config.apiLink}/api/asset/getAssetInfoByAssetId`, JSON.stringify({ AssetId }));
}




export const GetAssetExpireLinkService = (UserId,Stoken,AssetId) => {
    return api.post(`${config.apiLink}/api/asset/getAssetFileExpirePrivateLink`, JSON.stringify({ UserId,Stoken,AssetId }));
}
