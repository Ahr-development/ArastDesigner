import { useEffect, useState } from "react";
import { InitializeSideBarIconContent } from "../../../js/Arast";
import { useDispatch, useSelector } from "react-redux";
import { getScaledSize } from "../../../js/SetupEditor";
import IconTab from "./ContentTabs/AssetTabs/IconTab";
import StickerTab from "./ContentTabs/AssetTabs/StickerTab";
import LogoTab from "./ContentTabs/AssetTabs/LogoTab";
import AssetPopup from "../../Popup/SideBarPopup/AssetPopup";
import AllAssetTab from "./ContentTabs/AssetTabs/AllAssetTab";
import { setAssetTab } from "../../../Actions/InitAppAction";
import React from "react";
import { debounce } from 'lodash';
import { getMoreAssetsByCategoryIdService } from "../../../Services/assetService";
import { LoadMorePhotosAssetAction } from "../../../Actions/AssetsAction";
import PhotosTab from "./ContentTabs/AssetTabs/PhotosTab";
import GraphicTab from "./ContentTabs/AssetTabs/GraphicTab";
import TabController from "./ContentTabs/Tabs/TabController";



const Asset = ({mode}) => {
    const assetTab = useSelector((state) => state.IAssetTab);
    const assetsCategory = useSelector((state) => state.IAssetCategories);
    const assets = useSelector((state) => state.IAssets);

    const [tab, setTab] = useState(<AllAssetTab />)
    const [tabName, setTabName] = useState("All")

    const dispatch = useDispatch();


    const handleScroll = debounce(async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.getElementById('Arast-icon-panel-inner');

        if (scrollTop + clientHeight >= scrollHeight - 1) {
            // Dispatch your action here

            switch (tabName) {
                case "Sticker":
                    if (!assets.isEnd.photosEnd) {
                        const { data } = await getMoreAssetsByCategoryIdService(11, assets.pages.photosPage)
                        if (data.length !== 0) {
                            dispatch(LoadMorePhotosAssetAction(data))
                            assets.pages.photosPage = assets.pages.photosPage + 1
                        }
                        else {
                            assets.isEnd.photosEnd = true
                            document.getElementById("arast-photos-loader").style.display = none;
                        }
                    }
                    break;

                default:
                    break;
            }
        }
    }, 300); // Adjust the delay as needed




    useEffect(() => {
        const scrollControl = document.getElementById('Arast-icon-panel-inner');
        scrollControl.addEventListener('scroll', handleScroll);

        return () => {
            scrollControl.removeEventListener('scroll', handleScroll);
        };

    })

    const handleSetTab = (tabs) => {
        const iconTabButton = document.getElementById("arast-all-icons")
        const logoTabButton = document.getElementById("arast-all-logos")
        const photsTabButton = document.getElementById("arast-all-photos")
        const allTabButton = document.getElementById("arast-all")
        const stickerTabButton = document.getElementById("arast-all-sticker")

        let tab = {
            CategoryId: 0,
            HashtagName: null,
            TypeId: 0,
            SearchWord: null,
            ColorTag: null,
            IsActiveTab: false,
            StickerPackId : 0,
            LogoPackId : 0
        };

        dispatch(setAssetTab(tab))

        switch (tabs) {
            case "icon":
                setTab(<IconTab />)
                logoTabButton.classList.remove("active")
                allTabButton.classList.remove("active")
                photsTabButton.classList.remove("active")
                stickerTabButton.classList.remove("active")

/*                 iconTabButton.classList.add("active")
 */                break;
            case "sticker":
                setTab(<StickerTab />)
                logoTabButton.classList.remove("active")
                allTabButton.classList.remove("active")
                photsTabButton.classList.remove("active")

                stickerTabButton.classList.add("active")
                break;

            case "logo":
                setTab(<LogoTab />)
                logoTabButton.classList.add("active")
                allTabButton.classList.remove("active")
                photsTabButton.classList.remove("active")
                stickerTabButton.classList.remove("active")

                break;


            case "all":
                setTab(<AllAssetTab />)
                allTabButton.classList.add("active")
                logoTabButton.classList.remove("active")
                photsTabButton.classList.remove("active")
                stickerTabButton.classList.remove("active")

                break;


            case "photo":
                setTab(<PhotosTab />)
                photsTabButton.classList.add("active")
                logoTabButton.classList.remove("active")
                allTabButton.classList.remove("active")
                stickerTabButton.classList.remove("active")

                setTabName("Sticker")
                break;



/*             case "graphic":
                setTab(<GraphicTab />)
                graphicTabButton.classList.add("active")
                logoTabButton.classList.remove("active")
                iconTabButton.classList.remove("active")
                 photsTabButton.classList.remove("active")
                allTabButton.classList.remove("active")
                stickerTabButton.classList.remove("active")

                break; */

            default:
                break;
        }
    }


    return (<>



<div id={mode != null ? ("") : ("Arast-icon-panel")}>

            <ul class="Arast-tabs-menu arast-menu-ul">

                <li class="active" id="arast-all" onClick={() => handleSetTab("all")} data-target="#Arast-customsvg-upload">همه</li>
                <li id="arast-all-photos" onClick={() => handleSetTab("photo")} data-target="#Arast-customsvg-upload">عکس ها</li>
                <li id="arast-all-logos" onClick={() => handleSetTab("logo")} data-target="#Arast-customsvg-upload">لوگو ها</li>
{/*                 <li id="arast-all-graphics" onClick={() => handleSetTab("graphic")} data-target="#Arast-customsvg-upload">گرافیک</li>
 */}                <li id="arast-all-sticker" onClick={() => handleSetTab("sticker")} data-target="#Arast-customsvg-upload">استیکر ها</li>

                {/*                 <li id="arast-all-icons" onClick={() => handleSetTab("icon")} data-target="#Arast-all-icons">آیکون ها</li>
 */}

            </ul>


            <div id={mode != null ? ("") : ("Arast-icon-panel-inner")} className="arast-menu-panel-inner">
                <div id="Arast-icons" class="Arast-icon-panel-content">
                    <div class="Arast-tabs">


                        {assetTab.IsActiveTab ? <TabController /> : tab}


                    </div>
                </div>

            </div>


        </div>


    </>);




}




export default React.memo(Asset);
