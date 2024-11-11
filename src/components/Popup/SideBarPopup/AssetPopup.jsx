import { useDispatch } from "react-redux";
import { setAssetTab, setPopup } from "../../../Actions/InitAppAction";
import { useEffect, useState } from "react";
import { GetAssetInfoService } from "../../../Services/assetService";
import { useSelector } from "react-redux";



const AssetPopup = () => {

    const dispatch = useDispatch();
    const popup = useSelector((state) => state.IPopup);
    const [data, setData] = useState()

    const getInfos = async () => {
        const { data } = await GetAssetInfoService(popup.SendId)
        if (data !== null) {
            setData(data)
        }
    }

    useEffect(() => {
        getInfos()
    }, [])

    const setAssetGroupTab = (value, idValue) => {
        let tab = {
            CategoryId: 0,
            HashtagName: null,
            TypeId: 0,
            SearchWord: null,
            ColorTag: null,
            IsActiveTab: true
        };
        switch (idValue) {
            case 1:
                tab.HashtagName = value
                break;
            case 2:
                tab.ColorTag = value
                break;

            case 3:
                tab.SearchWord = value
                break;

            case 4:
                tab.TypeId = value
                break;

            case 5:
                tab.CategoryId = value
                break;
            default:
                break;
        }


        dispatch(setAssetTab(tab))
    }


    return (<>
        {
            data !== null && data !== undefined ? (<>

                <div className="container">
                    <div className=" arast-popup-frame">

                        <h6 className="arast-popup-text">{data.PersianName}</h6>
                        <br />

                        <div className=" arast-popup-row">
                            {
                                data.KeyWord.split(',').map((element, index) => (
                                    <div key={index} onClick={() => setAssetGroupTab(element, 1)}
                                        className=" arast-popup-hashtags">
                                        {element}
                                    </div>
                                ))
                            }

                        </div>
                        <br />

                        <p>{data.Description}</p>


                    </div>

                </div>


            </>) : (<>



            </>)
        }

    </>);
}

export default AssetPopup;