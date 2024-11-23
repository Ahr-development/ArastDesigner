

import { store } from "../Store/Store";
const state = store.getState();
const app = state.InitApp;
const settings = state.ISettings;







//متد اول اجرایی
export function InitCanva() {



  const canvasWrapElement = document.getElementById("Arast-canvas-wrap");
  canvasWrapElement.draggable = false;
  app.c = document.querySelector('#Arast-canvas')[0];
  app.canvas = new fabric.Canvas(app.c);


  fabric.enableGLFiltering = settings.enableGLFiltering;
  fabric.textureSize = parseInt(settings.textureSize);
  fabric.Object.prototype.borderColor = settings.borderColor;
  fabric.Object.prototype.borderDashArray = settings.borderDashArray;
  fabric.Object.prototype.borderOpacityWhenMoving = settings.borderOpacityWhenMoving;
  fabric.Object.prototype.borderScaleFactor = settings.borderScaleFactor;
  fabric.Object.prototype.editingBorderColor = settings.editingBorderColor;
  fabric.Object.prototype.cornerColor = settings.cornerColor;
  fabric.Object.prototype.cornerSize = settings.cornerSize;
  fabric.Object.prototype.cornerStrokeColor = settings.cornerStrokeColor;
  fabric.Object.prototype.cornerStyle = settings.cornerStyle;
  fabric.Object.prototype.transparentCorners = settings.transparentCorners;
  fabric.Object.prototype.cursorColor = settings.cursorColor;
  fabric.Object.prototype.cursorWidth = settings.cursorWidth;
  fabric.Object.prototype.strokeUniform = true;
  fabric.Group.prototype.padding = 0;
  fabric.Object.prototype.erasable = false;


  /* Create Canvas */
  app.c = document.querySelector('#Arast-canvas');
  app.canvas = new fabric.Canvas(app.c);
  app.canvas.backgroundColor = settings.canvasColor;

        // Delete object control
   
}



//کاربرد
// ست کردن مقادیر ورودی ها ( صرفا نمایشی )
var setDimentions = function (e) {
  //const resizeWidthInput = document.getElementById('Arast-resize-width'); //
  //const resizeHeightInput = document.getElementById('Arast-resize-height'); //
  const imgWidthElement = document.getElementById('Arast-img-width');
  const imgHeightElement = document.getElementById('Arast-img-height');
  //const cropWidthInput = document.getElementById('Arast-crop-width');  //
  //const cropHeightInput = document.getElementById('Arast-crop-height'); //


  //console.log(resizeWidthInput,resizeHeightInput,imgWidthElement,imgHeightElement,cropWidthInput,cropHeightInput);


  //resizeWidthInput.value = Math.round(e.width);
  //resizeHeightInput.value = Math.round(e.height);
  imgWidthElement.textContent = Math.round(e.width);
  imgHeightElement.textContent = Math.round(e.height);
  //cropWidthInput.value = Math.round(e.width / 2);
  //cropHeightInput.value = Math.round(e.height / 2);

  //resizeWidthInput.dataset.size = Math.round(e.width);
  //resizeHeightInput.dataset.size = Math.round(e.height);

  if (app.mode === 'image') {
    //cropWidthInput.dataset.max = Math.round(e.width);
    //cropHeightInput.dataset.max = Math.round(e.height);
  }
};

