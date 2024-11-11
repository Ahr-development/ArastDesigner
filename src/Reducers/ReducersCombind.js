import { combineReducers } from "redux";
import InitAppReducer from './InitAppReducer';
import SettingsReducer from "./SettingsReducer";
import { HistoryReducer } from "./HistoryReducer";
import { ObjectReducer } from "./ObjectReducer";
import { FontsReducer } from "./FontsReducer";
import { SVGReducer } from "./SVGReducer";
import { PopupReducer } from "./PopupReducer";
import { AssetTabReducer } from "./AssetTabReducer";
import { UserReducer } from "./UserReducer";
import { UserUploadReducer } from "./UserUploadReducer";
import { AssetsReducer } from "./AssetsReducer";
import { LoaderActionsReducer } from "./LoaderActionsReducer";
import { UserDesignReducer } from "./UserDesignReducer";
import { AssetCategoryReducer } from "./AssetCategoryReducer";
import { ModalControlReducer } from "./ModalControlReducer";
import { StoreReducer } from "./StoreReducer";
import { DesignReducer } from "./DesignReducer";
import { StoreDesignReducer } from "./StoreDesignReducer";
import { DesignCollectionReducer } from "./DesignCollectionReducer";
import { DesignChangeControlReducer } from "./DesignChangeControlReducer";
import { DesignIndexReducer } from "./DesignIndexReducer";




export const reducers = combineReducers({
    InitApp : InitAppReducer,
    ISettings : SettingsReducer,
    IHistory:HistoryReducer,
    IObject:ObjectReducer,
    IFonts:FontsReducer,
    ISVG : SVGReducer,
    IPopup : PopupReducer,
    IAssetTab : AssetTabReducer,
    IUser : UserReducer,
    IUserUpload : UserUploadReducer,
    IAssets : AssetsReducer,
    IControlLoaders : LoaderActionsReducer,
    IDesign : UserDesignReducer,
    IAssetCategories : AssetCategoryReducer,
    IModal : ModalControlReducer,
    IStore : StoreReducer,
    IStoreDesign : StoreDesignReducer,
    IArastDesign : DesignReducer,
    IDesignCollection : DesignCollectionReducer,
    IDesignController : DesignChangeControlReducer,
    IIndex : DesignIndexReducer

});
