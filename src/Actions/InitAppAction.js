import * as actionType from "./../actionTypes";



export const updateInitAppAction = (newVariable) => ({
    type: actionType.INIT,
    payload: newVariable,
});



export const setChangeDesignAction = (id) => ({
    type: actionType.CHANGE_CURRENT_DESIGN,
    payload: id,
});



export const setStartEnableNewDesign = (save) => ({
    type: actionType.DESIGN_MANAGER_SAVE_CONTROL,
    payload: save,
});



export const setChangeLastDesignLength = (number) => ({
    type: actionType.LAST_DESIGN_NUMBER,
    payload: number,
});


export const updateSettingAction = (newSettings) => ({
    type: actionType.SETTINGS,
    payload: newVariable,
});


export const updateObjects = (object) => ({
    type: actionType.SET_OBJECTS,
    payload: object,
});


export const updateHistory = (object) => ({
    type: actionType.ADD_HISTORY,
    payload: object,

});



export const setActiveObject = (id) => ({
    type: actionType.SET_OBJECT_ID,
    payload: id,
});

export const setSelectionObjects = (objects) => ({
    type: actionType.SET_SELECTION_OBJECTS,
    payload: objects,
});



export const updateSVGLogos = (logos) => ({
    type: actionType.ADD_SVG_LOGOS,
    payload: logos,

});

export const setPopup = (object) => ({
    type: actionType.SET_POPUP,
    payload: object,

});

export const setAssetTab = (tab) => ({
    type: actionType.SET_ASSET_TAB,
    payload: tab,

});


//CONTROLL LOADER FROM DISPATCHS
export const setAllAssetTabLoaderControl = (control) => ({
    type: actionType.SET_ALL_ASSET_TAB_LOADER,
    payload: control,

});


export const setUserDesignLoaderControl = (control) => ({
    type: actionType.SET_USERDESIGN_LOADER,
    payload: control,

});



export const setCanvasLoaderControl = (control) => ({
    type: actionType.SET_CANVAS_LOADER,
    payload: control,

});





//CONTOROL ALL MODLAS 

export const setModalPublishDesignStore = (parameter) => ({
    type: actionType.SET_STORE_PUBLISH_MODAL,
    payload: parameter,

});

export const setModalMessageForPublishStore = (parameter) => ({
    type: actionType.SET_MESSAGE_PUBLISH_MODAL,
    payload: parameter,

});

export const setModalAddDesignCollection = (parameter) => ({
    type: actionType.SET_ADD_COLLECTION_MODAL,
    payload: parameter,

});

export const setExportModalAction = (parameter) => ({
    type: actionType.SET_EXPORT_MODAL,
    payload: parameter,

});


export const setShowModalAllChildrenDesign = (parameter) => ({
    type: actionType.SET_SHOW_DESIGNS_MODAL,
    payload: parameter,

});

export const ChangeDesignIndexAction = (parameter) => ({
    type: actionType.CHANGE_INDEX_DESIGN,
    payload: parameter,

});



export const setEditTextBoxContentModalAction = (parameter) => ({
    type: actionType.SET_EDIT_TEXTBOX_CONTENT_MODAL,
    payload: parameter,

});
