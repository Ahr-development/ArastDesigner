
import * as actionType from "./../actionTypes";

let initialState = {
    StorePublishModal: false,
    ResultStorePublishModal: 0,
    MessgeForPublishDesign: false,
    AddDesignCollectionModal: false,
    ResultAddCollectionModal: 0,
    ExportDesignModal: false,
    ShowAllUserDesignsModal: false,
    EditTextBoxContentModal: false,
    TextBoxIdChangeContent : 0,
};



export const ModalControlReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.SET_STORE_PUBLISH_MODAL:
            return {
                ...state,
                StorePublishModal: action.payload.StorePublishModal,
                ResultStorePublishModal: action.payload.ResultStorePublishModal
            };

        case actionType.SET_MESSAGE_PUBLISH_MODAL:
            return {
                ...state,
                MessgeForPublishDesign: action.payload,
            };



            case actionType.SET_ADD_COLLECTION_MODAL:
                return {
                    ...state,
                    AddDesignCollectionModal: action.payload.AddDesignCollectionModal,
                    ResultAddCollectionModal: action.payload.ResultAddCollectionModal,

                };



                case actionType.SET_EXPORT_MODAL:
                    return {
                        ...state,
                        ExportDesignModal: action.payload,
                    };
        
                    case actionType.SET_SHOW_DESIGNS_MODAL:
                        return {
                            ...state,
                            ShowAllUserDesignsModal: action.payload,
                        };
            
                        case actionType.SET_EDIT_TEXTBOX_CONTENT_MODAL:
                            return {
                                ...state,
                                EditTextBoxContentModal: action.payload.EditTextBoxContentModal,
                                TextBoxIdChangeContent : action.payload.TextBoxIdChangeContent
                            };
        default:
            return state;
    }
}