/* Init */
//متد دوم اجرایی
export function init(getMode) {
  app.rotate = 0;

  // Find elements
  const canvasLoader = document.getElementById('Arast-canvas-loader');
  const canvasWrap = document.getElementById('Arast-canvas-wrap');
  const contentBar = document.querySelector('.Arast-content-bar');
  //const canvasColorInput = document.getElementById('Arast-canvas-color');
  //const canvasWidthInput = document.getElementById('Arast-canvas-width');
  //const canvasHeightInput = document.getElementById('Arast-canvas-height');
  const canvasImage = document.getElementById('Arast-canvas-img');
  //const canvasImageWrap = document.getElementById('Arast-canvas-img-wrap');

  // Set initial visibility
  canvasLoader.style.display = 'flex';
  canvasWrap.style.visibility = 'visible';
  contentBar.style.visibility = 'visible';

  const mode = getMode;
  let filters;
  if (app.canvas.backgroundImage) {
    filters = app.canvas.backgroundImage.filters;
  }

  // Canvas mode ('canvas')
  if (mode === 'canvas') {
    //canvasColorInput.dispatchEvent(new Event('change')); // Simulate change event

    const newCanvas = document.createElement('canvas');
    const canvas2 = new fabric.Canvas(newCanvas);
    let canvas2Width = app.originalWidth
    let canvas2Height = app.originalHeight
    canvas2Width = canvas2Width || 800; // Set default if empty
    canvas2Height = canvas2Height || 800; // Set default if empty

    canvas2.setWidth(canvas2Width);
    canvas2.setHeight(canvas2Height);
    canvas2.backgroundColor = 'white';


    canvas2.dispose();
  }


  const imageLoaded = () => {


    // Image has loaded - proceed with your logic
    const imgurl = canvasImage.src;
    const originalWidth =  app.originalWidth;
    const originalHeight = app.originalHeight;
 /*    app.originalWidth = canvasImage.width
    app.originalHeight = canvasImage.height */

    // Display image dimentions
    setDimentions(canvasImage);

    app.canvas.setDimensions({ width: originalWidth, height: originalHeight });


    adjustZoom();
    //modeCheck();

    setTimeout(function () {
      //reset();
      //addToHistory('<span class="material-icons">flag</span>' + ArastParams.started);
    }, 100);

    canvasImage.style.display = 'block'; // Assuming you want to display the image after loading
  };

  if (canvasImage.complete) {
    // Image is already loaded
    imageLoaded();
  } else {
    canvasImage.onload = imageLoaded;
  }

  canvasLoader.style.display = 'none';



}




export function adjustZoom(zoom) {

  var zoomWidth = app.originalWidth
  var zoomHeight = app.originalHeight
  if (app.rotate == 0 || app.rotate == 180 || app.rotate == -180) {
    zoomWidth = zoomWidth;
    zoomHeight = zoomHeight;
  }
  if (zoom) {
    zoom = zoom / 100;
    app.canvas.setZoom(zoom);
  } else {
    var currentZoom = document.getElementById('Arast-img-zoom').value;
    var requiredRatio = 100;
    var ratio = 1;
    var ratio2 = 0;
    if (zoomWidth < document.getElementById('Arast-content').offsetWidth && zoomHeight < document.getElementById('Arast-content').offsetHeight) {
      app.canvas.setZoom(1);
      document.getElementById('Arast-img-zoom').value = 100;
    } else {
      if (zoomWidth > document.getElementById('Arast-content').offsetWidth) {
        ratio = (document.getElementById('Arast-content').offsetWidth - 60) / zoomWidth;
        requiredRatio = ratio.toFixed(2) * 100;
        if (currentZoom > requiredRatio) {
          app.canvas.setZoom(ratio.toFixed(2));
          document.getElementById('Arast-img-zoom').value = ratio.toFixed(2) * 100;
          ratio2 = ratio.toFixed(2);
        }

      }
      if (zoomHeight > document.getElementById('Arast-content').offsetHeight) {
        ratio = document.getElementById('Arast-content').offsetHeight / zoomHeight;
        requiredRatio = ratio.toFixed(2) * 100;
        if (currentZoom > requiredRatio) {
          if (ratio2 === 0 || ratio2 > ratio.toFixed(2)) {
            app.canvas.setZoom(ratio.toFixed(2));
            document.getElementById('Arast-img-zoom').value = ratio.toFixed(2) * 100;
          }
        }
      }
    }
  }

  app.canvas.setWidth(zoomWidth * app.canvas.getZoom());
  app.canvas.setHeight(zoomHeight * app.canvas.getZoom());
  if (app.canvas.isDrawingMode === true) {
    if (document.getElementById('Arast-erase-btn').hasClass('active')) {
      document.getElementById('eraser-width').trigger('input');
    }
    if (document.getElementById('Arast-draw-btn').hasClass('active')) {
      document.getElementById('brush-width').trigger('input');
    }
  }



}





