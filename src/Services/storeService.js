import api from "./httpService";
import config from "./config.json";



export const GetStoreByUserId = (UserId, Stoken) => {
    return api.post(`${config.apiLink}/api/store/getStoreByUserId`, JSON.stringify({ UserId, Stoken }));
};


export const GetStoreDesignByLinkService = (DesignLink, Stoken) => {
    return api.post(`${config.apiLink}/api/store/getStoreDesignByDesignLink`, JSON.stringify({ DesignLink, Stoken }));
};


export const GetStoreDesignCollectionByStoreIdService = (StoreId, Stoken) => {
    return api.post(`${config.apiLink}/api/store/getStoreDesignCollectionByStoreId`, JSON.stringify({ StoreId, Stoken }));
};


export const StorePublishDesignService = (formData) => {
    return api.post(`${config.apiLink}/api/store/PublishStoreDesign`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
};



export const CreateStoreDesignCollectionService = (formData) => {
    return api.post(`${config.apiLink}/api/store/createStoreDesignCollection`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
};