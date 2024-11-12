import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StickerPackTab from "./StickerPackTab";
import LogoPackTab from "./LogoPackTab";






const TabController = () => {
    const assetTab = useSelector((state) => state.IAssetTab);
    const [tab, setTab] = useState(null)


    useEffect(() => {
        if (assetTab.IsActiveTab) {
            if (assetTab.StickerPackId !== 0) {
                setTab(<StickerPackTab Id={assetTab.StickerPackId}/>)
            }
            if (assetTab.LogoPackId !== 0) {
                setTab(<LogoPackTab Id={assetTab.LogoPackId}/>)
            }
        }
    }, [])


    return (<>


        {
            tab !== null ? (
                <>
                    {tab}
                </>
            ) :
                (
                    <>
                    </>
                )
        }



    </>);
}

export default TabController;