import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeDesignIndexAction, setActiveObject, setChangeDesignAction, setChangeLastDesignLength, setEditTextBoxContentModalAction, setSelectionObjects, setStartEnableNewDesign, updateHistory, updateInitAppAction } from "../../Actions/InitAppAction";
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

          const fontURL = "https://arastme.s3-website.ir-thr-at1.arvanstorage.ir/" + mainFont.FontFileName;
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
              const fontURL = "https://arastme.s3-website.ir-thr-at1.arvanstorage.ir/" + font.FontFileName;
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
  }, [drag])



  function editObject(eventData, transform) {
    const target = transform.target; // دریافت آبجکت انتخاب‌شده

    if (target.type === 'textbox') {

      const data = {
        EditTextBoxContentModal: true,
        TextBoxIdChangeContent: target.id,
      }


      dispatch(setEditTextBoxContentModalAction(data))

      return true; // اتمام رویداد
    } else {
      alert("This control is for editing text objects only.");
      return false;
    }
  }




  function addEditIcon(obj) {
    const editControl = new fabric.Control({

      x: -0.001, // مرکز در محور X
      y: 0.9, // بالای آبجکت در محور Y
      offsetX: 0, // بدون افست افقی اضافی
      offsetY: 10, // کمی فاصله از لبه بالا آبجکت      cursorStyle: 'pointer', // ظاهر نشانگر موس
      mouseUpHandler: editObject, // هندلر برای کلیک روی آیکون
      render: (ctx, left, top, styleOverride, fabricObject) => {
        const size = 24; // اندازه ثابت آیکون

        // تعریف آیکون ویرایش (SVG مداد)
        const editIcon =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230000FF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 20h9'%3E%3C/path%3E%3Cpath d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'%3E%3C/path%3E%3C/svg%3E";

        const editImg = document.createElement('img');
        editImg.src = editIcon;

        ctx.save();

        // انتقال به موقعیت کنترل
        ctx.translate(left, top);

        // رسم آیکون
        ctx.drawImage(editImg, -size / 2, -size / 2, size, size);
        ctx.restore();
      },
      cornerSize: 24, // اندازه گوشه
    });

    // افزودن کنترل به آبجکت
    obj.controls.editControl = editControl;
  }

  function renderDeleteIcon(ctx, left, top, styleOverride, fabricObject) {
    var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='tm_delete_btn' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='256' cy='256' r='256'/%3E%3Cg%3E%3Crect x='120.001' y='239.987' transform='matrix(-0.7071 -0.7071 0.7071 -0.7071 256.0091 618.0168)' style='fill:%23FFFFFF;' width='271.997' height='32'/%3E%3Crect x='240' y='119.989' transform='matrix(-0.7071 -0.7071 0.7071 -0.7071 256.0091 618.0168)' style='fill:%23FFFFFF;' width='32' height='271.997'/%3E%3C/g%3E%3C/svg%3E";

    var deleteimg = document.createElement('img');
    deleteimg.src = deleteIcon;

    var size = 24;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(deleteimg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  function addDeleteIcon(obj) {
    const deleteControl = new fabric.Control({
      x: 0.1, // مرکز در محور X
      y: 0.9, // بالای آبجکت در محور Y
      offsetX: 0, // بدون افست افقی اضافی
      offsetY: 10, // کمی فاصله از لبه بالا آبجکت
      cursorStyle: 'pointer', // ظاهر نشانگر موس
      mouseUpHandler: deleteObject, // هندلر برای کلیک
      render: (ctx, left, top, styleOverride, fabricObject) => {
        const size = 24; // اندازه ثابت آیکون

        // تعریف آیکون
        const deleteIcon =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FF0000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='15' y1='9' x2='9' y2='15'%3E%3C/line%3E%3Cline x1='9' y1='9' x2='15' y2='15'%3E%3C/line%3E%3C/svg%3E";

        const deleteImg = document.createElement('img');
        deleteImg.src = deleteIcon;

        ctx.save();

        // انتقال به موقعیت کنترل
        ctx.translate(left, top);

        // رسم آیکون
        ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
        ctx.restore();
      },
      cornerSize: 24, // اندازه گوشه، دیگر لازم نیست
    });

    // افزودن کنترل به آبجکت
    obj.controls.deleteControl = deleteControl;
  }


  function renderDuplicateIcon(ctx, left, top, styleOverride, fabricObject) {
    var duplicateIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Ccircle cx='256' cy='256' r='256' style='fill:%234CAF50;'/%3E%3Cg%3E%3Crect x='144' y='144' width='224' height='224' rx='16' ry='16' style='fill:%23FFFFFF;'/%3E%3Crect x='192' y='192' width='224' height='224' rx='16' ry='16' style='fill:%23000000;opacity:0.2;'/%3E%3C/g%3E%3C/svg%3E";

    var duplicateimg = document.createElement('img');
    duplicateimg.src = duplicateIcon;

    var size = 24;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(duplicateimg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  function addDuplicateIcon(obj) {
    const duplicateControl = new fabric.Control({
      x: -0.1, // مرکز در محور X
      y: 0.9, // پایین آبجکت در محور Y
      offsetX: 0, // بدون افست افقی اضافی
      offsetY: 10, // کمی فاصله از لبه پایین آبجکت
      cursorStyle: 'pointer', // ظاهر نشانگر موس
      mouseUpHandler: duplicateObject, // هندلر برای کلیک
      render: (ctx, left, top, styleOverride, fabricObject) => {
        const size = 24; // اندازه ثابت آیکون

        // تعریف آیکون
        const duplicateIcon =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='8' y='8' width='12' height='12' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M16 2H6a2 2 0 0 0-2 2v10'%3E%3C/path%3E%3C/svg%3E";

        const duplicateImg = document.createElement('img');
        duplicateImg.src = duplicateIcon;

        ctx.save();

        // موقعیت دقیق آیکون
        ctx.translate(left, top); // انتقال به موقعیت کنترل
        ctx.drawImage(duplicateImg, -size / 2, -size / 2, size, size); // رسم آیکون
        ctx.restore();
      },
      cornerSize: 24, // اندازه گوشه، دیگر لازم نیست
    });

    // افزودن کنترل به آبجکت
    obj.controls.duplicateControl = duplicateControl;
  }




  function deleteObject(eventData, transform) {
    const target = transform.target; // آبجکت مورد نظر
    if (target) {
      app.canvas.remove(target); // حذف آبجکت از Canvas
      app.canvas.discardActiveObject(); // حذف انتخاب از Canvas
      app.canvas.renderAll(); // رندر دوباره Canvas
    }
    debouncedSaveDesign(design[designManager.CurrentActiveDesignIndex].Id);

    return false; // جلوگیری از رفتار پیش‌فرض Fabric.js
  }



  function duplicateObject(eventData, transform) {
    const target = transform.target; // آبجکت انتخاب شده
    if (target) {
      target.clone((clonedObject) => {
        clonedObject.set({
          left: target.left + 20, // انتقال مختصات کپی به راست
          top: target.top + 20, // انتقال مختصات کپی به پایین
          id: new Date().getTime(), // ایجاد یک id جدید برای آبجکت کپی شده
        });
        app.canvas.add(clonedObject); // افزودن کپی به Canvas
        app.canvas.setActiveObject(clonedObject); // انتخاب کپی جدید
        app.canvas.renderAll(); // رندر دوباره Canvas
      });
    }
    debouncedSaveDesign(design[designManager.CurrentActiveDesignIndex].Id);

    return false; // جلوگیری از رفتار پیش‌فرض Fabric.js
  }





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
              addEditIcon(obj)
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
            addDeleteIcon(obj)
            addDuplicateIcon(obj)
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