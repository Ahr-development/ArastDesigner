import { useEffect, useState } from "react";
import Adjust from './SidebarsContent/Adjust';
import Frames from './SidebarsContent/Frames';
import Text from './SidebarsContent/Text';
import Shape from './SidebarsContent/Shape';
import Apps from './SidebarsContent/Apps';
import Asset from './SidebarsContent/Asset';
import QrCode from './SidebarsContent/QrCode';
import Draw from './SidebarsContent/Draw';
import Setting from './SidebarsContent/Setting';
import { useSelector } from "react-redux";
import AssetPopup from "../Popup/SideBarPopup/AssetPopup";
import Upload from "./SidebarsContent/Upload";
import Publish from "./SidebarsContent/Publish";



const MainSideBar = ({ selected }) => {
    const [content, setContent] = useState(<Frames />)
    const popupState = useSelector((state) => state.IPopup);

    useEffect(() => {
        switch (selected) {
            case "Adjust":
                setContent(<Publish />)
                break;


            case "Frames":
                setContent(<Frames />)
                break;


            case "Text":
                setContent(<Text />)
                break;


            case "Upload":
                setContent(<Upload />)
                break;


            case "Shapes":
                setContent(<Shape />)
                break;

          case "Apps":
                setContent(<Apps />)
                break;

            case "Asset":
                setContent(<Asset />)
                break;

            case "QrCode":
                setContent(<QrCode />)
                break;

            case "Draw":
                setContent(<Draw />)
                break;

            case "Setting":
                setContent(<Setting />)
                break;

            default:
                break;
        }
    }, [selected])


    return (

        <>



                    {content}


             



        </>



    );
}

export default MainSideBar;