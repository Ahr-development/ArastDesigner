import { useContext, useEffect, useState } from "react";
import History from "./History";
import { useDispatch, useSelector } from "react-redux";
import { SaveDesignService, UpdateUserDesignNameService } from "../../Services/designService";
import StoreModal from "../Modal/StoreModal";
import { setExportModalAction, setShowModalAllChildrenDesign } from "../../Actions/InitAppAction";
import ExportModal from "../Modal/ExportModal";
import ShowAllUserDesigns from "../Modal/ShowAllUserDesigns";
import  Swal  from 'sweetalert2';
import TextBoxChangeContentModal from "../Modal/TextBoxChangeContentModal";



const MainNavbar = () => {

    const [profileOpen, setProfileOpen] = useState(false)
    const [historyOpen, setHistoryOpen] = useState(false)
    const [newNameDesign, setNewNameDesign] = useState("")
    const app = useSelector((state) => state.InitApp);
    const user = useSelector((state) => state.IUser);
    const design = useSelector((state) => state.IDesign);
    const modal = useSelector((state) => state.IModal);
    const currentDesignIndex = useSelector((state) => state.IDesignController.CurrentActiveDesignIndex);

    const dispatch = useDispatch()
    const BlankCanvas = () => {
        //setFileName(new Date().getTime(), '');
        //init('canvas');
    };


    const handleUpdateUserDesignName = async () => {
        const input = document.getElementById("nameOfDesign")
        if (input.value !== null && input.value !== "" && input.value !== " " && input.value !== "دیزاین بدون عنوان" ) {
            const {status} = await UpdateUserDesignNameService(user.ServerToken,user.UserId,design[currentDesignIndex].Id,input.value)
            if (status == 200) {
                document.getElementById("arast-span-change-name").innerHTML = "check_circle"
                document.getElementById("arast-btn-change-name").style.backgroundColor = "green"
                setNewNameDesign(input.value)
                document.title = "آراست - " + input.value;
                design[currentDesignIndex].DesignName = input.value
                
                Swal.fire({
                    icon: "success",
                    title: "موفق",
                    text: "تغییر نام با موفقیت انجام شد",
                    footer: '<a href="/Faq">سوالات متداول آراست</a>'
                });
            }
        }
        else{
            Swal.fire({
                icon: "info",
                title: "چیزی ننوشتی که",
                text: "لطفا یک مقدار معتبر برای نام دیزاین انتخاب نمایید",
                footer: '<a href="/Faq">سوالات متداول آراست</a>'
            });
        }
    }

    const handleExport = () => {
        dispatch(setExportModalAction(true))
    };

    const handleShowDesigns = () => {
        dispatch(setShowModalAllChildrenDesign(true))
    }

    const handleDownload = async () => {

        /*         const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');   
            
                link.href = url;
                link.download = 'data.json';
                link.click();   
             */
    };

    useEffect(() => {
       if (design.length !== 0) {
        setNewNameDesign(design[currentDesignIndex].DesignName)
       }
    }, [design])


    useEffect(() => {
        if (design.length !== 0) {
         setNewNameDesign(design[currentDesignIndex].DesignName)
        }
     }, [currentDesignIndex])
 
    return (<>


        <div id="Arast-top-bar">

            <div class="Arast-logo">
                <img class="logo-desktop" src="/img/desktop.png" />
                <img class="logo-mobile" src="/img/Mobile.png" />
            </div>

            <div class="Arast-top-bar-menu">

                <div class="Arast-undo">
                    <button id="Arast-undo" onClick={() => handleShowDesigns()} type="button" class="Arast-btn-simple tooltip" data-title="صفحات" autocomplete="off" ><span class="material-icons">library_add</span></button>

                </div>

                <div class="Arast-redo">
                    <button id="Arast-redo" onClick={() => handleExport()} type="button" class="Arast-btn-simple tooltip" data-title="دانلود" autocomplete="off" ><span class="material-icons">download</span></button>

                </div>

                <div class="Arast-history">
                    <button id="Arast-history" type="button" onClick={() => setHistoryOpen(!historyOpen)} class="Arast-btn-simple Arast-modal-open tooltip" data-title="تاریخچه" autocomplete="off" data-target="#modal-history" ><span class="material-icons">history</span></button>
                </div>
                {/* 
                <div class="Arast-new">
                    <button id="Arast-new" onClick={() => handleDownload()} type="button" class="Arast-btn primary Arast-modal-open" autocomplete="off" data-target="#modal-add-new"><span class="material-icons">add_circle</span><span class="Arast-btn-text">جدید</span></button>
                </div>
 */}
                <div class="Arast-save">
                    <button id="arast-save" type="button" class="Arast-btn primary Arast-modal-open" autocomplete="off" data-target="#modal-save" disabled> <span class="material-icons">save</span><span class="Arast-btn-text" >ذخیره شده </span>  </button>
                </div>

                <div class="Arast-user-menu">
                    <div id="Arast-user-menu" class="Arast-dropdown-wrap">
                        <img alt="avatar" src='/img/avatar.png' onClick={() => {
                            profileOpen ? (setProfileOpen(false)
                            ) : (setProfileOpen(true)
                            )
                        }} /><span onClick={() => {
                            profileOpen ? (setProfileOpen(false)
                            ) : (setProfileOpen(true)
                            )
                        }} class="material-icons">arrow_drop_down</span>




                    </div>
                </div>


            </div>


        </div>


        {profileOpen ?
            (
                <>
                    <div class="ArastProfile">

                        <div className="container">

                            <div className="row">

                                <div className="col-8 ArastProfileName">
                                    <div class="group">
                                        <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon">
                                            <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
                                        </svg>
                             
                                     
                                                <input class="input" onChange={(e) => setNewNameDesign(e.target.value)} value={newNameDesign} id="nameOfDesign" placeholder="نام دیزاین" />


                                    </div>

                                </div>

                                <div className="col-4">
                                    <button type="button" id="arast-btn-change-name" class="Arast-btn danger" onClick={() => handleUpdateUserDesignName()} ><span class="material-icons" id="arast-span-change-name">remove_circle</span><span class="Arast-btn-text">تغییر نام</span></button>
                                </div>

                            </div>


                            <div className="ArastProfButtons">
                                <a onClick={() => handleExport()} className="custom-btn btn-1 fullWidth mb5 h-auto arast-btn-account">
                                    <div className="row">
                                        <div className="col-3">
                                            <span class="material-icons arast-icon-account">download</span>
                                        </div>
                                        <div className="col-9">
                                            <h1 className="arast-modal-account-text">دریافت خروجی دیزاین</h1>
                                        </div>
                                    </div>
                                </a>
                                <a className="custom-btn btn-1 fullWidth mb5 text-center">دانشگاه آراست</a>
                                <a className="custom-btn btn-1 fullWidth mb5 text-center">اشتراک گذاری طرح</a>
                                <a className="custom-btn btn-1 fullWidth mb5 text-center">بازگشت به داشبورد</a>

                            </div>
                        </div>



                    </div>




                </>
            )
            :
            (
                <>

                </>
            )
        }



        {historyOpen ?
            (
                <>
                    <History setOpen={historyOpen} />
                </>
            )
            :
            (
                <>

                </>
            )
        }



        {
            modal.ExportDesignModal ? (<>
                <ExportModal />

            </>) : (<>


            </>)
        }


        {
            modal.ShowAllUserDesignsModal ? (<>
                <ShowAllUserDesigns />

            </>) : (<>


            </>)
        }



{
            modal.EditTextBoxContentModal ? (<>
                <TextBoxChangeContentModal />

            </>) : (<>


            </>)
        }



    </>
    );
}

export default MainNavbar;