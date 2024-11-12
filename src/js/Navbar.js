
import { updateHistory } from "../Actions/InitAppAction";
import { store } from "../Store/Store";
const state = store.getState();
const app = state.InitApp;
const settings = state.ISettings;




export function objectName(type) {
    var layerName = ArastParams.object;
    var layerIcon = 'category';
    if (type == null) {
        layerName = ArastParams.object;
        layerIcon = 'category';
    } else if (type == 'textbox') {
        layerName = ArastParams.text; 
        layerIcon = 'title';
    } else if (type == 'drawing') {
        layerName = ArastParams.freeDrawing; 
        layerIcon = 'brush';
    } else if (type == 'frame') {
        layerName = ArastParams.frame; 
        layerIcon = 'wallpaper';
    } else if (type == 'image') {
        layerName = ArastParams.image; 
        layerIcon = 'image';
    } else if (type == 'circle') {
        layerName = ArastParams.circle;
    } else if (type == 'square') {
        layerName = ArastParams.square;
    } else if (type == 'rectangle') {
        layerName = ArastParams.rectangle;
    } else if (type == 'triangle') {
        layerName = ArastParams.triangle;
    } else if (type == 'ellipse') {
        layerName = ArastParams.ellipse;
    } else if (type == 'trapezoid') {
        layerName = ArastParams.trapezoid;
    } else if (type == 'emerald') {
        layerName = ArastParams.emerald;
    } else if (type == 'star') {
        layerName = ArastParams.star;
    } else if (type == 'element') {
        layerName = ArastParams.element;
        layerIcon = 'star';
    } else if (type == 'BG') {
        layerName = ArastParams.bg; 
        layerIcon = 'image';
    } else if (type == 'customSVG') {
        layerName = ArastParams.customSvg;
    } else if (type == 'qrCode') {
        layerName = ArastParams.qrCode;
        layerIcon = 'qr_code';
    }
    //return '<span class="material-icons">' + layerIcon + '</span>' + layerName;
    return [layerIcon,layerName]
}




export function addToHistory(layerName,icon,action) {
    const today = new Date();
    const time = today.getHours().toString().padStart(2, '0') + ":" +
        today.getMinutes().toString().padStart(2, '0') + ":" +
        today.getSeconds().toString().padStart(2, '0');

    const json = app.canvas.toJSON(['objectType', 'gradientFill', 'roundedCorders', 'mode', 'selectable', 'lockMovementX', 'lockMovementY', 'lockRotation', 'crossOrigin', 'layerName']);
    return {
        id : Math.floor(Math.random() * 90000) + 10000,
        action,
        layerName,
        icon,
        time,
        json
    }
    
}
