import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SVGLoader } from "../../../../Loaders/SVGLoader";
import InfiniteScroll from 'react-infinite-scroller';
import { setAssetTab, updateSVGLogos } from "../../../../../Actions/InitAppAction";
import { getScaledSize } from "../../../../../js/SetupEditor";
import config from "../../../../../Services/config.json"



const LogoTab = () => {

    /*     const svg = useSelector((state) => state.ISVG)
     */
    const app = useSelector((state) => state.InitApp);
    const assets = useSelector((state) => state.IAssets);
    const dispatch = useDispatch();


    /*     const arrayo = [
            {
                "id": Math.random() * 2,
                "url": "/svg/logos/bmw.svg",
                "altText": "BMW",
                "faTitle": "َشرکت بی ام و",
                "title": "BMW CARS COMPANY",
                "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
            },
            {
                "id": Math.random() * 2,
                "url": "/svg/logos/bmw.svg",
                "altText": "BMW",
                "faTitle": "َشرکت بی ام و",
                "title": "BMW CARS COMPANY",
                "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
            },
            {
                "id": Math.random() * 2,
                "url": "/svg/logos/bmw.svg",
                "altText": "BMW",
                "faTitle": "َشرکت بی ام و",
                "title": "BMW CARS COMPANY",
                "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
            },
            {
                "id": Math.random() * 2,
                "url": "/svg/logos/bmw.svg",
                "altText": "BMW",
                "faTitle": "َشرکت بی ام و",
                "title": "BMW CARS COMPANY",
                "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
            },
        ]
    
    
    
        useEffect(() => {
            const svgs = document.getElementById("logosvg-server")
            console.log(svgs);
        }, [])
    
        const logoClickListener = function (id) {
            console.log("آیتم کلیک شد");
            const item = svg.Logos.find(logo => logo.id === id);
            console.log(item);
    
            fabric.loadSVGFromURL(item.url, function (objects) {
                const groupedObject = new fabric.Group(objects);
    
                groupedObject.top = 1080 / 2,
                    groupedObject.left = 1080 / 6,
    
                    app.canvas.add(groupedObject);
            });
            app.canvas.requestRenderAll()
    
        };
    
     */

        const handleOpenPack = (Id) => {
            let initialState = {
                CategoryId: 0,
                HashtagName: null,
                TypeId : 0,
                SearchWord : null,
                ColorTag: null,
                IsActiveTab : true,
                StickerPackId : 0,
                LogoPackId : Id
            };
    
            dispatch(setAssetTab(initialState))
            
        }
    

    useEffect(() => {


    }, []);



    /*   const loadmore = () => {
          dispatch(updateSVGLogos(arrayo))
      } */

    return (<>

        {/*    <div className="row " id="logosvg-server" >
            {svg.Logos.map((svgObject) => (
                <div className="col-6 arast-logos" key={svgObject.id}>
                    <img className="designsImage" onClick={() => logoClickListener(svgObject.id)} src={svgObject.url} alt={svgObject.title}
                    />
                    <div class="dots" ></div>

                </div>
            ))}

            <button className="custom-btn-no-dimensions btn-10" onClick={() => loadmore()}>بارگزاری بیشتر</button>
        </div>
 */}

        <div className="row g-1">
            {
                assets.logoCollections.map((logo) => (
                    <div className="col-6">
                       <div  onClick={() => handleOpenPack(logo.CollectionId)}  class="row g-1 Arast-masonry-item-inner arast-logos-image ">
                            {
                                logo.CollectionFiles[0].slice(0,6).map(element => (
                                    <div class="col-md-4 col-4"><img className="arast-image-collection" src={config.staticFile + element.AssetsStaticFile} loading="lazy" alt="Image 1" /></div>

                                ))
                            }

                            <h6 className="txt-collection">{logo.CollectionName}</h6>

                        </div>
                    </div>
                ))
            }


        </div>
    </>);
}

export default LogoTab;