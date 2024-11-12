import { GetStoreByUserId, GetStoreDesignByLinkService, GetStoreDesignCollectionByStoreIdService, StorePublishDesignService } from "../Services/storeService";
import * as actionType from "./../actionTypes";





export const GetStoreAction = ( UserId,Stoken ) => {
    return async dispatch => {
        const {data} = await GetStoreByUserId( UserId,Stoken );
        
        await dispatch({type:actionType.STORE,payload:data});

    }
}


export const GetStoreDesignAction = ( DesignLink,Stoken ) => {
    return async dispatch => {
        const {data} = await GetStoreDesignByLinkService( DesignLink,Stoken );
        
        await dispatch({type:actionType.STORE_DESIGN,payload:data});

    }
}



export const GetStoreDesignCollectionAction = ( StoreId,Stoken ) => {
    return async dispatch => {
        const {data} = await GetStoreDesignCollectionByStoreIdService( StoreId,Stoken );
        
        await dispatch({type:actionType.DESIGN_COLLECTION,payload:data});

    }
}



/* export const PublishAction = (data) => {
    return async dispatch => {
        const {data} = await StorePublishDesignService(data);
        
        await dispatch({type:actionType.STORE_DESIGN,payload:data});

    }
} */



export const PublishAction = (data) => ({
    type: actionType.STORE_DESIGN,
    payload: data,
});


