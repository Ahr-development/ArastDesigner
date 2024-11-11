import { useDispatch, useSelector } from "react-redux";
import { setModalAddDesignCollection, setModalPublishDesignStore } from "../../Actions/InitAppAction";
import { useState } from "react";
import { CreateStoreDesignCollectionService } from "../../Services/storeService";
import { GetStoreDesignCollectionAction } from "../../Actions/StoreAction";






const DesignCollectionModal = () => {
    const dispatch = useDispatch()
    const [gift, setGift] = useState(false)
    const [collectionName, setCollectionName] = useState("")
    const [collectionPhone, setCollectionPhone] = useState("")
    const [collectionUserName, setCollectionUserName] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    const store = useSelector((state) => state.IStore);
    const user = useSelector((state) => state.IUser);

    const handleClose = (status) => {
        const modal = {
            AddDesignCollectionModal: false,
            ResultAddCollectionModal: status
        }
        dispatch(setModalAddDesignCollection(modal))
        dispatch(GetStoreDesignCollectionAction(store.Id,user.ServerToken))

    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // دسترسی به اولین فایل انتخاب شده
        setSelectedFile(file);
    };




    const handleSetGiftInformation = async () => {
        const btn = document.getElementById("btnCreateCollection")
        btn.style.backgroundColor = "green"
        btn.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text" id="text-btn-publish">در حال ارسال اطلاعات ...</div>
        `
        btn.disabled = true

        if (gift) {

            if (collectionName !== "" && collectionPhone !== "" && collectionUserName !== null) {
                const formData = new FormData();
                formData.append('CollectionLogo', selectedFile); // اضافه کردن فایل به FormData
                formData.append('CollectionName', collectionName); // اضافه کردن فایل به FormData
                formData.append('CollectionPhonesAccept', collectionPhone); // اضافه کردن فایل به FormData
                formData.append('CollectionGiftFrom', collectionUserName); // اضافه کردن فایل به FormData
                formData.append('StoreId', store.Id); // اضافه کردن فایل به FormData
                formData.append('CollectionStatus', gift); // اضافه کردن فایل به FormData
                formData.append('Stoken', user.ServerToken); // اضافه کردن فایل به FormData

                const { data } = await CreateStoreDesignCollectionService(formData)

                if (data == "OK") {
                    const modal = {
                        AddDesignCollectionModal: false,
                        ResultAddCollectionModal: 1
                    }
                    dispatch(GetStoreDesignCollectionAction(store.Id,user.ServerToken))
                    dispatch(setModalAddDesignCollection(modal))
                }
            }

        }
        else {

            if (collectionName !== "") {
                const formData = new FormData();

                formData.append('CollectionName', collectionName); // اضافه کردن فایل به FormData
                formData.append('StoreId', store.Id); // اضافه کردن فایل به FormData
                formData.append('CollectionStatus', gift); // اضافه کردن فایل به FormData
                formData.append('Stoken', user.ServerToken); // اضافه کردن فایل به FormData


                const { data } = await CreateStoreDesignCollectionService(formData)
                if (data == "OK") {
                    const modal = {
                        AddDesignCollectionModal: false,
                        ResultAddCollectionModal: 1
                    }
                    dispatch(GetStoreDesignCollectionAction(store.Id,user.ServerToken))
                    dispatch(setModalAddDesignCollection(modal))
                }
            }
        }

    }

    return (<>


        <div id="modal-history" class="Arast-modal arast-history" >
            <div class="Arast-modal-wrap">
                <div class="Arast-modal-inner">
                    <div class="Arast-modal-bg">
                        <h3 class="Arast-history-title">افزودن پوشه جدید<button onClick={() => handleClose(2)} id="Arast-clear-history" type="button"
                            class="Arast-btn danger"><span class="material-icons">clear</span>بستن</button>
                        </h3>

                        <hr />

                        <div className="row">
                            <h6 className="text-right arast-lable-input">نام پوشه</h6>

                            <input onChange={(e) => setCollectionName(e.target.value)} placeholder='نام پوشه' className='text-right input arast-search-sidebar' />

                        </div>
                        <br />
                        <input onChange={() => setGift(!gift)} type="checkbox" id="gift" />
                        <label for="gift">میخواهم برای کسی هدیه ارسال کنم</label>
                        <br />

                        {
                            gift ? (<>
                                <br />

                                <div className='row'>
                                    <div className="col-6">
                                        <h6 className="text-right arast-lable-input">نام و نام خانوادگی ارسال کننده</h6>

                                        <input placeholder='نام شما' onChange={(e) => setCollectionUserName(e.target.value)} className='text-right input arast-search-sidebar' />

                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-right arast-lable-input">تلفن گیرنده هدیه</h6>

                                        <input placeholder='شماره تلفن گیرنده ( اختیاری )' onChange={(e) => setCollectionPhone(e.target.value)} className=' text-right input arast-search-sidebar' />

                                    </div>
                                </div>
                                <br />

                                <h6 className="text-right arast-lable-input">فایل لوگوی دریافت کننده هدیه</h6>
                                <input onChange={(e) => handleFileChange(e)} id="logoFile" type="file" />
                                <br />

                            </>) : (<></>)

                        }


                        <br />

                        <button id="btnCreateCollection" onClick={() => handleSetGiftInformation()} className="Arast-btn btn-full primary arast-btn-success">ایجاد پوشه جدید</button>

                    </div>
                </div>
            </div>

        </div>




    </>);
}

export default DesignCollectionModal;