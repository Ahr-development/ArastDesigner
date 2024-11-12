
import NavbarTools from '../components/Navbar/NavbarTools';
import MainSideBar from '../components/SideBar/MainSideBar';
import MenuSideBar from '../components/SideBar/MenuSideBar';
import Canvas from '../components/Editor/Canvas';
import MainNavbar from '../components/Navbar/MainNavbar';
import Layer from '../components/LeftSideBar/Layer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InitCanva, adjustZoom, init } from '../js/SetupEditor';
import { useParams } from 'react-router-dom';
import { GetUserDesignAction, LoadMoreStoreDesignForFirstTimeAction } from '../Actions/DesignAction';
import { setCanvasLoaderControl, setChangeLastDesignLength, setUserDesignLoaderControl } from '../Actions/InitAppAction';
import { GetStoreAction, GetStoreDesignAction } from '../Actions/StoreAction';
import MobileNavbar from '../components/Navbar/MobileNavbar';




const Home = () => {
    const { link } = useParams();
    const user = useSelector((state) => state.IUser);
    const design = useSelector((state) => state.IDesign);
    const control = useSelector((state) => state.IControlLoaders);
    const fonts = useSelector((state) => state.IFonts);
    const store = useSelector((state) => state.IStore);
    const storeDesign = useSelector((state) => state.IStoreDesign);
    const designManager = useSelector((state) => state.IDesignController);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetUserDesignAction(user.UserId, user.ServerToken, link))


    }, [])


    useEffect(() => {
        if (design.length !== 0) {
            dispatch(GetStoreAction(user.UserId, user.ServerToken))
            dispatch(GetStoreDesignAction(link, user.SToken))
            document.title = "آراست - " + design[0].DesignName;

        }

    }, [design])


    return (
        <>
            {
                design.length !== 0 && fonts.length !== 0 ? (<>

                    <MainNavbar />
                    <MenuSideBar />
                    <NavbarTools />
                    <Canvas link={link} />
                    <Layer />
                    <MobileNavbar/>
             


                </>) : (<>


                </>)


            }






        </>
    );
}









export default Home;