import * as actionType from "./../actionTypes";
import { GetDesignByLink, GetDesignInitByUserDesignId, getMoreDesignByDesignTypeService } from './../Services/designService';





export const GetUserDesignAction = ( UserId,Stoken,DesignLink ) => {
    return async dispatch => {
        const {data} = await GetDesignByLink( UserId,Stoken,DesignLink );
        await dispatch({type:actionType.USER_DESIGN,payload:data});

    }
}

export const GetUserDesignOverrideAction = ( UserId,Stoken,DesignLink ) => {
    return async dispatch => {
        const {data} = await GetDesignByLink( UserId,Stoken,DesignLink );
        await dispatch({type:actionType.USER_DESIGN,payload:data});

    }
}

export const GetUserDesignINITAction = ( UserId,Stoken,DesignId ) => {
    return async dispatch => {
        const {data} = await GetDesignInitByUserDesignId( UserId,Stoken,DesignId );
        await dispatch({type:actionType.INIT,payload:data});

    }
}


export const LoadMoreStoreDesignAction = (object) => ({
    type: actionType.DESIGN,
    payload: object,

});



export const SetUserDesignAction = (object) => ({
    type: actionType.USER_NEW_DESIGN,
    payload: object,

});


export const UpdateGlobalUserDesignAction = (array) => ({
    type: actionType.OVERRIDE_DESIGN,
    payload: array,

});



export const LoadMoreStoreDesignForFirstTimeAction = ( Stoken,DesignTypeId,Page,UserId ) => {
    return async dispatch => {
        const {data} = await getMoreDesignByDesignTypeService( Stoken,DesignTypeId,Page,UserId );
        await dispatch({type:actionType.DESIGN,payload:data});

    }
}