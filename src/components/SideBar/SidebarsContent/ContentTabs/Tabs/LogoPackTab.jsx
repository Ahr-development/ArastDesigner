import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import config from "../../../../../Services/config.json"



const LogoPackTab = ({ Id }) => {
    const assets = useSelector((state) => state.IAssets);
    const [files, setFiles] = useState([])

    useEffect(() => {
        setFiles(assets.logoCollections.find(item => item.CollectionId === Id).CollectionFiles[0])
    }, [])

    return (<>

        {
            files.length !== 0 ? (<>
                <div className="row "  >
                    {files.map((element) => (
                        <div className="col-4 arast-logos" >
                            <img className="designsImage" src={config.staticFile + element.AssetsStaticFile}
                            />
                        </div>
                    ))}

                </div>


            </>) : (<></>)
        }


    </>);
}

export default LogoPackTab;