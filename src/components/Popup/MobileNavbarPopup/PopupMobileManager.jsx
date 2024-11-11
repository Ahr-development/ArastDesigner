import { useEffect, useState } from "react";
import Frames from './../../SideBar/SidebarsContent/Frames';
import Publish from "../../SideBar/SidebarsContent/Publish";
import Upload from "../../SideBar/SidebarsContent/Upload";
import Shape from "../../SideBar/SidebarsContent/Shape";
import Apps from "../../SideBar/SidebarsContent/Apps";
import Asset from "../../SideBar/SidebarsContent/Asset";
import Adjust from "../../SideBar/SidebarsContent/Adjust";
import Text from "../../SideBar/SidebarsContent/Text";





const PopupMobileManager = ({ tab }) => {

    const [selectedTab, setSelectedTab] = useState(<Frames mode={"mobile"} />)

    useEffect(() => {
        switch (tab) {
            case "Designs":
                setSelectedTab(<Frames mode={"mobile"} />)
                break;


            case "Text":
                setSelectedTab(<Text mode={"mobile"} />)
                break;


            case "Uploads":
                setSelectedTab(<Upload mode={"mobile"} />)
                break;


            case "Publish":
                setSelectedTab(<Publish mode={"mobile"} />)
                break;

            case "Shapes":
                setSelectedTab(<Shape mode={"mobile"} />)
                break;

            case "Apps":
                setSelectedTab(<Apps mode={"mobile"} />)
                break;

            case "Assets":
                setSelectedTab(<Asset mode={"mobile"} />)
                break;




            default:
                break;
        }
    }, [tab])



    return (<>


        <div className="arast-popup-navbar">

            {selectedTab}



        </div>

    </>);
}

export default PopupMobileManager;