import React, { useEffect, useState } from "react";
import AssetPopup from "../../../../Popup/SideBarPopup/AssetPopup";
import { useDispatch, useSelector } from "react-redux";
import { setAllAssetTabLoaderControl, setAssetTab, setPopup } from "../../../../../Actions/InitAppAction";
import Masonry from "react-masonry-css";
import config from "../../../../../Services/config.json"
import LazyLoad from 'react-lazyload';
import { usePopper } from "react-popper";




const AllAssetTab = () => {


    const dispatch = useDispatch();
    const popupState = useSelector((state) => state.IPopup);
    const assets = useSelector((state) => state.IAssets);
    const control = useSelector((state) => state.IControlLoaders);
    const [assetsLoaded, setAssetsLoaded] = useState(false)

    const [showPopup, setShowPopup] = useState(false);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom', // محل پیش‌فرض
        modifiers: [
            {
                name: 'arrow',
                options: {
                    element: arrowElement,
                },
            },
            {
                name: 'flip',
                options: {
                    fallbackPlacements: ['top', 'right', 'left'],
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    boundary: 'viewport',
                },
            },
        ],
    });

    const togglePopup = (element,id) => {
        setReferenceElement(element);
        setShowPopup(!showPopup);
        const popup = {
            SendId: id,
            PopupName: "asset",
        }
        dispatch(setPopup(popup))
    };



    const handleOpenPack = (Id,type) => {

        if (type == "sticker") {
            let initialState = {
                CategoryId: 0,
                HashtagName: null,
                TypeId : 0,
                SearchWord : null,
                ColorTag: null,
                IsActiveTab : true,
                StickerPackId : Id,
                LogoPackId : 0
            };
    
            dispatch(setAssetTab(initialState))
        }
        else{
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
   
        
    }



    const handleInsertIntoCanvas = async (id) => {

    }



    const breakpointColumnsObj = {
        default: 2,
        1100: 3,
        700: 2,
        500: 3
    };


    useEffect(() => {
        if (!control.AllAssetTab) {
            dispatch(setAllAssetTabLoaderControl(true))
        }
        
        console.log(assets.stickerCollections);
    }, [])


    useEffect(() => {
        setAssetsLoaded(true)
    }, [assets])


    const openCollection = (id) => {

    }

    return (<>
        {/*      <div className="container">
            <div className="row">
                <div className="col-3">
                    <p className="">بیشتر ...</p>
                </div>
                <div className="col-9 ">
                    <h4 className="txtLeftToRight">اخیرا استفاده کردید</h4>
                </div>

            </div>

            <div className="row arast-horizontal-content">
                <div className="row displayInline">
                    <img className="content-horizontal" src="https://vexera.ir/wp-content/uploads/2023/12/forza-horizon-5-for-xbox-series-s_k5zc.jpg" />
                    <img className="content-horizontal" src="/svg/logos/microsoft.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/microsoft.svg" />
                    <img className="content-horizontal" src="https://vexera.ir/wp-content/uploads/2023/12/forza-horizon-5-for-xbox-series-s_k5zc.jpg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="https://www.w3schools.com/howto/img_nature_wide.jpg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                </div>
                <div className="row displayInline">
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/microsoft.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/microsoft.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />

                </div>
            </div>
        </div>
 */}


        {  /*   <div className="container">
            <div className="row">
                <div className="col-3">
                    <p className="">بیشتر ...</p>
                </div>
                <div className="col-9 ">
                    <h4 className="txtLeftToRight">لوگو های پرطرفدار</h4>
                </div>

            </div>

            <div className="row arast-horizontal-content">
                <div className="row displayInline">
                    <img className="content-horizontal" src="https://vexera.ir/wp-content/uploads/2023/12/forza-horizon-5-for-xbox-series-s_k5zc.jpg" />
                    <img className="content-horizontal" src="/svg/logos/microsoft.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/microsoft.svg" />
                    <img className="content-horizontal" src="https://vexera.ir/wp-content/uploads/2023/12/forza-horizon-5-for-xbox-series-s_k5zc.jpg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="https://www.w3schools.com/howto/img_nature_wide.jpg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                    <img className="content-horizontal" src="/svg/logos/apple.svg" />
                </div>

            </div>
        </div> */
        }


        <div className="">
            <div className="row">
                <div className="col-3">
                    <p className="">بیشتر ...</p>
                </div>
                <div className="col-9 ">
                    <h4 className="txtLeftToRight">لوگوهایی که لازمه</h4>
                </div>

            </div>
        </div>

        <div class="arast-collection">
            {
                assetsLoaded ? (
                    <>
                        {
                            assets.logoCollections.map((element, index) => (
                                <div class="row g-1 Arast-masonry-item-inner arast-collection-row " onClick={() => handleOpenPack(element.CollectionId,"logo")}>
                                    {
                                        element.CollectionFiles[0].slice(0, 6).map(element => (
                                            <div class="col-md-4 col-4"><img className="arast-image-collection" src={config.staticFile + element.AssetsStaticFile} loading="lazy" alt="Image 1" /></div>

                                        ))
                                    }

                                    <h6 className="txt-collection">{element.CollectionName}</h6>

                                </div>
                            ))
                        }


                    </>

                ) : (

                    <>



                    </>
                )


            }



        </div>



        <br />




        <div className="">
            <div className="row">
                <div className="col-3">
                    <p className="">بیشتر ...</p>
                </div>
                <div className="col-9 ">
                    <h4 className="txtLeftToRight">عکس ها</h4>
                </div>

            </div>
            <div className="row">

                <Masonry breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">

                    {
                        assets.photos.map(element => (
                            <div className=" arast-logos">
                                <LazyLoad>
                                    <img className="width-100" loading="lazy" src={config.staticFile + element.AssetsStaticFile} />

                                </LazyLoad>
                                <div class="dots" onClick={(e) => togglePopup(e.currentTarget,element.Id)} ></div>

                            </div>

                        ))
                    }




                </Masonry>


            </div>
        </div>

        <br />




        {/*     <div className="">
            <div className="row">
                <div className="col-3">
                    <p className="">بیشتر ...</p>
                </div>
                <div className="col-9 ">
                    <h4 className="txtLeftToRight">استیکر ها</h4>
                </div>

            </div>
            <div className="row">
                <div className="col-6 arast-logos">
                    <img className="width-111" src="https://vexera.ir/wp-content/uploads/2023/12/forza-horizon-5-for-xbox-series-s_k5zc.jpg" />
                    <div class="dots" onClick={() => openPopup(12)} ></div>
                    <div class="popup"></div>

                </div>

                <div className="col-6 arast-logos">
                    <img className="width-111" src="https://vexera.ir/wp-content/uploads/2023/12/forza-horizon-5-for-xbox-series-s_k5zc.jpg" />
                    <div class="dots" onClick={() => openPopup(12)} ></div>
                    <div class="popup"></div>

                </div>

                <div className="col-6 arast-logos">
                    <img className="width-111" src="https://vexera.ir/wp-content/uploads/2023/12/forza-horizon-5-for-xbox-series-s_k5zc.jpg" />
                    <div class="dots" onClick={() => openPopup(12)} ></div>
                    <div class="popup"></div>

                </div>

                <div className="col-6 arast-logos">
                    <img className="width-111" src="https://vexera.ir/wp-content/uploads/2023/12/forza-horizon-5-for-xbox-series-s_k5zc.jpg" />
                    <div class="dots" ></div>
                    <div class="popup"></div>

                </div>


                <div className="col-6 arast-logos">
                    <img className="width-111" src="https://cdn.pixabay.com/photo/2018/05/13/20/21/lake-3397784_1280.jpg" />
                    <div class="dots" ></div>
                    <div class="popup"></div>

                </div>


                <div className="col-6 arast-logos">
                    <img className="width-111" src="https://cdn.pixabay.com/photo/2018/05/13/20/21/lake-3397784_1280.jpg" />
                    <div class="dots" onClick="handleDotsClick()"></div>
                    <div class="popup"></div>

                </div>
            </div>
        </div> */}



        <br />

        <div className="">
            <div className="row">
                <div className="col-3">
                    <p className="">بیشتر ...</p>
                </div>
                <div className="col-9 ">
                    <h4 className="txtLeftToRight">استیکر ها</h4>
                </div>

            </div>
        </div>

        <div class="arast-collection">
            {
                assetsLoaded ? (
                    <>
                        {
                            assets.stickerCollections.map((element, index) => (
                                <div class="row g-1 Arast-masonry-item-inner arast-collection-row " onClick={() => handleOpenPack(element.CollectionId,"sticker")} >
                                    {
                                        element.CollectionFiles[0].slice(0, 6).map(element => (
                                            <div class="col-md-4 col-4"><img className="arast-image-collection" src={config.staticFile + element.AssetsStaticFile} loading="lazy" alt="Image 1" /></div>

                                        ))
                                    }

                                    <h6 className="txt-collection">{element.CollectionName}</h6>

                                </div>
                            ))
                        }


                    </>

                ) : (

                    <>



                    </>
                )


            }






        </div>




        {showPopup && (
            <div
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="popup"
            >
                {/* محتوای مودال */}
                <div ref={setArrowElement} style={styles.arrow} className="arrow" >
                    <AssetPopup />
                </div>
            </div>
        )}


    </>);


}

export default React.memo(AllAssetTab);
