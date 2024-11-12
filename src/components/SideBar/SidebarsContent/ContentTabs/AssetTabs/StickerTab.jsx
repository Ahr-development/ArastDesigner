import Lottie from 'lottie-web';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import ShowImageDynamic from '../../../../Common/ShowImageDynamic';
import { useDispatch, useSelector } from 'react-redux';
import { setAssetTab, setPopup } from '../../../../../Actions/InitAppAction';
import Masonry from 'react-masonry-css';
import config from "../../../../../Services/config.json"
import { getAssetPackByIdAction } from '../../../../../Actions/AssetsAction';


const StickerTab = () => {
    const [load, setLoad] = useState(false)

    const assets = useSelector((state) => state.IAssets);
    const assetsCategory = useSelector((state) => state.IAssetCategories.subCategory.subPhotos);
    const dispatch = useDispatch()


    useEffect(() => {

        fetch('/json/animateLoader.json')
            .then((response) => response.json())
            .then((data) => {
                const options = {
                    container: document.getElementById('myLottie'),
                    animationData: data, // داده‌های JSON Lottie
                    loop: true, // انیمیشن را به صورت حلقه پخش کنید
                    autoplay: true, // انیمیشن را به طور خودکار پخش کنید
                };


                Lottie.loadAnimation(options);

                // ... انیمیشن را با data راه اندازی کنید ...
            });

    }, [])



    const handleOpenPack = (Id) => {
        let initialState = {
            CategoryId: 0,
            HashtagName: null,
            TypeId : 0,
            SearchWord : null,
            ColorTag: null,
            IsActiveTab : true,
            StickerPackId : Id
        };

        dispatch(setAssetTab(initialState))
        
    }


    return (
        <>
            {
                load ? (<>
                    <div id="myLottie"></div>
                </>
                ) : (<>
                    <div className=''>
                        <div className="row g-1">
                            {
                                assets.stickerCollections.map((sticker) => (
                                    <div onClick={() => handleOpenPack(sticker.CollectionId)} className="col-6">
                                        <div class="row g-1 Arast-masonry-item-inner arast-logos-image ">
                                            {
                                                sticker.CollectionFiles[0].slice(0, 6).map(element => (
                                                    <div class="col-md-4 col-4"><img className="arast-image-collection" src={config.staticFile + element.AssetsStaticFile} loading="lazy" alt="Image 1" /></div>

                                                ))
                                            }

                                            <h6 className="txt-collection">{sticker.CollectionName}</h6>

                                        </div>
                                    </div>
                                ))
                            }


                        </div>

                    </div>
                </>)
            }

        </>
    )

}

export default StickerTab;