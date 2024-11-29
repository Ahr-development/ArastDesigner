
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useSelector } from "react-redux";
import { debouncedSaveDesign } from "../../../utils/SaveDesign";




const ImageTools = ({ object, isArray }) => {

    const app = useSelector((state) => state.InitApp);
    const design = useSelector((state) => state.IDesign);
    const designManager = useSelector((state) => state.IDesignController);
    const currentDesignIndex = useSelector((state) => state.IDesignController.CurrentActiveDesignIndex);


    useEffect(() => {

    }, [])

    const handleLockUnlock = () => {
        object.selectable = !object.selectable
        const lockBtn =  document.getElementById("arast-lock-image")
        lockBtn.innerText = object.selectable ? ("باز شد") : ("قفل شد")
        lockBtn.classList.add("active")
        app.canvas.discardActiveObject(); // دی‌سلکت کردن آبجکت فعال

    }

    return (<>
        <div className="container">
            <div className="row  NavbarTools-row">
                <div className="col-2 col-md-1 col-xs-2 width-auto" >

                    <button id="format-italic" type="button" class="Arast-btn custom-btn-no-border btn-1 " style={{ fontSize: "15px", maxWidth: "78%" }}>افکت ها</button>


                </div>
                <div class=" col-6 col-md-4" style={{marginLeft:"-53px"}}>
                    <div id="Arast-text-format-btns" class="Arast-btn-group icon-group">
                        <button id="format-bold" type="button" class="Arast-btn custom-btn-no-border btn-1"><span class="material-icons">wb_sunny</span></button>
                        <button id="format-italic" type="button" class="Arast-btn custom-btn-no-border btn-1"><span class="material-icons">delete</span></button>
                        <button id="arast-lock-image" onClick={() => handleLockUnlock()} type="button" class="Arast-btn custom-btn-no-border btn-1"><span class="material-icons">{object.selectable ? ("lock_open") : ("lock")}</span></button>

                    </div>
                </div>
            </div>
        </div>


    </>);
}

export default ImageTools;