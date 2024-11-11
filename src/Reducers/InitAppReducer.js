
import * as actionType from "./../actionTypes";

const initialState = {
  c: '', // HTML CANVAS
  mode: 'none', // تعیین نامعین مد بارگذاری INIT
  originalWidth: '',
  originalHeight: '',
  rotate: 0,
  scaleX: 1,
  scaleY: 1,
  originX: 'left',
  originY: 'top',
  canvas: '',
  currentActiveDesign : 0
};

const InitAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.INIT:
      return { ...action.payload };


    case actionType.OTHER_USER_DESIGNS:
      return {
        ...state,
        designs: action.payload,
      };


    default:
      return state;
  }
};

export default InitAppReducer;