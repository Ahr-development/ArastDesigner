import api from "./httpService";
import config from "./config.json";




// دریافت UserDesignReducer
export const GetDesignByLink = (UserId, Stoken, DesignLink) => {
    const random = Math.floor(Math.random() * 101);
    return api.post(`${config.apiLink}/api/design/getUserDesignByLink?r=${random}`, JSON.stringify({ UserId, Stoken, DesignLink } , {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        },
    }));
};


//دریافت InitAppReducer
export const GetDesignInitByUserDesignId = (UserId, Stoken, DesignId) => {
    return api.post(`${config.apiLink}/api/design/designInitRequest`, JSON.stringify({ UserId, Stoken, DesignId }));
};


//ذخیره سازی پیشرفت دیزاین
/* export const SaveDesignService = (Stoken,DesignId,Canvas) => {
    return api.post(`${config.apiLink}/api/design/overrideDesignAndSaveDesign`, JSON.stringify({ Stoken,DesignId,Canvas,file } ));
}; */

export const SaveDesignService = (formData) => {
    return api.post(`${config.apiLink}/api/design/overrideDesignAndSaveDesign`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
};



export const GetAllDesignTypeService = () => {
    return api.get(`${config.apiLink}/api/design/getAllDesignTypesDashboard`);
}




export const getMoreDesignByDesignTypeService = (Stoken,DesignTypeId,Page,UserId) => {
        return api.post(`${config.apiLink}/api/design/getMoreDesignByDesignType`, JSON.stringify({ Stoken, DesignTypeId, Page,UserId }));
}



export const setStoreDesignForCurrentUser = (Stoken,DesignId,UserId,UserDesignId) => {
    return api.post(`${config.apiLink}/api/design/setDesignForCurrentUser`, JSON.stringify({ DesignId, Stoken, UserId,UserDesignId }));
}



export const CreateNewDesignInUserDesignService = (Stoken,DesignLink,UserId,UserDesignId) => {
    return api.post(`${config.apiLink}/api/design/CreateNewDesignInUserDesign`, JSON.stringify({ DesignLink, Stoken, UserId,UserDesignId }));
}




export const UpdateUserDesignNameService = (Stoken,UserId,DesignId,DesignName) => {
    return api.post(`${config.apiLink}/api/design/setNewNameForUserDesign`, JSON.stringify({ Stoken, UserId,DesignId,DesignName }));
}

