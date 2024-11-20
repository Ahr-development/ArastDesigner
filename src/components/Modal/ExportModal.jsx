import { useDispatch } from "react-redux";
import { setExportModalAction } from "../../Actions/InitAppAction";
import Select from 'react-select';
import { useState } from "react";
import { useSelector } from "react-redux";
import DesignsMap from "./DesignsMap";



const ExportModal = () => {

    const dispatch = useDispatch()

    const [exportStatus, setExportStatus] = useState(false)
    const [pdfExport, setPdfExport] = useState(false)

    const [selectedExport, setSelectedExport] = useState()
    const app = useSelector((state) => state.InitApp);
    const fonts = useSelector((state) => state.IFonts);

    const handleClose = () => {
        dispatch(setExportModalAction(false))
    }

    const handleChangeExport = (expo) => {
        setSelectedExport(expo)
    }


    async function convertFontUrlToBase64(fontUrl) {
        try {
            // دانلود فونت از URL
            const response = await fetch(fontUrl);
            const fontBlob = await response.blob();
    
            // تبدیل Blob به داده Base64
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1]; // حذف بخش 'data:...;base64,'
                    resolve(base64String); // بازگرداندن base64String
                };
                reader.onerror = reject; // خطا را برگرداند
                reader.readAsDataURL(fontBlob);
            });
    
        } catch (error) {
            console.error("Error converting font URL to Base64:", error);
            throw error; // خطا را پرتاب کنید تا بتوان آن را مدیریت کرد
        }
    }


    // تابع برای بارگذاری فونت به صورت پویا و افزودن به document
    const loadFont = (fontName, fontUrl) => {
        return new Promise((resolve, reject) => {
            const font = new FontFace(fontName, `url(${fontUrl})`);
            font.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
                resolve();
            }).catch((error) => reject(error));
        });
    };


    const exportSVGWithFonts = async () => {
        const objects = app.canvas._objects;
        const loadedFonts = new Set();
        const font_base64 = [];
    
        // بارگذاری فونت‌های هر شیء متنی
        for (let obj of objects) {
            if (obj.type === 'text' || obj.type === 'i-text' || obj.type === 'textbox') {
                const fontFamily = obj.fontFamily.replace(/\d+/g, '');
    
                // بررسی اینکه فونت قبلا بارگذاری شده است
                if (!loadedFonts.has(fontFamily)) {
                    for (let index = 0; index < fonts.length; index++) {
                        const font = fonts[index];
                        
                        if (font.FontName === fontFamily) {
                            const fontUrl = `https://s3.ir-thr-at1.arvanstorage.ir/${font.FontFileName}`;
                            
                            // بارگذاری فونت به Base64
                            const base64 = await convertFontUrlToBase64(fontUrl);
                            if (base64) {
                                font_base64.push({ fontName: fontFamily, base: base64 });
                            }
    
                            // بارگذاری فونت در canvas
                            await loadFont(fontFamily, fontUrl);
                            loadedFonts.add(fontFamily);
                            obj.fontFamily = fontFamily;
                            break; // بعد از یافتن و بارگذاری فونت موردنظر، خروج از حلقه
                        }
                    }
                }
            }
        }
    
        // تولید خروجی SVG
        let svgData = app.canvas.toSVG();
    
        // ایجاد استایل برای هر فونت و تعبیه آن در SVG
        let fontStyles = '<style>';
        for (let index = 0; index < font_base64.length; index++) {
            const fontBase64 = font_base64[index];
            fontStyles += `
                @font-face {
                    font-family: '${fontBase64.fontName}';
                    src: url(data:font/truetype;charset=utf-8;base64,${fontBase64.base}) format('truetype');
                }
            `;
        }
        fontStyles += '</style>';
    
        svgData = svgData.replace(/<\?xml.*\?>\s*/, '').replace(/<!DOCTYPE.*>\s*/, '');
        svgData = svgData.replace(/<desc>.*<\/desc>/, '<desc>Created with Love By Arast Web Design From Iran</desc>');
        const svgHeader = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${app.originalWidth}" height="${app.originalHeight}" viewBox="0 0 ${app.originalWidth} ${app.originalHeight}" xml:space="preserve">`;
        svgData = svgHeader + fontStyles + svgData.replace('<svg', '');


        // دانلود SVG
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'canvas_with_fonts.svg';
        link.click();
        URL.revokeObjectURL(url);
    };
    



    const handleExport = () => {
        setExportStatus(true)

        const quality = document.getElementById("arast-4x").checked
        var multiplier = 2; // دو برابر کیفیت اولیه

        if (quality) {
            multiplier = 4
        }


        setTimeout(() => {

            if (selectedExport.value == "svg") {
                exportSVGWithFonts()
                setExportStatus(false)
            }
            else {
                // تولید خروجی به‌صورت داده‌ی Base64
                var dataURL = app.canvas.toDataURL({
                    format: selectedExport.value,
                    multiplier: multiplier,
                    quality: 1
                });

                // باز کردن تصویر در یک پنجره جدید یا ذخیره آن
                var link = document.createElement('a');
                link.href = dataURL;
                link.download = 'canvas-output.' + selectedExport.value;
                link.click();
                setExportStatus(false)


            }

        }, 5000);



    }

    // گزینه‌ها با تصاویر و توضیحات
    const options = [
        {
            value: 'png',
            label: (
                <div className="option-label">
                    <img src="/img/icons/img-icon.svg" alt="PPTX Icon" className="icon23" />
                    <div>
                        <span className="title23">فرمت خروجی عکس PNG</span>
                        <span className="description23">بهترین فرمت برای خروجی عکس با کیفیت بالا</span>
                    </div>
                    <span className="suggested">پیشنــهادی</span>
                </div>
            )
        },
        {
            value: 'jpg',
            label: (
                <div className="option-label">
                    <img src="/img/icons/img-icon.svg" alt="PPTX Icon" className="icon23" />
                    <div>
                        <span className="title">فرمت خروجی عکس JPG</span>
                        <span className="description23">بهترین فرمت خروجی برای اشتراک گذاری با حجم کمتر فایل</span>
                    </div>
                </div>
            )
        },
        {
            value: 'svg',
            label: (
                <div className="option-label">
                    <img src="/img/icons/img-icon.svg" alt="PPTX Icon" className="icon23" />
                    <div>
                        <span className="title23">فرمت خروجی SVG</span>
                        <span className="description23">بهترین کیفیت ممکن طرح + قابلیت زوم بی نهایت بالا</span>
                    </div>
                </div>
            )
        },
        // سایر گزینه‌ها نیز به همین شکل اضافه شوند
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: '2px solid #8a4de9',
            borderRadius: '8px',
            padding: '5px',
            boxShadow: 'none',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#f5f5f5' : '#ffffff',
            color: '#333',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '8px',
            padding: '5px 0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }),
    };



    const handleExportPDF = () => {
        setPdfExport(true)
    }


    return (<>


        <div id="modal-history" class="Arast-modal arast-history" >
            <div class="Arast-modal-wrap">
                <div class="Arast-modal-inner">
                    <div class="Arast-modal-bg" >

                        {exportStatus
                            ? (<>

                                <video src="/img/Arast.mp4" autoPlay controlslist="nodownload" loop className="fullWidth" ></video>

                                <div class="container">
                                    <br />

                                    <div class="row">
                                        <div class="col d-flex align-items-center">
                                            <div class="spinner"></div>
                                            <div class="arast-loading-text ms-2" id="text-btn-publish">در حال ساخت خروجی ...</div>
                                        </div>
                                    </div>
                                </div>



                            </>) : (<>


                                {
                                    pdfExport ? (<>

                                        <h3 class="Arast-history-title">خروجی پی دی اف<button onClick={() => handleClose()} id="Arast-clear-history" type="button"
                                            class="Arast-btn danger"><span class="material-icons">clear</span>بستن</button>
                                        </h3>
                                        <p className="text-center">شما میتوانید با استفاده از درج کردن تصاویر اولویت بندی دیزاین را انجام دهید و همچنین میتوانید با استفاده از دکمه پنهان کردن از رندر بعضی از دیزاین ها چشم پوشی کنید</p>
                                        <DesignsMap />



                                    </>) : (<>

                                        <h3 class="Arast-history-title">خروجی دیزاین<button onClick={() => handleClose()} id="Arast-clear-history" type="button"
                                            class="Arast-btn danger"><span class="material-icons">clear</span>بستن</button>
                                        </h3>

                                        <div class="Arast-grid-wrap row">
                                            <div class="container">

                                                <br />

                                                <div class="collaboration">
                                                    <h3 for="collab-link" class="form-label">انتخاب نوع فایل</h3>
                                                    <Select
                                                        options={options}
                                                        defaultValue={options[0]}
                                                        styles={customStyles}
                                                        isSearchable={false}
                                                        onChange={(expo) => handleChangeExport(expo)}
                                                    />
                                                </div>


                                                <label class="checkbox__label" for="checkbox">
                                                    <span class="checkbox__container">
                                                        <input class="checkbox" id="arast-4x" type="checkbox" />

                                                        <span class="checkbox__label--text"> خـــــروجی دیزاین با کیفیت بالا ( 4 برابری) </span>
                                                    </span>
                                                </label>



                                                <button class="btn-copy" onClick={() => handleExport()}>دریافت خروجی دیزاین</button>

                                                <div class="actions mt-4">
                                                    <a href="#" class="action-btn">
                                                        <img src="/img/icons/presentation.svg" alt="Download" />
                                                        <span>قابلیت ارائه آنلاین</span>
                                                    </a>
                                                    <a href="#" class="action-btn">
                                                        <img src="/img/icons/anchor.svg" alt="Present" />
                                                        <span>اشتراک گذاری طرح</span>
                                                    </a>
                                                    <a href="#" class="action-btn">
                                                        <img src="/img/icons/Mobile.svg" alt="Public View Link" />
                                                        <span>دانشگاه دیزاین آراست</span>
                                                    </a>
                                                    <a href="#" class="action-btn">
                                                        <img src="/img/icons/truck.svg" alt="Print" />
                                                        <span>درخواست چاپ طرح و ارسال</span>
                                                    </a>
                                                    <a onClick={() => handleExportPDF()} class="action-btn" >
                                                        <img src="/img/icons/pdf.svg" alt="Present and record" />
                                                        <span>تبدیل به PDF</span>
                                                    </a>
                                                    <a href="#" class="action-btn">
                                                        <img src="/img/icons/bug.svg" alt="Website" />
                                                        <span>گزارش مشکل</span>
                                                    </a>
                                                    <a href="#" class="action-btn">
                                                        <img src="/img/icons/coordinating.svg" alt="Microsoft PowerPoint" />
                                                        <span>آراست تیمز</span>
                                                    </a>
                                                    <a href="#" class="action-btn">
                                                        <img src="/img/icons/home.svg" alt="See all" />
                                                        <span>بازگشت به خانه</span>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>


                                    </>)
                                }



                            </>)

                        }

                    </div>
                </div>
            </div>
        </div>




    </>);
}

export default ExportModal;