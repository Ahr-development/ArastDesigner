import { useState } from "react";
import MainSideBar from "./MainSideBar";
import { useSelector } from "react-redux";
import AssetPopup from "../Popup/SideBarPopup/AssetPopup";



const MenuSideBar = () => {
    const [open, setOpen] = useState(true)
    const [toolsSelected, setToolsSelected] = useState("Frames")
    const [buttonSelected, setButtonSelected] = useState(null)
    const popupState = useSelector((state) => state.IPopup);
    const user = useSelector((state) => state.IUser);

    const array = ["Arast-btn-frames", "Arast-btn-text", "Arast-btn-image",
        "Arast-btn-shapes", "Arast-btn-elements", "Arast-btn-icons","Arast-btn-adjust"
        ]


    let ControlContent = (selected, id) => {
        let button = document.getElementById(id)
        let toolbar = document.getElementById("NavbarTools")
        const body = document.getElementById("Arast-body")

        setOpen(true)
        toolbar.classList.remove("NavbarTools-PaddingClose")
        toolbar.classList.add("NavbarTools-PaddingOpen")
        if (toolsSelected == selected) {
            setOpen(!open)
            if (button.classList.contains('active')) {
                button.classList.remove('active')
            }
            else {
                button.classList.add('active')
            }

            if (open == true) {
                toolbar.classList.remove("NavbarTools-PaddingOpen")
                toolbar.classList.add("NavbarTools-PaddingClose")

            }

            body.style.paddingLeft = "74px"
        }
        else {
            setOpen(true)
            setToolsSelected(selected)
            array.forEach(e => {
                if (e != id) {
                    let buttonCurrent = document.getElementById(e)
                    buttonCurrent.classList.remove('active')
                }
                else {
                    button.classList.add('active')

                }

            });

            toolbar.classList.remove("NavbarTools-PaddingClose")
            toolbar.classList.add("NavbarTools-PaddingOpen")


            body.style.paddingLeft = "415px"

        }




    }


    const OpenOrCloseTabWithController = (command) => {
        if (command) {
            let open = document.getElementById("Arast-toggle-left")
            setOpen(command)
            open.style.left = "415px"


        } else {

            let close = document.getElementById("Arast-toggle-left")
            setOpen(command)
            close.style.left = "74px"
        }
    }



    return (<>

        <div id="Arast-icon-menu">

            <button onClick={() => {
                ControlContent("Frames", "Arast-btn-frames")
            }} id="Arast-btn-frames" type="button" class="Arast-icon-menu-btn active" data-target="#Arast-frames">
                <span class="material-icons">wallpaper</span><span class="Arast-icon-menu-title">طرحها</span>
            </button>
            <button onClick={() => {
                ControlContent("Text", "Arast-btn-text")
            }} id="Arast-btn-text" type="button" class="Arast-icon-menu-btn" data-target="#Arast-text">
                <span class="material-icons">title</span><span class="Arast-icon-menu-title">متن</span>
            </button>
            <button onClick={() => {
                ControlContent("Upload", "Arast-btn-image")
            }} id="Arast-btn-image" type="button" class="Arast-icon-menu-btn" data-target="#Arast-image">
                <span class="material-icons">add_photo_alternate</span><span class="Arast-icon-menu-title">بارگذاریها</span>
            </button>

            <button onClick={() => {
                ControlContent("Asset", "Arast-btn-icons")
            }} id="Arast-btn-icons" type="button" class="Arast-icon-menu-btn" data-target="#Arast-icons">
                <span class="material-icons">palette</span><span class="Arast-icon-menu-title">عناصر</span>
            </button>

            <button onClick={() => {
                ControlContent("Shapes", "Arast-btn-shapes")
            }} id="Arast-btn-shapes" type="button" class="Arast-icon-menu-btn" data-target="#Arast-shapes">
                <span class="material-icons">category</span><span class="Arast-icon-menu-title">شکل ها</span>
            </button>

{/* 
            <button onClick={() => {
                ControlContent("Draw", "Arast-btn-draw")
            }} id="Arast-btn-draw" type="button" class="Arast-icon-menu-btn" data-target="#Arast-draw">
                <span class="material-icons">brush</span><span class="Arast-icon-menu-title">قلم مو</span>
            </button> */}

            {
                user.RoleId == 4 ? (<>
                    <button id="Arast-btn-adjust" type="button" class="Arast-icon-menu-btn" onClick={() => {
                        ControlContent("Adjust", "Arast-btn-adjust")
                    }} data-target="#Arast-adjust">
                        <span class="material-icons">tune</span><span class="Arast-icon-menu-title">انتشار</span>
                    </button>
                </>) : (<></>)
            }


            <button onClick={() => {
                ControlContent("Apps", "Arast-btn-elements")
            }} id="Arast-btn-elements" type="button" class="Arast-icon-menu-btn" data-target="#Arast-elements">
                <span class="material-icons">star</span><span class="Arast-icon-menu-title">برنامه ها</span>
            </button>
            {/*           <button onClick={() => {
                ControlContent("QrCode", "Arast-btn-qrcode")
            }} id="Arast-btn-qrcode" type="button" class="Arast-icon-menu-btn" data-target="#Arast-qrcode">
                <span class="material-icons">qr_code</span><span class="Arast-icon-menu-title">QR کد</span>
            </button> */}
            {/*
            <button onClick={() => {
                ControlContent("Setting", "Arast-btn-settings")
            }} id="Arast-btn-settings" type="button" class="Arast-icon-menu-btn stick-to-bottom" data-target="#Arast-settings">
                <span class="material-icons">settings</span><span class="Arast-icon-menu-title">تنظیمات</span>
            </button> */}
        </div>

        {

            open ? (<>
                <MainSideBar selected={toolsSelected} />

            </>) : (<>


            </>)



        }


        {/*     <div onClick={() => OpenOrCloseTabWithController(!open)} id="Arast-toggle-left"><span class="material-icons">chevron_left</span></div>
 */}
    </>);
}

export default MenuSideBar;