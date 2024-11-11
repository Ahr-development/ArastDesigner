import { useEffect, useState } from "react";
import { InitializeSideBarIconContent } from "../../../js/Arast";
import { useSelector } from "react-redux";
import { getScaledSize } from "../../../js/SetupEditor";
import IconTab from "./ContentTabs/IconTabs/IconTab";
import StickerTab from "./ContentTabs/IconTabs/StickerTab";
import LogoTab from "./ContentTabs/IconTabs/LogoTab";



const Icon = () => {
    const app = useSelector((state) => state.InitApp);
    const settings = useSelector((state) => state.ISettings);
    const [tab, setTab] = useState(<IconTab />)

    useEffect(() => {


    }, [])


    const handleSetTab = (tabs) => {
        const iconTabButton = document.getElementById("arast-all-icons")
        const logoTabButton = document.getElementById("arast-all-logos")
        const stickerTabButton = document.getElementById("arast-all-stickers")

        switch (tabs) {
            case "icon":
                setTab(<IconTab />)
                logoTabButton.classList.remove("active")
                stickerTabButton.classList.remove("active")
                iconTabButton.classList.add("active")
                break;

            case "logo":
                setTab(<LogoTab />)
                logoTabButton.classList.add("active")
                stickerTabButton.classList.remove("active")
                iconTabButton.classList.remove("active")
                break;


            case "sticker":
                setTab(<StickerTab />)
                logoTabButton.classList.remove("active")
                stickerTabButton.classList.add("active")
                iconTabButton.classList.remove("active")
                break;

            default:
                break;
        }
    }


    return (<>

        <div id="Arast-icons" class="Arast-icon-panel-content ">
            <div class="Arast-tabs">
                <ul class="Arast-tabs-menu">
                    <li class="active" id="arast-all-icons" onClick={() => handleSetTab("icon")} data-target="#Arast-all-icons">آیکون ها</li>
                    <li id="arast-all-logos" onClick={() => handleSetTab("logo")} data-target="#Arast-customsvg-upload">لوگو ها</li>
                    <li id="arast-all-stickers" onClick={() => handleSetTab("sticker")} data-target="#Arast-customsvg-upload">استیکرها</li>

                </ul>

                {tab}

                <div id="Arast-customsvg-upload" class="Arast-tab">
                    <div class="Arast-file-field">
                        <input type="file" name="Arast-element-upload" id="Arast-element-upload" class="Arast-hidden-file" accept="image/svg+xml" />
                        <label for="Arast-element-upload" class="Arast-btn primary Arast-lg-btn btn-full"><span class="material-icons">upload</span><span>Upload SVG from computer</span></label>
                    </div>
                    <button id="Arast-svg-media-library" type="button" class="Arast-btn primary Arast-lg-btn btn-full Arast-modal-open" data-target="#modal-svg-library"><span class="material-icons">photo_library</span>Select From Media Library</button>
                    <div id="Arast-custom-svg-options">
                        <hr />
                        <div class="Arast-control-wrap label-block">
                            <div class="Arast-control">
                                <div class="Arast-btn-group icon-group">
                                    <button id="customsvg-flip-horizontal" type="button" class="Arast-btn tooltip tooltip-top" data-title="Flip X"><span class="material-icons">flip</span></button>
                                    <button id="customsvg-flip-vertical" type="button" class="Arast-btn tooltip tooltip-top" data-title="Flip Y"><span class="material-icons">flip</span></button>
                                    <button type="button" class="Arast-horizontal-center Arast-btn tooltip tooltip-top" data-title="H-Align Center"><span class="material-icons">align_horizontal_center</span></button>
                                    <button type="button" class="Arast-vertical-center Arast-btn tooltip tooltip-top" data-title="V-Align Center"><span class="material-icons">vertical_align_center</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="Arast-control-wrap label-block">
                            <label class="Arast-control-label slider-label">Opacity<span>1</span></label>
                            <div class="Arast-control">
                                <input id="customsvg-opacity" type="range" min="0" max="1" value="1" step="0.1" class="Arast-slider" autocomplete="off" />
                            </div>
                        </div>
                        <div class="Arast-control-wrap label-block">
                            <label class="Arast-control-label slider-label">Skew X<span>0</span></label>
                            <div class="Arast-control">
                                <input id="customsvg-skew-x" type="range" min="0" max="180" value="0" step="1" class="Arast-slider" autocomplete="off" />
                            </div>
                        </div>
                        <div class="Arast-control-wrap label-block">
                            <label class="Arast-control-label slider-label">Skew Y<span>0</span></label>
                            <div class="Arast-control">
                                <input id="customsvg-skew-y" type="range" min="0" max="180" value="0" step="1" class="Arast-slider" autocomplete="off" />
                            </div>
                        </div>
                        <div class="Arast-control-wrap label-block">
                            <label class="Arast-control-label slider-label">Rotate<span>0</span></label>
                            <div class="Arast-control">
                                <input id="customsvg-rotate" type="range" min="0" max="360" value="0" step="1" class="Arast-slider" autocomplete="off" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </>);




}





export default Icon;