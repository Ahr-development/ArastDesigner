
import { GetAllUploads } from "../Services/userService";
import * as actionType from "./../actionTypes";




export const SetCurrentUserSignIn = (user) => ({
    type: actionType.SET_USER,
    payload: user,
});




export const UserUploadsAction = (UserId,Stoken,Page) => {
    return async dispatch => {
        const {data} = await GetAllUploads(UserId,Stoken,Page);
        await dispatch({type:actionType.USER_UPLOADS,payload:data});

    }
}



export const SetUserUploadsFilesLinkAction = (files) => ({
    type: actionType.USER_UPLOADS_FILES_LINKS,
    payload: files,
});



export const SetOverrideUserUploadsFilesLinkAction = (files) => ({
    type: actionType.USER_OVVERIDE_UPLOADS_FILES_LINKS,
    payload: files,
});


export const SetUploadsAction = (files) => ({
    type: actionType.USER_UPLOADS,
    payload: files,
});

