import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeDesignIndexAction, setActiveObject, setChangeDesignAction, setChangeLastDesignLength, setSelectionObjects, setStartEnableNewDesign, updateHistory, updateInitAppAction } from "../../Actions/InitAppAction";
import { setFileName } from "../../js/Arast";
import { InitCanva, adjustElementWidth, adjustZoom, adjustZoomValue, checkLayers, clickLayerEvent, cloneLayerEvent, deleteLayerEvent, init, layerNameEvent, lockLayerEvent, visibilityLayerEvent } from "../../js/SetupEditor";
import Draggable from 'react-draggable';
import Layer from "../LeftSideBar/Layer";
import { addToHistory, objectName } from "../../js/Navbar";
import { GetUserDesignAction } from "../../Actions/DesignAction";
import { debouncedSaveDesign } from "../../utils/SaveDesign";
import config from '../../Services/config.json'
import { FontManager } from "../../js/FontManager";




const Canvas = ({ link }) => {

  const app = useSelector((state) => state.InitApp);
  const design = useSelector((state) => state.IDesign);
  const user = useSelector((state) => state.IUser);
  const fonts = useSelector((state) => state.IFonts);
  const designManager = useSelector((state) => state.IDesignController);
  const currentDesignIndex = useSelector((state) => state.IDesignController.CurrentActiveDesignIndex);
  const index = useSelector((state) => state.IIndex);


  const [drag, setDrag] = useState(true)
  const [ready, setReady] = useState(false)
  const [snapDistance, setSnapDistance] = useState(10)
  const [readyFonts, setReadyFonts] = useState(false)
  const [designIndex, setDesignIndex] = useState(0)
  const [selectedObject, setSelectedObject] = useState(null);
  const [zoomValue, setZoomValue] = useState(0)

  const dispatch = useDispatch()

  let snapThreshold = 10; // Threshold in pixels for snapping
  let isSnappingX = false;
  let isSnappingY = false;
  let guideLines = []; // Array to store guide lines


  function loadDesignFromUrl(url) {
    const noCath = `${url}?nocache=${new Date().getTime()}`
    fetch(noCath)
      .then(response => response.json())
      .then(json => {
        app.canvas.loadFromJSON(json, () => {
          setAllFontsForObjects(); // اینجا فراخوانی می‌شود
          app.canvas.renderAll(); // render all بعد از بارگذاری

          adjustZoom(); // Replace with your implementation
        });
      })
      .catch(error => {
        console.error('Error loading design:', error);
      });
  }




  const handleDeslectObject = () => {
    app.canvas.discardActiveObject();
    app.canvas.renderAll()
  }




  const setAllFontsForObjects = async () => {
    console.log("بارگذاری فونت در حال انجام");
    const fontsReady = [];
    const fontManager = new FontManager();
    const objects = app.canvas._objects
    console.log(objects);

    console.log(objects.length);
    // استفاده از حلقه for...of برای اطمینان از اجرای صحیح
    for (const obj of objects) {
      if (obj.type === 'text' || obj.type === 'i-text' || obj.type === 'textbox') {
        var fontObjName = obj.fontFamily;
        console.log("قسمت اول" + fontObjName);
        if (fontObjName == "MainFont" || fontObjName == "PINAR") {
          const mainFont = fonts[0];
          const random = Math.floor(Math.random() * 101);

          const fontURL = "https://arastme.storage.c2.liara.space/" + mainFont.FontFileName;
          console.log(mainFont);

          try {
            await fontManager.loadFontAndApplyToObject(mainFont.FontName + random, fontURL);
            obj.set('fontFamily', mainFont.FontName + random);
            app.canvas.requestRenderAll();
            obj.setCoords();
          } catch (error) {
            console.error('Error loading font:', error);
          }


        } else {
          for (const font of fonts) {
            const sanitizedFontName = fontObjName.replace(/\d+/g, '');
            if (font.FontName === sanitizedFontName) {
              const fontURL = "https://arastme.storage.c2.liara.space/" + font.FontFileName;
              const random = Math.floor(Math.random() * 101);
              try {
                await fontManager.loadFontAndApplyToObject(font.FontName + random, fontURL);
                obj.set('fontFamily', font.FontName + random);
                app.canvas.requestRenderAll();
                fontsReady.push(font.FontName);
                obj.setCoords();
              } catch (error) {
                console.error('Error loading font:', error);
              }
            }
          }
        }
      }
    }


    app.canvas.requestRenderAll();

  }





  useEffect(() => {


     // مدیریت رویدادهای صفحه‌کلید برای حرکت دادن و مخفی کردن کادر
     const handleKeyDown = (event) => {
      if (selectedObject) {

        let moved = false;
        switch (event.key) {
          case 'ArrowUp':
            selectedObject.top -= 1;
            moved = true;
            break;
          case 'ArrowDown':
            selectedObject.top += 1;
            moved = true;
            break;
          case 'ArrowLeft':
            selectedObject.left -= 1;
            moved = true;
            break;
          case 'ArrowRight':
            selectedObject.left += 1;
            moved = true;
            break;
          default:
            return;
        }

        if (moved) {
          // مخفی کردن کادر دور آبجکت در زمان حرکت
          selectedObject.set({
            hasControls: false,
            borderColor: 'transparent',
            cornerColor: 'transparent',
          });
          app.canvas.renderAll();
          debouncedSaveDesign(design[designManager.CurrentActiveDesignIndex].Id);

        }


      }
    };

    // مدیریت رویداد برای بازگرداندن کادر
    const handleKeyUp = () => {
      if (selectedObject) {
        selectedObject.set({
          hasControls: true,
          borderColor: 'black',
          cornerColor: 'white',
        });
        app.canvas.renderAll();
        debouncedSaveDesign(design[designManager.CurrentActiveDesignIndex].Id);

      }
    };


    if (app.canvas !== "") {
      adjustZoomValue()
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };

  }, [selectedObject])





  useEffect(() => {

    app.originalWidth = design[designManager.CurrentActiveDesignIndex].OriginalWidth
    app.originalHeight = design[designManager.CurrentActiveDesignIndex].OriginalHeight

    if (app.canvas == "") {
      InitCanva()
      init('canvas');

      // اضافه کردن رویداد 'resize' به پنجره
      window.addEventListener('resize', function () {

        adjustZoom();

      });


    }







    // Select the plus button element(s)
    const plusButtons = document.querySelectorAll('.Arast-counter .counter-plus');

    // Add event listener(s) for click event on each plus button
    plusButtons.forEach(button => {
      button.addEventListener('click', function () {
        const input = this.parentNode.querySelector('input.Arast-form-field');
        let val = parseFloat(input.value) || 0; // Handle potential non-numeric input as 0

        // Get step value (default to 1 if not set)
        const step = parseFloat(input.dataset.step) || 1;

        // Increment value, considering min and max constraints
        val = Math.max(Math.min(val + step, parseFloat(input.dataset.max) || Infinity), parseFloat(input.dataset.min) || -Infinity);

        // Update input value
        input.value = val;

        // Handle potential zoom adjustment (replace with your actual adjustZoom function)
        if (this.id === 'Arast-img-zoom-in') {
          adjustZoom(val); // Replace with your implementation
        }
      });
    });



    const minusButtons = document.querySelectorAll('.Arast-counter .counter-minus');

    minusButtons.forEach(minusButton => {
      minusButton.addEventListener('click', function () {
        const input = this.parentNode.querySelector('input.Arast-form-field');
        let val = parseInt(input.value, 10) - parseInt(input.dataset.step, 10);

        // Ensure valid integer data types
        if (isNaN(val) || isNaN(parseInt(input.dataset.max, 10)) || isNaN(parseInt(input.dataset.min, 10))) {
          console.error('Invalid data type for input values or step/min/max attributes. Using defaults.');
          val = 0;
        }

        // Handle min and max values
        val = Math.max(parseInt(input.dataset.min, 10) || 0, Math.min(val, parseInt(input.dataset.max, 10) || Infinity));

        // Ensure non-negative value
        val = Math.max(0, val);

        input.value = val;

        if (this.id === 'Arast-img-zoom-out') {
          adjustZoom(val);
        }
      });
    });
    const canvasWrap = document.getElementById('Arast-canvas-wrap');
    canvasWrap.draggable = false;


    const dragButton = document.getElementById('Arast-img-drag');

    dragButton.addEventListener('click', function () {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        document.getElementById('Arast-canvas-overlay').style.display = 'none';
        document.getElementById('Arast-canvas-wrap').draggable = false; // Assuming draggable is a custom function
        setDrag(true)

      } else {
        this.classList.add('active');
        document.getElementById('Arast-canvas-overlay').style.display = 'block';
        document.getElementById('Arast-canvas-wrap').draggable = true; // Assuming draggable is a custom function
        setDrag(false)

      }
    });




    const handleKeyDown = (event) => {
      if (event.key === 'Delete') {
        let active = app.canvas.getActiveObject()
        if (active) {
          app.canvas.remove(active);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };




  }, [])




  useEffect(() => {
    adjustZoom()
  },[drag])










  useEffect(() => {
    const widthShow = document.getElementById("Arast-img-width");
    const heightShow = document.getElementById("Arast-img-height");

    // به‌روزرسانی اندازه‌ها
    const updateDimensions = () => {
      const currentDesign = design[designManager.CurrentActiveDesignIndex];
      if (currentDesign) {
        widthShow.innerHTML = currentDesign.OriginalWidth;
        heightShow.innerHTML = currentDesign.OriginalHeight; // اصلاح مقدار ارتفاع
      }
    };





    // شروع به‌روزرسانی اندازه‌ها
    updateDimensions();

    if (!ready) {



      const handleObjectAdded = (event) => {
        const obj = event.target;

        // جلوگیری از اضافه شدن خطوط راهنما به لیست لایه‌ها
        if (obj.isGuideLine) return;

        // سایر کدها...
        if (obj.objectType !== 'clipPath' && obj.objectType !== 'drawing' && obj.objectType !== 'watermark') {
          if (app.canvas.isDrawingMode === true) {
            obj.set('objectType', 'drawing');
            obj.set('selectable', false);
            obj.set('lockMovementX', true);
            obj.set('lockMovementY', true);
            obj.set('lockRotation', true);
          } else {
            const order = app.canvas.getObjects().indexOf(obj);
            let layerName = "المنت";
            let layerIcon = 'category';
            let visibility = 'layer-visible';
            let visibilityTag = 'visibility';
            let lock = 'layer-unlocked';
            let lockTag = 'lock_open';

            if (obj.type == "textbox") {
              layerName = obj.text;
              layerIcon = 'title';
            }

            if (obj.visible === false) {
              visibility = 'layer-hidden';
              visibilityTag = 'visibility_off';
            }

            if (obj.selectable === false) {
              lock = 'layer-locked';
              lockTag = 'lock';
            }

            obj.set('id', new Date().getTime());

            // Remove active class from all layer
            document.getElementById('Arast-layers').querySelectorAll('li').forEach(li => li.classList.remove('active'));

            if (obj.objectType === 'textbox') {
              layerName = obj.text;
              layerIcon = 'title';
            } else if (obj.objectType === 'drawing') {
              layerName = ArastParams.freeDrawing;
              layerIcon = 'brush';
            } else if (obj.objectType === 'frame') {
              layerName = ArastParams.frame;
              layerIcon = 'wallpaper';
            } else if (obj.objectType === 'image') {
              layerName = ArastParams.image;
              layerIcon = 'image';
            }

            if ("layerName" in obj) {
              layerName = obj.layerName;
            }

            const output =
              `<li id="${obj.id}" data-type="${obj.objectType}" class="layer-${obj.objectType} active" data-sort="${order}">
              <span class="material-icons">${layerIcon}</span>
              <input class="layer-name" autocomplete="off" value="${layerName}" />
            </li>`;

            // Prepend the new layer to the Arast-layers list
            const ArastLayers = document.getElementById('Arast-layers');
            ArastLayers.insertAdjacentHTML('afterbegin', output);

            // Call layer event functions (assuming they're defined elsewhere)
            deleteLayerEvent(obj.id);
            cloneLayerEvent(obj.id);
            visibilityLayerEvent(obj.id);
            lockLayerEvent(obj.id);
            clickLayerEvent(obj.id);
            layerNameEvent(obj.id);

            checkLayers();
            app.canvas.renderAll();
          }
        }
      };

      const handleObjectModified = (event) => {
        const object = event.target;

        if (object.id) {
          // Update text layer name
          if (object.objectType === 'textbox') {
            const layerNameElement = document.getElementById(object.id);
            if (layerNameElement) {
              const inputElement = layerNameElement.querySelector(".layer-name");
              inputElement.value = object.text;
            }
          }

          // Update rotation value and slider display
          const rotationInput = document.getElementById(`${object.objectType}-rotate`);
          const rotationSpan = rotationInput && rotationInput.parentElement.parentElement.querySelector('.slider-label span');
          if (rotationInput && rotationSpan) {
            rotationInput.value = parseInt(app.canvas.getActiveObject().angle);
            rotationSpan.textContent = rotationInput.value;
          }
        }

        // Unlock clipPath object for scaling and movement
        if (object.objectType === 'clipPath') {
          object.lockScalingX = false;
          object.lockScalingY = false;
          object.lockMovementX = false;
          object.lockMovementY = false;
        }

        debouncedSaveDesign(design[designManager.CurrentActiveDesignIndex].Id);

        console.log("------------+++++++++++" + designManager.CurrentActiveDesignIndex);
      };

      const handleObjectDeleted = (event) => {

      };


      const handleObjectSelectionCreated = (e) => {
        let selection = app.canvas.getActiveObjects();

        if (selection != undefined && selection.length != 0 && selection.length >= 2) {
          dispatch(setSelectionObjects(selection))
        }
        else {
          dispatch(setSelectionObjects([]))

        }


        app.canvas.preserveObjectStacking = true;

      };

      const handleObjectScaling = (event) => {

      };


      const handleObjectMoving = (e) => {
        let obj = e.target;

        if (!isSnappingX && !isSnappingY) {
          obj.set({
            snapX: obj.left,
            snapY: obj.top
          });
        }

        if (Math.abs(obj.left - obj.snapX) < snapThreshold) {
          obj.left = obj.snapX;
          isSnappingX = true;
        } else {
          isSnappingX = false;
        }

        if (Math.abs(obj.top - obj.snapY) < snapThreshold) {
          obj.top = obj.snapY;
          isSnappingY = true;
        } else {
          isSnappingY = false;
        }

        // Remove previous guide lines
        guideLines.forEach(line => app.canvas.remove(line));
        guideLines = [];

        // Drawing the guide lines
        if (isSnappingX) {
          const lineX = new fabric.Line([obj.left, 0, obj.left, 1080], {
            stroke: 'pink',
            selectable: false,
            evented: false,
            isGuideLine: true // اضافه کردن این ویژگی
          });
          app.canvas.add(lineX);
          guideLines.push(lineX);
        }

        if (isSnappingY) {
          const lineY = new fabric.Line([0, obj.top, 1080, obj.top], {
            stroke: 'pink',
            selectable: false,
            evented: false,
            isGuideLine: true // اضافه کردن این ویژگی
          });
          app.canvas.add(lineY);
          guideLines.push(lineY);
        }

        app.canvas.renderAll(); // رندر مجدد canvas
      };


      const handleMouseUp = (event) => {
        let activeObject = app.canvas.getActiveObject();

        if (activeObject != null && activeObject != undefined) {
          dispatch(setActiveObject(activeObject.id))
        }
        else {
          dispatch(setActiveObject(0))
        }
        // Remove guide lines after releasing the object
        guideLines.forEach(line => app.canvas.remove(line));
        guideLines = [];
        app.canvas.renderAll();
      };

      const handleMouseDown = (event) => {
        let activeObject = app.canvas.getActiveObject();


        if (activeObject != null && activeObject != undefined) {
          dispatch(setActiveObject(activeObject.id))
        }
        else {
          dispatch(setActiveObject(0))
          dispatch(setSelectionObjects([]))

        }

        const target = event.target;
        if (target) {
          setSelectedObject(target);
        }

        console.log("object");
      };


      const handleObjectSelected = (e) => {
        console.log("-------------=======");

        if (e.target) {
          const index = app.canvas.getObjects().indexOf(e.target); // گرفتن ایندکس آبجکت
          setTimeout(() => {
            app.canvas.moveTo(e.target, index); // بازگرداندن آبجکت به موقعیت اصلی
            app.canvas.requestRenderAll();
          }, 10);

        }

      };

      // ثبت event ها
      app.canvas.on('object:added', handleObjectAdded);
      app.canvas.on('object:modified', handleObjectModified);
      app.canvas.on('mouse:down', handleMouseDown);
      app.canvas.on('mouse:up', handleMouseUp);
      app.canvas.on('selection:created', handleObjectSelectionCreated);
      app.canvas.on('object:removed', handleObjectDeleted);
      app.canvas.on('object:moving', handleObjectMoving);
      app.canvas.on('object:scaling', handleObjectScaling);
      app.canvas.on('object:selected', handleObjectSelected);

      // سایر event ها ...

      // تمیز کردن event listeners
      return () => {
        app.canvas.off('object:added', handleObjectAdded);
        app.canvas.off('object:modified', handleObjectModified);
        app.canvas.off('mouse:down', handleMouseDown);
        app.canvas.off('mouse:up', handleMouseUp);
        app.canvas.off('selection:created', handleObjectSelectionCreated);
        app.canvas.off('object:removed', handleObjectDeleted);
        app.canvas.off('object:moving', handleObjectMoving);
        app.canvas.off('object:scaling', handleObjectScaling);
        app.canvas.off('object:selected', handleObjectSelected);

        // تمیز کردن سایر event listeners
      };
    }

    // به‌روزرسانی اندازه‌ها هنگام تغییر `designManager.CurrentActiveDesignIndex`
    const handleIndexChange = () => {
      updateDimensions();
    };



    // تمیز کردن listener
    return () => {

    };

  }, [app.canvas, designManager.CurrentActiveDesignIndex]); // اضافه کردن وابستگی به `designManager.CurrentActiveDesignIndex`










  useEffect(() => {
    if (designManager.DisableSave) {

      console.log(design);

      app.canvas.clear()
      dispatch(setStartEnableNewDesign(false))
      dispatch(ChangeDesignIndexAction(65))
    }
  }, [designManager])





  useEffect(() => {

    if (design !== null && design[designManager.CurrentActiveDesignIndex].DesignReady == true) {


      if (design[designManager.CurrentActiveDesignIndex].DesignParentFileLink !== null) {
        loadDesignFromUrl(config.staticFile + "SaveDesigns/User/" + design[designManager.CurrentActiveDesignIndex].DesignParentFileLink + ".json");
      }
      else {
        loadDesignFromUrl(config.staticFile + "SaveDesigns/User/" + design[designManager.CurrentActiveDesignIndex].DesignLink + ".json");

      }
      const loader = document.getElementById("Arast-canvas-loader")
      loader.classList.remove("loader-block")
    }





    console.log('----------->>> say again' + currentDesignIndex);

  }, [designManager.CurrentActiveDesignIndex])









  return (<>



    <div id="Arast-body" >
      <div class="Arast-wrap">
        <div id="Arast-ruler" class="Arast-inner-wrap">
          <div id="Arast-content" class="" >
            <div id="Arast-canvas-img-wrap">
              <img id="Arast-canvas-img" src="" data-filename="" data-template="" />
              {/*   Don't remove img element! To open the editor with a default image, you can update it like the following; 
                            <img id="Arast-canvas-img" src="assets/placeholder-big.jpg" data-filename="placeholder" data-template="" />
                            To open the editor with a default template, you can update it like the following; 
                            <img id="Arast-canvas-img" src="" data-filename="template" data-template="files/templates/json/25.json" />  */}
            </div>


            <Draggable disabled={drag} >
              <div id="Arast-canvas-wrap"  >
                <div id="Arast-canvas-overlay"></div>
                <div id="Arast-canvas-loader">
                  <div class="Arast-loader"></div>
                </div>
                <canvas id="Arast-canvas" ></canvas>
              </div>
            </Draggable>


            <div class="Arast-content-bar" id="arast-canvas-controller">
              <div class="Arast-img-size"><span id="Arast-img-width">0</span>px<span class="material-icons">clear</span><span id="Arast-img-height">0</span>px</div>
              <button id="Arast-img-drag" class="Arast-btn"><span class="material-icons">pan_tool</span></button>
              <div id="Arast-img-zoom-counter" class="Arast-counter">
                <button id="Arast-img-zoom-out" class="counter-minus Arast-btn" ><span class="material-icons">remove</span></button>
                <input id="Arast-img-zoom" class="Arast-form-field numeric-field" type="text" value="100" autocomplete="off" data-min="10" data-max="200" data-step="5" />
                <button id="Arast-img-zoom-in" class="counter-plus Arast-btn"  ><span class="material-icons">add</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>




  </>);




}







export default Canvas;