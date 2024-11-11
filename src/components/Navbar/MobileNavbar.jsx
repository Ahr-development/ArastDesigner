import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import PopupMobileManager from '../Popup/MobileNavbarPopup/PopupMobileManager';



const MobileNavbar = () => {
    const [openPopup,setOpenPopup] = useState(false)
    const [tab,setTab] = useState(null)

    const handleTabs = (tabName) => {
        setOpenPopup(true)

        if (tab == tabName) {
            setOpenPopup(!openPopup)
            setTab(null)
        }
        else{
            setOpenPopup(true)
        }

        setTab(tabName)
    }

    return (<>

        {/*         <div className='arast-mobile-navbar'>

            <div className='arast-li-mobile'>
                <span class="material-icons arast-mobile-icon">wallpaper</span>
                <h6 className='arast-text-navbar-mobile'>طرحها</h6>
            </div>

            <div className='arast-li-mobile'>
                <span class="material-icons arast-mobile-icon">title</span>

                <h6 className='arast-text-navbar-mobile'>متن</h6>
            </div>


            <div className='arast-li-mobile'>
                <span class="material-icons arast-mobile-icon">add_photo_alternate</span>

                <h6 className='arast-text-navbar-mobile'>بارگذاریها</h6>
            </div>

            <div className='arast-li-mobile'>
                <span class="material-icons arast-mobile-icon">palette</span>

                <h6 className='arast-text-navbar-mobile'>عناصر</h6>
            </div>


            <div className='arast-li-mobile'>
                <span class="material-icons arast-mobile-icon">category</span>

                <h6 className='arast-text-navbar-mobile'>شکل ها</h6>
            </div>


            <div className='arast-li-mobile'>
                <span class="material-icons arast-mobile-icon">tune</span>

                <h6 className='arast-text-navbar-mobile'>انتشار</h6>
            </div>
            <div className='arast-li-mobile'>
                <span class="material-icons arast-mobile-icon">star</span>

                <h6 className='arast-text-navbar-mobile'>برنامه ها</h6>
            </div>
        </div> */}


        {
            openPopup ? (<>
            
                <PopupMobileManager tab={tab}/>
            
            </>) : (<>
            
            
              
            </>)
        }


        <div className='arast-mobile-navbar'>
            <Swiper

                spaceBetween={5}
                slidesPerView={5}

                breakpoints={{
                    // when window width is <= 640px
                    640: {
                        slidesPerView: 6,
                        spaceBetween: 5
                    }
                }}
            >

                <SwiperSlide  >
                    <div className='arast-li-mobile' onClick={() => handleTabs("Designs")}>
                        <span class="material-icons arast-mobile-icon">wallpaper</span>

                        <h6 className='arast-text-navbar-mobile'>طرحها</h6>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className='arast-li-mobile' onClick={() => handleTabs("Text")}>
                        <span class="material-icons arast-mobile-icon">title</span>

                        <h6 className='arast-text-navbar-mobile'>متن</h6>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className='arast-li-mobile' onClick={() => handleTabs("Uploads")}>
                        <span class="material-icons arast-mobile-icon">add_photo_alternate</span>

                        <h6 className='arast-text-navbar-mobile'>بارگذاریها</h6>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className='arast-li-mobile' onClick={() => handleTabs("Assets")}>
                        <span class="material-icons arast-mobile-icon">palette</span>

                        <h6 className='arast-text-navbar-mobile'>عناصر</h6>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className='arast-li-mobile' onClick={() => handleTabs("Shapes")}>
                        <span class="material-icons arast-mobile-icon">category</span>

                        <h6 className='arast-text-navbar-mobile'>شکل ها</h6>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className='arast-li-mobile' onClick={() => handleTabs("Publish")}>
                        <span class="material-icons arast-mobile-icon">tune</span>

                        <h6 className='arast-text-navbar-mobile'>انتشار</h6>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className='arast-li-mobile' onClick={() => handleTabs("Apps")}>
                        <span class="material-icons arast-mobile-icon">star</span>

                        <h6 className='arast-text-navbar-mobile'>برنامه ها</h6>
                    </div>
                </SwiperSlide>

            </Swiper>

        </div>



    </>);
}

export default MobileNavbar;