export function adjustZoomValue(zoom) {

  var zoomWidth = app.originalWidth
  var zoomHeight = app.originalHeight
  if (app.rotate == 0 || app.rotate == 180 || app.rotate == -180) {
    zoomWidth = zoomWidth;
    zoomHeight = zoomHeight;
  }
  if (zoom) {
    zoom = zoom / 100;

  } else {
    var currentZoom = document.getElementById('Arast-img-zoom').value;
    var requiredRatio = 100;
    var ratio = 1;
    var ratio2 = 0;
    if (zoomWidth < document.getElementById('Arast-content').offsetWidth && zoomHeight < document.getElementById('Arast-content').offsetHeight) {
      document.getElementById('Arast-img-zoom').value = 100;
    } else {
      if (zoomWidth > document.getElementById('Arast-content').offsetWidth) {
        ratio = (document.getElementById('Arast-content').offsetWidth - 60) / zoomWidth;
        requiredRatio = ratio.toFixed(2) * 100;
        if (currentZoom > requiredRatio) {
          document.getElementById('Arast-img-zoom').value = ratio.toFixed(2) * 100;
          ratio2 = ratio.toFixed(2);
        }

      }
      if (zoomHeight > document.getElementById('Arast-content').offsetHeight) {
        ratio = document.getElementById('Arast-content').offsetHeight / zoomHeight;
        requiredRatio = ratio.toFixed(2) * 100;
        if (currentZoom > requiredRatio) {
          if (ratio2 === 0 || ratio2 > ratio.toFixed(2)) {
            document.getElementById('Arast-img-zoom').value = ratio.toFixed(2) * 100;
          }
        }
      }
    }
  }

  if (app.canvas.isDrawingMode === true) {
    if (document.getElementById('Arast-erase-btn').hasClass('active')) {
      document.getElementById('eraser-width').trigger('input');
    }
    if (document.getElementById('Arast-draw-btn').hasClass('active')) {
      document.getElementById('brush-width').trigger('input');
    }
  }



}

/* 
export function setDimensions(e) {
  // Round the width and height values
  const width = Math.round(e.width);
  const height = Math.round(e.height);

  // Update the values of input fields
  document.querySelector('#Arast-resize-width').value = width;
  document.querySelector('#Arast-resize-height').value = height;

  // Update the content of elements
  document.querySelector('#Arast-img-width').textContent = width;
  document.querySelector('#Arast-img-height').textContent = height;

  // Set initial crop dimensions (half of the image dimensions)
  document.querySelector('#Arast-crop-width').value = Math.round(width / 2);
  document.querySelector('#Arast-crop-height').value = Math.round(height / 2);

  // Store initial dimensions as data attributes
  document.querySelector('#Arast-resize-width').dataset.size = width;
  document.querySelector('#Arast-resize-height').dataset.size = height;

  // Handle image mode (optional, adapt based on your logic)
  if (mode === 'image') {
    document.querySelector('#Arast-crop-width').dataset.max = width;
    document.querySelector('#Arast-crop-height').dataset.max = height;
  }
}



 */







function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
// Convert to data url
export function convertToDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

export function getScaledSize() {
  var width = 1080;
  var height = 1080;
  if (app.rotate == 0 || app.rotate == 180 || app.rotate == -180) {
    width = app.canvas.backgroundImage.getScaledWidth();
    height = app.canvas.backgroundImage.getScaledHeight();
  }
  return [width, height];
}
/* 


export function toggleDragging(enable) {
  const canvasWrap = document.getElementById('Arast-canvas-wrap');
  canvasWrap.selectable = enable; // Allow object selection for dragging

  if (enable) {
    app.canvas.on('mouse:down', function(e) {
      if (e.target === canvasWrap) {
        // Start dragging
        app.canvas.isDragging = true;
        app.canvas.lastPosX = e.clientX;
        app.canvas.lastPosY = e.clientY;
      }
    });

    app.canvas.on('mouse:move', function(e) {
      if (app.canvas.isDragging) {
        // Update position based on mouse movement
        const deltaX = e.clientX - app.canvas.lastPosX;
        const deltaY = e.clientY - app.canvas.lastPosY;
        canvasWrap.set('left', canvasWrap.left + deltaX);
        canvasWrap.set('top', canvasWrap.top + deltaY);
        app.canvas.renderAll();
        app.canvas.lastPosX = e.clientX;
        app.canvas.lastPosY = e.clientY;
      }
    });

    // Additional event handling for drag release, etc.
  } else {
    // Disable dragging
    app.canvas.isDragging = false;
    app.canvas.off('mouse:down');
    app.canvas.off('mouse:move');
    // Additional event cleanup
  }
}

 */




