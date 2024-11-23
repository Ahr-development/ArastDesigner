
import { WebFont } from 'webfontloader';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select'
import { FontManager } from '../../../js/FontManager';
import { useSelector } from 'react-redux';
import { SketchPicker } from 'react-color'
import config from '../../../Services/config.json'



const TextTools = ({ object, isArray }) => {

    const fontManager = new FontManager();
    const app = useSelector((state) => state.InitApp);
    const accessObject = useSelector((state) => state.IObject);
    const fonts = useSelector((state) => state.IFonts);

    const [selectedFont, setSelectedFont] = useState(null);
    const [isLoadingFont, setIsLoadingFont] = useState(false);
    const [color, setColor] = useState('#000000');
    const [openColor, setOpenColor] = useState(false);
    const [openTools, setOpenTools] = useState(false);
    const [textTools, setTextTools] = useState(null);
    const [textAlign, setTextAlign] = useState(null);
    const [mappedFont, setMappedFont] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        // تابعی برای به‌روزرسانی عرض
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        // افزودن listener برای تغییر اندازه پنجره
        window.addEventListener('resize', handleResize);

        // پاک‌سازی listener هنگام خروج کامپوننت
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        // رابط کاربری را هنگام تغییر color به‌روزرسانی کنید
        document.getElementById("button-text-color2").style.background = color
    }, [color]);

    useEffect(() => {
        let fontOptions = []
        if (fontOptions.length == 0) {
            fontOptions = fonts.map(font => ({
                value: font.FontName,
                label: font.FontName,
                imageUrl: config.staticFile + font.FontStaticFileName,
                fontURL: "https://arastme.s3-website.ir-thr-at1.arvanstorage.ir/" + font.FontFileName,
            }));

            setMappedFont(fontOptions)
        }





    }, []);




    const setMobileMode = (e) => {
        const color = document.getElementById("arast-text-color")
        const font = document.getElementById("arast-text-font")
        const control = document.getElementById("arast-text-controls")

    }


    const CustomOption = (props) => {
        return (
            <div {...props.innerProps} className="custom-option">
                <img src={props.data.imageUrl} alt="" className='arast-img-fonts' />
            </div>
        );
    };


    useEffect(() => {
        if (isArray) {
            for (var i = 0; i < object.length; i++) {
                setColor(object[i].fill)
                switch (object[i].textAlign) {
                    case "left":
                        setTextAlign("format_align_left")
                        break;
                    case "right":
                        setTextAlign("format_align_right")
                        break;
                    case "center":
                        setTextAlign("format_align_center")
                        break;
                    case "justify":
                        setTextAlign("format_align_center")
                        break;
                    default:
                        break;
                }
                break
            }
        }
        else {
            setColor(object.fill)

            switch (object.textAlign) {
                case "left":
                    setTextAlign("format_align_left")
                    break;
                case "right":
                    setTextAlign("format_align_right")
                    break;
                case "center":
                    setTextAlign("format_align_center")
                    break;
                case "justify":
                    setTextAlign("format_align_center")
                    break;
                default:
                    break;
            }
        }



    }, [object])



    const handleSetRtlText = () => {
        object.set({
            direction: "rtl" // تنظیم جهت راست به چپ
        });
        object.setCoords(); // به‌روزرسانی مختصات

    }


    const handleChange = async selectedOption => {
        setSelectedFont(selectedOption);

        const fontName = selectedOption.value;
        const fontURL = selectedOption.fontURL;
        setIsLoadingFont(true); // نشانگر بارگیری را نمایش دهید
        await fontManager.loadFontAndApplyToObject(fontName, fontURL, object)
            .then(() => {
                if (isArray) {
                    for (var i = 0; i < object.length; i++) {
                        object[i].set('fontFamily', fontName);
                    }
                }
                else {
                    object.set('fontFamily', fontName);
                    object.setCoords(); // به‌روزرسانی مختصات
                    app.canvas.requestRenderAll();
                }
                app.canvas.requestRenderAll();
                setIsLoadingFont(false); // نشانگر بارگیری را مخفی کنید
            })
            .catch((error) => {
                console.error('Error loading font:', error);
                setIsLoadingFont(false); // نشانگر بارگیری را مخفی کنید
            });



    };

    const handleChangeColor = (colors) => {
        setColor(colors.hex)

        if (isArray) {
            for (var i = 0; i < object.length; i++) {
                object[i].set('fill', color);
                break
            }
        }
        else {
            object.set('fill', color);
        }

        app.canvas.requestRenderAll();

    }


    const handleOpenTextTools = (textTool) => {

        setTextTools(textTool)
        if (textTool == textTools) {
            if (!openTools) {
                setOpenTools(true)
            }
            else {
                setOpenTools(false)

            }
        }
        else {
            setOpenTools(true)
        }


    }


    const handleActiveTextAlign = (align) => {
        const left = document.getElementById("format-align-left-textTool")
        const right = document.getElementById("format-align-right-textTool")
        const center = document.getElementById("format-align-center-textTool")
        const justify = document.getElementById("format-align-justify-textTool")

        switch (align) {
            case "left":
                setTextAlign("format_align_left")
                right.classList.remove("active")
                center.classList.remove("active")
                justify.classList.remove("active")
                left.classList.add("active")

                break;
            case "right":
                setTextAlign("format_align_right")
                right.classList.add("active")
                center.classList.remove("active")
                justify.classList.remove("active")
                left.classList.remove("active")
                break;
            case "center":
                setTextAlign("format_align_center")
                right.classList.remove("active")
                center.classList.add("active")
                justify.classList.remove("active")
                left.classList.remove("active")
                break;
            case "justify":
                setTextAlign("format_align_center")
                right.classList.remove("active")
                center.classList.remove("active")
                justify.classList.add("active")
                left.classList.remove("active")
                break;
            default:
                break;
        }



        if (isArray) {
            for (var i = 0; i < object.length; i++) {
                object[i].set("textAlign", align)
            }
        }
        else {
            object.set("textAlign", align)
        }

        app.canvas.requestRenderAll();

    }

    return (<>

        <div className="container">
            <div className="row NavbarTools-row">


                <div className="col-2 col-md-2 col-xs-2 width-auto" id='arast-text-color' >


                    <button id="button-text-color2" style={{ background: color }} onClick={() => setOpenColor(!openColor)} type="button" class="Arast-btn custom-btn-no-border custom-color-button btn-1 btn-colorize"><span class="material-icons"></span></button>

                    {openColor &&
                        <SketchPicker color={color} onChange={(updatedColor) => handleChangeColor(updatedColor)} className='position-absolute toolbar-text-color' />
                    }

                </div>
                <div className={ width <= 1100 ? "col " : "col-6 col-sm-5 col-md-4"} id='arast-text-font'>

                    <Select value={selectedFont}
                        onChange={handleChange}
                        placeholder="انتخاب فونت"
                        options={mappedFont}
                        components={{ Option: CustomOption }}
                    />
                    {isLoadingFont && <div className="loading-indicator">در حال بارگذاری ...</div>}



                </div>


                {

                    width <= 1100 ? (<>

                        <div className='col-2 d-md-block' id='arast-text-controls'>
                            <div class="Arast-control-wrap label-block margin-auto">
                                <div class="Arast-control">
                                    <div id="Arast-text-format-btns" class="Arast-btn-group icon-group">
                                        <button id="format-uppercase" onClick={() => handleOpenTextTools("fontSize")} type="button" class="Arast-btn custom-btn-no-border btn-1 font-30"><span class="material-icons">more_horiz</span></button>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </>) : (
                        <>
                            <div className='col-4 col-sm-5 col-md-4 d-sm-none d-md-block' id='arast-text-controls'>
                                <div class="Arast-control-wrap label-block margin-auto">
                                    <div class="Arast-control">
                                        <div id="Arast-text-format-btns" class="Arast-btn-group icon-group">
                                            <button id="format-uppercase" onClick={() => handleOpenTextTools("fontSize")} type="button" class="Arast-btn custom-btn-no-border btn-1"><span class="material-icons">text_fields</span></button>
                                            <button id="format-bold" onClick={() => handleSetRtlText()} type="button" class="Arast-btn custom-btn-no-border btn-1"><span class="material-icons">format_textdirection_r_to_l</span></button>
                                            <button id="format-italic" type="button" class="Arast-btn custom-btn-no-border btn-1"><span class="material-icons">format_italic</span></button>
                                            <button id="format-underlined" type="button" class="Arast-btn custom-btn-no-border btn-1"><span class="material-icons">format_underlined</span></button>
                                            <button onClick={() => handleOpenTextTools("formatAlign")} id="format-align-center" type="button" class="Arast-btn format-align custom-btn-no-border btn-1"><span class="material-icons">{textAlign}</span></button>

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </>
                    )
                }



                {openTools &&

                    <div id='TextTools-NavbarTools' className='margin-auto toolsManager-TextTools row'>
                        {

                            textTools == "fontSize" ? (<>
                                <div className='col d-sm-none d-md-block' id='arast-text-controls'>
                                    <div class="Arast-control-wrap label-block margin-auto">
                                        <div class="Arast-control">
                                            <div id="Arast-text-format-btns" class="Arast-btn-group icon-group">
                                                <button id="format-uppercase" onClick={() => handleOpenTextTools("fontSize")} type="button" class="Arast-btn custom-btn-no-border btn-1"><span class="material-icons">text_fields</span></button>
                                                <button id="format-bold" onClick={() => handleSetRtlText()} type="button" class="Arast-btn custom-btn-no-border btn-1"><span class="material-icons">format_textdirection_r_to_l</span></button>
                                                <button id="format-italic" type="button" class="Arast-btn custom-btn-no-border btn-1"><span class="material-icons">format_italic</span></button>
                                                <button id="format-underlined" type="button" class="Arast-btn custom-btn-no-border btn-1"><span class="material-icons">format_underlined</span></button>
                                                <button onClick={() => handleOpenTextTools("formatAlign")} id="format-align-center" type="button" class="Arast-btn format-align custom-btn-no-border btn-1"><span class="material-icons">{textAlign}</span></button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>) : (<>


                                <button onClick={() => handleActiveTextAlign("left")} id="format-align-left-textTool" type="button" class="Arast-btn format-align active custom-btn-no-border texttools-buttons toolsManager-TextTools-Buttons btn-1"><span class="material-icons material-size">format_align_left</span></button>
                                <button onClick={() => handleActiveTextAlign("center")} id="format-align-center-textTool" type="button" class="Arast-btn format-align custom-btn-no-border texttools-buttons toolsManager-TextTools-Buttons btn-1"><span class="material-icons material-size">format_align_center</span></button>
                                <button onClick={() => handleActiveTextAlign("right")} id="format-align-right-textTool" type="button" class="Arast-btn format-align custom-btn-no-border texttools-buttons toolsManager-TextTools-Buttons btn-1"><span class="material-icons material-size">format_align_right</span></button>
                                <button onClick={() => handleActiveTextAlign("justify")} id="format-align-justify-textTool" type="button" class="Arast-btn format-align custom-btn-no-border texttools-buttons toolsManager-TextTools-Buttons btn-1"><span class="material-icons material-size">format_align_justify</span></button>
                            </>)
                        }

                    </div>
                }


            </div>
        </div>

    </>
    );
}

export default TextTools;