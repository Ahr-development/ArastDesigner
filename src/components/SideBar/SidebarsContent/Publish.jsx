import React, { useState } from "react";
import Adjust from "./Adjust";
import AdjustCollection from "./AdjustCollection";



const Publish = ({mode}) => {

    const [tab, setTab] = useState(null)

    const handleTabControl = (control) => {
        switch (control) {
            case 1:
                setTab(<Adjust mode={mode}/>)
                break;

            case 2:
                setTab(<AdjustCollection mode={mode}/>)
                break;

            default:
                break;
        }
    }


    return (<>

<div id={mode != null ? ("") : ("Arast-icon-panel")}>
                <div id={mode != null ? ("") : ("Arast-icon-panel-inner")}>
                <div id="Arast-elements" class="Arast-icon-panel-content">

                    {

                        tab == null ? (<>

                            <div class="Arast-grid-wrap">

                                <div class="grid-item" onClick={() => handleTabControl(1)}  >
                                    <div class="template-favorite">
                                        <button type="button"  class="Arast-btn-simple star" ><span class="material-icons">star_border</span></button>
                                    </div>
                                    <div class="Arast-masonry-item-inner Arast-select-template" >
                                        <div class="Arast-img-wrap">
                                            <img class="lazy arast-webkit" src="/img/1.jpg"  />
                                        </div>
                                        <div class="Arast-masonry-item-desc">
                                            انتشار عادی پست
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-item" onClick={() => handleTabControl(2)}   >
                                    <div class="template-favorite">
                                        <button type="button" class="Arast-btn-simple star" ><span class="material-icons">star_border</span></button>
                                    </div>
                                    <div class="Arast-masonry-item-inner Arast-select-template" >
                                        <div class="Arast-img-wrap">
                                            <img class="lazy arast-webkit" src="/img/2.jpg" />
                                        </div>
                                        <div class="Arast-masonry-item-desc ">
                                            انتشار بصورت پوشه
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </>) : (<>

                            {tab}

                        </>)


                    }


                </div>

            </div>
        </div>



    </>);
}

export default React.memo(Publish);
