import { useDispatch, useSelector } from "react-redux";
import { setShowModalAllChildrenDesign } from "../../Actions/InitAppAction";
import config from '../../Services/config.json'
import { SetUserDesignAction, UpdateGlobalUserDesignAction } from "../../Actions/DesignAction";
import React, { useEffect } from "react";
import ShowImageDynamic from "../Common/ShowImageDynamic";


const ShowAllUserDesigns = () => {

    const dispatch = useDispatch()
    const design = useSelector((state) => state.IDesign);
    const app = useSelector((state) => state.InitApp);
    const designManager = useSelector((state) => state.IDesignController);


    useEffect(() => {
        console.log(design);
    }, [])

    const handleClose = () => {
        dispatch(setShowModalAllChildrenDesign(false))
    }

    const handleSetUserDesignForCurrent = (DesignId, index) => {
        const updateLayer = document.getElementById("Arast-layers")
        updateLayer.innerHTML = ""
        console.log("\n" + DesignId + index + "\n");
        designManager.CurrentActiveDesignIndex = index
        dispatch(UpdateGlobalUserDesignAction(design))
        app.canvas.clear()
    }

    return (<>


        <div id="modal-history" class="Arast-modal arast-history" >
            <div class="Arast-modal-wrap">
                <div class="Arast-modal-inner">
                    <div class="Arast-modal-bg">
                        <h3 class="Arast-history-title">صفحات طراحی ها<button onClick={() => handleClose()} id="Arast-clear-history" type="button"
                            class="Arast-btn danger"><span class="material-icons">clear</span>بستن</button>
                        </h3>

                        <div class="Arast-grid-wrap row">

                            {
                                design.map((des, index) => (
                                    <div onClick={() => handleSetUserDesignForCurrent(des.Id, index)} class="grid-item col-12 col-md-4 col-sm-6"  >
                                        <div class="template-favorite">
                                            <button type="button" class="Arast-btn-simple star" data-templateid=""><span class="material-icons">download</span></button>
                                        </div>
                                        <div class="Arast-masonry-item-inner Arast-select-template" >
                                            <div class="Arast-img-wrap">
                                                <ShowImageDynamic classImage="lazy entered loaded arast-webkit"  image={config.staticFile + des.DesignPhoto + "?=" + Math.floor(Math.random() * 101)}  />
                                            </div>
                                            <div class="Arast-masonry-item-desc">
                                                {des.DesignName}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }




                        </div>

                    </div>
                </div>
            </div>
        </div>




    </>);
}

export default React.memo(ShowAllUserDesigns);
