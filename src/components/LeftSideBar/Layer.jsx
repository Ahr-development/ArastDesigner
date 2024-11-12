import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sortable from 'sortablejs';
import { checkLayers } from "../../js/SetupEditor";
import { ChangeDesignIndexAction, setActiveObject, setChangeDesignAction, setStartEnableNewDesign } from "../../Actions/InitAppAction";
import { CreateNewDesignInUserDesignService } from "../../Services/designService";
import { SetUserDesignAction, UpdateGlobalUserDesignAction } from "../../Actions/DesignAction";




const Layer = () => {
    const [openLayer, setOpenLayer] = useState(true)
    const [isProcessing, setIsProcessing] = useState(false)
    const dispatch = useDispatch()

    const app = useSelector((state) => state.InitApp);
    const settings = useSelector((state) => state.ISettings);
    const design = useSelector((state) => state.IDesign);
    const user = useSelector((state) => state.IUser);
    const designManager = useSelector((state) => state.IDesignController);
    const currentDesignIndex = useSelector((state) => state.IDesignController.CurrentActiveDesignIndex);

    let sortable = null


    const handleTransformPages = (mode) => {
        if (isProcessing) return; // اگر در حال پردازش است، اجرا نشود
        setIsProcessing(true); // شروع پردازش

        const upButton = document.getElementById("arast-pager-up");
        const bottomButton = document.getElementById("arast-pager-down");
        const addButton = document.getElementById("arast-pager-add");



        const loader = document.getElementById("Arast-canvas-loader");

        if (mode === "up") {
            if (designManager.CurrentActiveDesignIndex + 1 < design.length) {
                loader.classList.add("loader-block");

                dispatch(setChangeDesignAction(designManager.CurrentActiveDesignIndex + 1));

                const updateLayer = document.getElementById("Arast-layers");
                updateLayer.innerHTML = "";
                app.canvas.clear();

                // پس از اتمام پردازش، دوباره دکمه‌ها را فعال کن و پرچم را ریست کن
                setTimeout(() => {
                    upButton.disabled = false;
                    bottomButton.disabled = false;
                    addButton.disabled = false;
                    loader.classList.remove("loader-block");
                    setIsProcessing(false); // پایان پردازش
                }, 1000); // به عنوان مثال ۱ ثانیه تاخیر
            }
            else {
                dispatch(setChangeDesignAction(designManager.CurrentActiveDesignIndex - 1));

            }
        } else if (mode === "down") {
            if (designManager.CurrentActiveDesignIndex - 1 >= 0) {
                loader.classList.add("loader-block");

                dispatch(setChangeDesignAction(designManager.CurrentActiveDesignIndex - 1));

                const updateLayer = document.getElementById("Arast-layers");
                updateLayer.innerHTML = "";
                app.canvas.clear();

                // پس از اتمام پردازش، دوباره دکمه‌ها را فعال کن و پرچم را ریست کن
                setTimeout(() => {
                    upButton.disabled = false;
                    bottomButton.disabled = false;
                    addButton.disabled = false;
                    loader.classList.remove("loader-block");
                    setIsProcessing(false); // پایان پردازش
                }, 1000); // به عنوان مثال ۱ ثانیه تاخیر
            }
            else {
                dispatch(setChangeDesignAction(designManager.CurrentActiveDesignIndex + 1));
            }
        }


    };

    const OpenOrCloseTabWithController = (command) => {
        let controller = document.getElementById("arast-canvas-controller")
        let layer = document.getElementById("Arast-right-col")
        let deleteWarp = document.getElementById("Arast-layer-delete-wrap")
        let pager = document.getElementById("arast-pager")

        if (command) {
            let open = document.getElementById("Arast-toggle-right")


            setOpenLayer(command)
            open.style.right = "199px"
            controller.style.marginRight = "10px"
            layer.style.visibility = 'visible';
            deleteWarp.style.visibility = 'visible';
            pager.style.right = "229px"

        } else {

            let close = document.getElementById("Arast-toggle-right")
            setOpenLayer(command)
            close.style.right = "1px"
            controller.style.marginRight = "-200px"
            layer.style.visibility = 'hidden';
            deleteWarp.style.visibility = 'hidden';
            pager.style.right = "30px"

        }

    }



    const addNewCurrentDesignForUser = async () => {
        const { data } = await CreateNewDesignInUserDesignService(user.ServerToken, design[designManager.CurrentActiveDesignIndex].DesignLink, user.UserId, design[designManager.CurrentActiveDesignIndex].Id)

        if (data !== null) {
            dispatch(SetUserDesignAction(data))
            dispatch(setStartEnableNewDesign(true))
            dispatch(setChangeDesignAction(design.length))
        }
    }



    const CreateSortable = () => {


        const selector = document.querySelector("#Arast-layers");

        // Function to check layer visibility (assuming a `checkLayers` function exists)
        function checkLayers() {
            // Implement your `checkLayers` logic here
        }

        sortable = new Sortable(selector, {
            placeholder: "layer-placeholder",
            axis: "y",
            onSort: function (event) {
                const objects = Array.from(app.canvas._objects); // تبدیل به آرایه
                const listItems = selector.querySelectorAll("li");

                for (let i = 0; i < listItems.length; i++) {
                    const listItem = listItems[i];
                    listItem.dataset.sort = i + 1;

                    const matchingObject = objects.find(object => object.id == listItem.id);
                    if (matchingObject) {
                        // جابجایی اشیاء در بوم
                        matchingObject.moveTo(-(i + 1));
                    }
                }

                // به روز رسانی ترتیب اشیاء در بوم
                //objects.filter(element => element.id == value.id).forEach(element => element.moveTo(-(index + 1)));
                app.canvas.renderAll();
            },

            onEnd: function (event) { // Optional: Handle sorting completion (if needed)
                // ...
            },
            onStart: function (event) { // Optional: Handle sorting initiation (if needed)
                // ...
            },
        });


        // Disable selection within the sortable element
        selector.addEventListener("selectstart", function (event) {
            event.preventDefault();
        });


        selector.addEventListener('click', (event) => {
            const object = app.canvas.getObjects().find(obj => obj.id == event.target.id);
            if (object) {
                // شیء با شناسه 175 پیدا شد
                // می توانید عملیات دلخواه خود را مانند انتخاب، تغییر رنگ، جابجایی و ... 
                // روی شیء "object" انجام دهید.

                // مثال: انتخاب شیء
                app.canvas.setActiveObject(object);
                let activeObject = app.canvas.getActiveObject();

                if (activeObject !== null) {  
                    console.log(activeObject);
                    dispatch(setActiveObject(activeObject.id))
                }
                app.canvas.renderAll();
            } else {
                // شیء با شناسه 175 پیدا نشد
                console.warn(event);
            }
        });


    }

    useEffect(() => {




        /*      function createLayerList(canvas) {
                 const layersList = document.getElementById("Arast-layers");
                 layersList.innerHTML = ""; // Clear existing list items
               
                 const objects = canvas.getObjects();
                 objects.forEach((object) => {
                   const li = document.createElement("li");
                   li.id = object.id; // Set the ID of the li to match the object ID
                   li.textContent = object.name || "Layer " + (objects.indexOf(object) + 1); // Set the text content of the li
               
                   // Add additional properties or classes to the li element as needed
               
                   layersList.appendChild(li);
                 });
               } */

        // createLayerList(app.canvas)




        if (sortable != null) {
            sortable.refresh();

        }




    }, [app.objects]);




    useEffect(() => {
        if (sortable == null) {
            CreateSortable((newSortable) => {
                sortable = newSortable;
            });

        }

        /*         document.getElementById('Arast-layer-delete').addEventListener('click', function () {
                    if (window.confirm(ArastParams.question2)) {
                        var type = document.getElementById('Arast-layer-select').value;
                        var objects = app.canvas.getObjects();
        
                        if (type === 'all') {
                            objects.forEach(element => app.canvas.remove(element));
                            document.getElementById('Arast-layers').innerHTML = ''; // Clear layer list efficiently
                        } else {
                            objects.filter(element => element.objectType === type).forEach(element => app.canvas.remove(element));
                            var layerListItem = document.querySelector("#Arast-layers > li.layer-" + type);
                            if (layerListItem) {
                                layerListItem.parentNode.removeChild(layerListItem); // Remove specific layer list item
                            }
                        }
        
                        app.canvas.renderAll(); // Request render for all layers (more efficient)
                        sortable.refresh();
                        checkLayers(); // Call your custom function to handle layer changes
                    }
                }); */




        /* 
                const layerList = document.getElementById('Arast-layers');
        
                layerList.addEventListener('click', (event) => {
                    if (!event.target.classList.contains('layer-settings')) return;
        
                    const clickedSetting = event.target;
                    const layerSettings = clickedSetting.nextElementSibling;
        
                    if (clickedSetting.classList.contains('active')) {
                        clickedSetting.classList.remove('active');
                        layerSettings.style.display = 'none';
                    } else {
                        // Hide all other layer icons and settings
                        const layerIcons = layerList.querySelectorAll('.layer-icons');
                        layerIcons.forEach(icon => icon.style.display = 'none');
        
                        const allSettings = layerList.querySelectorAll('.layer-settings');
                        allSettings.forEach(setting => setting.classList.remove('active'));
        
                        clickedSetting.classList.add('active');
                        layerSettings.style.display = 'block';
                    }
                }); */

        OpenOrCloseTabWithController(false)

    }, [])



    return (<>



        <>
            <div id="Arast-right-col"    >
                <h6 class="Arast-layers-title" dir="rtl"><span class="material-icons">layers</span>لایه ها</h6>
                <div id="Arast-no-layer">
                    هنوز لایه ای اضافه نکردین! از قسمت پنل سمت راستتون به دنیای لایه های زیبا وارد شوید
                </div>
                <ul id="Arast-layers" dir="rtl"></ul>
                <div id="Arast-layer-delete-wrap">

                </div>
            </div>

        </>






        <div onClick={() => OpenOrCloseTabWithController(!openLayer)} id="Arast-toggle-right"><span class="material-icons">chevron_right</span></div>
        <div id="arast-pager" class="arast-pager text-center">
            <div class="">
                <div class="">
                    <button class="arast-pager-circle" id="arast-pager-down" onClick={() => handleTransformPages("down")}>
                        <span class="material-icons black-color">arrow_upward</span>
                    </button>
                </div>
                <div class="arast-pager-center">
                    <button onClick={() => addNewCurrentDesignForUser()} id="arast-pager-add" class="arast-pager-circle">
                        <span class="material-icons black-color">add</span>
                    </button>
                </div>
                <div class="">
                    <button class="arast-pager-circle" id="arast-pager-up" onClick={() => handleTransformPages("up")}>
                        <span class="material-icons black-color">arrow_downward</span>
                    </button>
                </div>
            </div>
        </div>

    </>);
}

export default Layer;