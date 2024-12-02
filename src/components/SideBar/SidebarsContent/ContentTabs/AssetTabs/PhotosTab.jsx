
import Lottie from 'lottie-web';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import ShowImageDynamic from '../../../../Common/ShowImageDynamic';
import { useDispatch, useSelector } from 'react-redux';
import { setPopup } from '../../../../../Actions/InitAppAction';
import Masonry from 'react-masonry-css';
import config from "../../../../../Services/config.json"
import { GetAssetExpireLinkService } from '../../../../../Services/assetService';
import { debounce } from "lodash";



const PhotosTab = () => {


    const [load, setLoad] = useState(false)
    const [accessInPhotos, setAccessInPhotos] = useState(false)

    const assets = useSelector((state) => state.IAssets);
    const user = useSelector((state) => state.IUser);
    const app = useSelector((state) => state.InitApp);

    const assetsCategory = useSelector((state) => state.IAssetCategories.subCategory.subPhotos);
    const dispatch = useDispatch()

    const breakpointColumnsObj = {
        default: 2,
        1100: 3,
        700: 2,
        500: 3
    };

    const openPopup = (id) => {
        const popup = {
            SendId: id,
            PopupName: "asset",
        }
        dispatch(setPopup(popup))
    }

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


    const handleAddToCanvas = async (Id) => {

        setAccessInPhotos(true)
        const { data } = await GetAssetExpireLinkService(user.UserId, user.ServerToken, Id)


        if (data) {
            console.log(data);

            fabric.Image.fromURL(data, function (img) {
                // تنظیمات اولیه تصویر مانند مقیاس یا موقعیت
                img.set({
                    angle: 0,
                    opacity: 1.0,
                    left: 100,
                    top: 100,
                    selectable: true,
                });



                var canvasWidth = app.originalWidth
                var canvasHeight = app.originalHeight
            
                // اندازه اصلی تصویر
                var imgWidth = img.width;
                var imgHeight = img.height;
            
                // محاسبه مقیاس متناسب
                var scaleX = canvasWidth / imgWidth;
                var scaleY = canvasHeight / imgHeight;
                var scale = Math.min(scaleX, scaleY);
            
                // اعمال مقیاس به تصویر
                img.scale(scale);



            
                // اضافه کردن گروه به Canvas
                app.canvas.add(img);
                app.canvas.requestRenderAll();
                setAccessInPhotos(false)

            }, { crossOrigin: 'anonymous' }); // تنظیم crossOrigin برای جلوگیری از مشکلات CORS
            

        }
    }

    return (
        <>
            {
                load ? (<>
                    <div id="myLottie"></div>
                </>
                ) : (<>
                    <div className=''>

                        <div className='row'>
                            <input placeholder='جستجو...' className='text-center input arast-search-sidebar' />
                        </div>
                        <br />
                        <Swiper
                            modules={Navigation}

                            spaceBetween={5}
                            slidesPerView={3}
                            navigation
                            breakpoints={{
                                // when window width is <= 640px
                                640: {
                                    slidesPerView: 1.5,
                                    spaceBetween: 5
                                }
                            }}
                        >
                            {

                                assetsCategory.map(element => (
                                    <SwiperSlide >
                                        <ShowImageDynamic classImage="designsImage" url={"https://bayanbox.ir/download/2713855948205172511/purple-blueSpace-wallpaperz.blog.ir.jpg"} />
                                    </SwiperSlide>
                                ))

                            }

                        </Swiper>
                        <br />
                        {/*                     <div className="container">
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
                        </div> */}



                        <div className="">

                            <div className="row">

                                {
                                    accessInPhotos ? (<>
                                        <div className='arast-access-in'>

                                        </div>
                                        </>) : (<></>)
                                }

                                <Masonry breakpointCols={breakpointColumnsObj}
                                    className="my-masonry-grid"
                                    columnClassName="my-masonry-grid_column">

                                    {
                                        assets.photos.map(element => (
                                            <div className=" arast-logos" >
                                                <img className="width-100" src={config.staticFile + element.AssetsStaticFile} onClick={() => handleAddToCanvas(element.Id)} />
                                                <div class="dots" onClick={() => openPopup(12)} ></div>
                                                <div class="popup"></div>

                                            </div>

                                        ))
                                    }




                                </Masonry>


                            </div>
                        </div>




                        <div id='arast-photos-loader' class="Arast-frame arast-loader-sidebar" >
                            <div class="Arast-img-wrap">
                                <div class="Arast-img-loader"></div><img class="lazy" />
                            </div>

                        </div>
                    </div>



                </>)
            }

        </>
    )



}

export default PhotosTab;