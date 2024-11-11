
import * as actionType from "./../actionTypes";

const initialState = {
    fontFamily: "MainFont",
    fontSize: 60,
    fontWeight: 'normal',
    fontStyle: 'normal',
    canvasColor: 'transparent', //رنگ ادیتور
    fill: '#000',
    stroke: '#fff',
    strokeWidth: 0,
    textBackgroundColor: 'rgba(255,255,255,0)',
    textAlign: 'center',
    lineHeight: 1.2,
    borderColor: '#000',
    borderDashArray: [4, 4],
    borderOpacityWhenMoving: 0.5,
    borderScaleFactor: 2, //سایز بردار دور آبجکت
    editingBorderColor: 'rgba(0,0,0,0.5)',
    cornerColor: '#fff',
    cornerSize: 12,
    cornerStrokeColor: '#000',
    cornerStyle: 'circle',
    transparentCorners: false,
    cursorColor: '#000',
    cursorWidth: 2,
    enableGLFiltering: true,
    textureSize: 4096,

    customFunctions: function() {},
    saveTemplate: function() {},
    saveImage: function() {}
  };
  
  const SettingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.SETTINGS:
        return [...action.payload];
      default:
        return state;
    }
  };
  
  export default SettingsReducer;