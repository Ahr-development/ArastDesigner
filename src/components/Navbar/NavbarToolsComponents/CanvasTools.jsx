import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useSelector } from "react-redux";
import { debouncedSaveDesign } from "../../../utils/SaveDesign";




const CanvasTools = () => {
    const [color, setColor] = useState('#000000');
    const [openColor, setOpenColor] = useState(false);
    const app = useSelector((state) => state.InitApp);
    const design = useSelector((state) => state.IDesign);
    const designManager = useSelector((state) => state.IDesignController);
    const currentDesignIndex = useSelector((state) => state.IDesignController.CurrentActiveDesignIndex);

    const handleChangeColor = (colors) => {
        setColor(colors.hex)
        app.canvas.backgroundColor = colors.hex;

        app.canvas.requestRenderAll();

        debouncedSaveDesign(design[designManager.CurrentActiveDesignIndex].Id);
        console.log('----------->>> say again' + currentDesignIndex);

    }

    useEffect(()=> {
        setColor(app.canvas.backgroundColor)
    },[color])
    
    return (<>
        <div className="container">
            <div className="row  NavbarTools-row">
                <div className="col-2 col-md-2 col-xs-2 width-auto" >


                    <button id="button-text-color2" style={{ background: color }} onClick={() => setOpenColor(!openColor)} type="button" class="Arast-btn custom-btn-no-border custom-color-button btn-1 btn-colorize"><span class="material-icons"></span></button>

                    {openColor &&
                        <SketchPicker color={color} onChange={(updatedColor) => handleChangeColor(updatedColor)} className='position-absolute toolbar-text-color' />
                    }

                </div>
            </div>
        </div>


    </>);
}

export default CanvasTools;