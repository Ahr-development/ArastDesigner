import Lottie from "lottie-web";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DesignCollectionModal from "../../Modal/DesignCollectionModal";
import { setModalAddDesignCollection } from "../../../Actions/InitAppAction";
import { GetStoreDesignCollectionAction } from "../../../Actions/StoreAction";
import Adjust from "./Adjust";




const AdjustCollection = ({mode}) => {

    const [load, setLoad] = useState(true)
    const designCollection = useSelector((state) => state.IDesignCollection);
    const modal = useSelector((state) => state.IModal);
    const store = useSelector((state) => state.IStore);
    const user = useSelector((state) => state.IUser);

    const dispatch = useDispatch()

    useEffect(() => {

        if (load) {
            fetch('/json/box.json')
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

        }

        dispatch(GetStoreDesignCollectionAction(store.Id, user.ServerToken))


    }, [])



    useEffect(() => {

        switch (modal.ResultAddCollectionModal) {
            case 1:

                setLoad(false)
                break;

            case 2:

                break;

            default:
                break;
        }
    }, [modal.ResultAddCollectionModal])


    const handleCreateCollection = () => {
        const modal = {
            AddDesignCollectionModal: true,
            ResultAddCollectionModal: 2
        }
        dispatch(setModalAddDesignCollection(modal))
    }


    return (<>





        {

            Object.keys(designCollection).length !== 0 && designCollection.length == 0 ? (<>
                <div id="myLottie"></div>
                <br />
                <h3 className="text-center">پوشه ندارید</h3>
                <br />
                <p className="text-center">در حال حاضر شما نمیتوانید بدون پوشه محصولتان را انتشار دهید لطفا روی دکمه زیر کلیک کنید تا به قسمت افزودن پوشه جدید هدایت شوید</p>
                <div className="row">
                    <button id="Arast-resize-apply" type="button" onClick={() => handleCreateCollection()} class="Arast-btn btn-full primary">ایجاد پوشه جدید</button>


                </div>


            </>) : (<>


                <Adjust collection={true} mode={mode} />


            </>)

        }


        {
            modal.AddDesignCollectionModal ? (<>
                <DesignCollectionModal />
            </>) : (<></>)

        }

    </>);
}

export default AdjustCollection;