export function deleteLayerEvent(id) {
  const item = document.getElementById(id); // Corrected selector (assuming IDs don't contain spaces)

  if (item) {
    const deleteLink = item.querySelector('a.delete-layer');

    if (deleteLink) {
      deleteLink.addEventListener('click', (event) => {
        event.preventDefault();

        app.canvas.fire('Arast:history', { type: item.dataset.type, text: ArastParams.removed });

        const objects = canvas.getObjects();
        const objectsToRemove = objects.filter(element => element.id === id);
        objectsToRemove.forEach(element => app.canvas.remove(element));

        item.remove();
        app.canvas.requestRenderAll();

        // Assuming sortable is a library or functionality you have:
        if (typeof document.getElementById('Arast-layers').sortable === 'function') {
          document.getElementById('Arast-layers').sortable('refresh');
        }

        checkLayers();
      });
    } else {
      console.warn(`Delete link not found for layer: ${id}`);
    }
  } else {
    console.warn(`Layer with ID ${id} not found`);
  }

}




export function cloneLayerEvent(id) {
  const item = document.getElementById(id); // Corrected selector (assuming IDs don't contain spaces)

  if (item) {
    const duplicateLink = item.querySelector('a.duplicate-layer');

    if (duplicateLink) {
      duplicateLink.addEventListener('click', (event) => {
        event.preventDefault();

        const objects = canvas.getObjects();
        const objectsToClone = objects.filter(element => element.id === id);

        objectsToClone.forEach(element => {
          element.clone((cloned) => {
            cloned.set('id', new Date().getTime());
            cloned.set('objectType', element.objectType);
            app.canvas.add(cloned);
            app.canvas.setActiveObject(cloned);
          });
        });

        app.canvas.requestRenderAll();

        // Assuming sortable is a library or functionality you have:
        if (typeof document.getElementById('Arast-layers').sortable === 'function') {
          document.getElementById('Arast-layers').sortable('refresh');
        }

        app.canvas.fire('Arast:history', { type: item.dataset.type, text: ArastParams.added });
      });
    } else {
      console.warn(`Duplicate link not found for layer: ${id}`);
    }
  } else {
    console.warn(`Layer with ID ${id} not found`);
  }
}



export function visibilityLayerEvent(id) {
  const layerItem = document.getElementById(id);
  if (!layerItem) return; // Handle potential missing element

  const visibilityLink = layerItem.querySelector('a.layer-visibility');
  if (!visibilityLink) return; // Handle potential missing link

  visibilityLink.addEventListener('click', (event) => {
    event.preventDefault();

    const objects = app.canvas.getObjects();
    const matchingObject = objects.find(element => element.id === id);
    if (!matchingObject) return; // Handle potential missing object

    if (visibilityLink.classList.contains('layer-visible')) {
      visibilityLink.classList.remove('layer-visible');
      visibilityLink.classList.add('layer-hidden');
      visibilityLink.textContent = 'visibility_off';
      matchingObject.set('visible', false);
    } else if (visibilityLink.classList.contains('layer-hidden')) {
      visibilityLink.classList.remove('layer-hidden');
      visibilityLink.classList.add('layer-visible');
      visibilityLink.textContent = 'visibility';
      matchingObject.set('visible', true);
    }

    app.canvas.renderAll();
  });
}



export function lockLayerEvent(id) {
  const layerItem = document.getElementById(id);
  if (!layerItem) return; // Handle potential missing element

  const lockIcon = layerItem.querySelector('a.lock-layer');
  if (!lockIcon) return; // Handle potential missing icon

  lockIcon.addEventListener('click', (event) => {
    event.preventDefault();

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return; // Handle potential missing object

    if (lockIcon.classList.contains('layer-unlocked')) {
      lockIcon.classList.remove('layer-unlocked');
      lockIcon.classList.add('layer-locked');
      lockIcon.textContent = 'lock';
      activeObject.set({
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        selectable: false
      });
    } else if (lockIcon.classList.contains('layer-locked')) {
      lockIcon.classList.remove('layer-locked');
      lockIcon.classList.add('layer-unlocked');
      lockIcon.textContent = 'lock_open';
      activeObject.set({
        lockMovementX: false,
        lockMovementY: false,
        lockRotation: false,
        selectable: true
      });
    }

    app.canvas.renderAll();
  });
}


