import * as actionType from "./../actionTypes";



const initialState = {
    uploads: [],
    userFilesLinks: [],
    pages: {
        uploadPage: 1,
    },

    upload: false,

};



export const UserUploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.USER_UPLOADS:
            return {
                ...state,
                uploads: action.payload,
            };

        case actionType.USER_UPLOADS_FILES_LINKS:
            return {
                ...state,
                userFilesLinks: action.payload,
            };

        case actionType.USER_OVVERIDE_UPLOADS_FILES_LINKS:
            return {
                ...state,
                userFilesLinks: [...state.userFilesLinks, ...action.payload],
            };
        default:
            return state;
    }
}