export function clickLayerEvent(id) {
  const layerItem = document.getElementById(id);
  if (!layerItem) return; // Handle potential missing element

  layerItem.addEventListener('click', (event) => {
    const objects = app.canvas.getObjects();
    const clickedElementId = event.currentTarget.id; // Access ID from clicked element

    const matchingObject = objects.find(element => element.id === clickedElementId);
    if (matchingObject) {
      app.canvas.setActiveObject(matchingObject);
    }

    const layerList = document.getElementById('Arast-layers');
    layerList.querySelectorAll('li').forEach(listItem => listItem.classList.remove('active'));
    layerItem.classList.add('active');
    const selectedLayer = document.getElementById(id);

    app.canvas.renderAll();


  });
}


export function layerNameEvent(id) {
  const layerItem = document.getElementById(id);

  if (!layerItem) return; // Handle potential missing element

  const layerNameInput = layerItem.querySelector('.layer-name');
  layerNameInput.addEventListener('change', (event) => {
    const objects = app.canvas.getObjects();
    const clickedElementId = event.currentTarget.id; // Access ID from clicked element

    const matchingObject = objects.find(element => element.id === clickedElementId);
    if (matchingObject) {
      matchingObject.set({ layerName: event.target.value });
    }
  });

}



export function checkLayers() {
  const layersList = document.getElementById('Arast-layers');
  const noLayerElement = document.getElementById('Arast-no-layer');
  const deleteWrapperElement = document.getElementById('Arast-layer-delete-wrap');

  if (!layersList.querySelectorAll('li').length) {
    noLayerElement.style.display = 'block';
    //deleteWrapperElement.style.visibility = 'hidden';
  } else {
    noLayerElement.style.display = 'none';
    //deleteWrapperElement.style.visibility = 'visible';
  }
}





export function loadJSON(json) {
  // Show canvas loader
  document.getElementById('Arast-canvas-loader').style.display = 'flex';

  // Extract properties from JSON
  const rotate = json.backgroundImage.angle;
  const scaleX = json.backgroundImage.scaleX;
  const scaleY = json.backgroundImage.scaleY;
  const originX = json.backgroundImage.originX;
  const originY = json.backgroundImage.originY;
  //const canvas = document.getElementById('canvas'); // Assuming canvas has this ID

  // Clear canvas and remove existing layers
  app.canvas.clear();
  const layersList = document.getElementById('Arast-layers');
  while (layersList.firstChild) {
    layersList.removeChild(layersList.firstChild);
  }

  const mode = json.backgroundImage.mode;
  // Convert data URL to blob and create image URL
  //const blob = dataURLtoBlob(json.backgroundImage.src);
  //const imgurl = URL.createObjectURL(blob);
  //document.getElementById('Arast-canvas-img').src = imgurl;

  const originalWidth = json.backgroundImage.width;
  const originalHeight = json.backgroundImage.height;
  const dimensions = { width: originalWidth, height: originalHeight };

  // Update font family for textboxes
  for (let i = 0; i < json.objects.length; i++) {
    if (json.objects[i].objectType === 'textbox') {
      json.objects[i].fontFamily += '-Arast';
    }
  }

  // Load JSON into canvas and handle callbacks
  app.canvas.loadFromJSON(json, function () {
    const objects = app.canvas.getObjects();
    const textboxes = objects.filter(element => element.objectType === 'textbox');
    //loadTemplateFonts(textboxes);
    checkLayers();

    // Set color pickers
    //document.getElementById('Arast-canvas-color').spectrum.set(app.canvas.backgroundColor);
    //document.getElementById('custom-image-background').spectrum.set(app.canvas.backgroundColor);

    const img = document.getElementById('Arast-canvas-img');
    app.canvas.requestRenderAll();

    // Hide loader, update filename, dimensions, zoom, and mode
    setFileName(new Date().getTime(), '');
    setDimentions(dimensions);
    adjustZoom();
    modeCheck();

    app.canvas.dispatchEvent(new Event('selection:cleared'));

    // Adjust layer list and filters after a slight delay
    setTimeout(function () {
      const layers = document.querySelectorAll('#Arast-layers > li');
      for (const layer of layers) {
        layer.classList.remove('active');
      }
      adjustFilterControls(json.backgroundImage.filters);
    }, 100);
  }, function () { }, { crossOrigin: 'anonymous' });
}





export function adjustElementWidth() {
  const screenWidth = screen.width;
  const controller = document.getElementById("arast-canvas-controller");

  if (screenWidth < 576) {
    controller.style.marginRight = "0px";
  } 
}

