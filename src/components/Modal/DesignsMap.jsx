import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Sortable from 'sortablejs';
import config from '../../Services/config.json'
import jsPDF from 'jspdf';
import { FontManager } from '../../js/FontManager';
import { adjustZoom } from '../../js/SetupEditor';
import { PDFDocument } from 'pdf-lib';
import { svg2pdf } from 'svg2pdf.js';

const DesignsMap = () => {
    // حالت اولیه برای ذخیره لیست عکس‌ها

    // استفاده از یک ref برای اتصال Sortable به DOM
    const galleryRef = useRef(null);
    const design = useSelector((state) => state.IDesign);
    const app = useSelector((state) => state.InitApp);
    const fonts = useSelector((state) => state.IFonts);


    const [images, setImages] = useState([]);

    const [ignoredImages, setIgnoredImages] = useState([]);
    const [pdfExport, setPdfExport] = useState(false)
    const [svg, setSvg] = useState([])

    const onEnd = useCallback((evt) => {
        // به‌روزرسانی لیست تصاویر بر اساس ترتیب جدید در images
        setImages((prevImages) => {
            const reorderedImages = [...prevImages];
            const [movedImage] = reorderedImages.splice(evt.oldIndex, 1);
            reorderedImages.splice(evt.newIndex, 0, movedImage);

            console.log("Reordered images:", reorderedImages); // حالا مقدار به‌روزرسانی شده را نمایش می‌دهد
            return reorderedImages;
        });
    }, []);

    useEffect(() => {
        Sortable.create(galleryRef.current, {
            animation: 150,
            onEnd,
        });
    }, [onEnd]);

    useEffect(() => {
        // وقتی design به‌روز می‌شود، مقدار images هم تغییر کند
        setImages([...design]);
        console.log(images);
    }, [design]);



    const handleIgnoreImage = (id) => {
        if (ignoredImages.includes(id)) {
            // حذف از لیست نادیده‌گرفته‌شده‌ها
            setIgnoredImages(ignoredImages.filter((ignoredId) => ignoredId !== id));
        } else {
            // اضافه به لیست نادیده‌گرفته‌شده‌ها
            setIgnoredImages([...ignoredImages, id]);
        }
    };



    function loadDesignFromUrl(url) {
        const noCath = `${url}?nocache=${new Date().getTime()}`
        fetch(noCath)
            .then(response => response.json())
            .then(json => {
                app.canvas.loadFromJSON(json, () => {
                    app.canvas.renderAll(); // render all بعد از بارگذاری
                    adjustZoom(); // Replace with your implementation
                });
            })
            .catch(error => {
                console.error('Error loading design:', error);
            });
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
                            const fontUrl = `https://arastme.storage.c2.liara.space/${font.FontFileName}`;

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

        svg.push(svgData)

        /*    // دانلود SVG
           const blob = new Blob([svgData], { type: 'image/svg+xml' });
           const url = URL.createObjectURL(blob);
           const link = document.createElement('a');
           link.href = url;
           link.download = 'canvas_with_fonts.svg';
           link.click();
           URL.revokeObjectURL(url); */
    };


    const handleExportPDF = async () => {
        const filteredImages = images.filter(
            (image) => !ignoredImages.includes(image.Id)
        );
        console.log("Filtered images:", filteredImages);




        for (let index = 0; index < filteredImages.length; index++) {
            const design = filteredImages[index];

            let url = config.staticFile + "SaveDesigns/User/" + design.DesignLink + ".json";

            if (design.DesignParentFileLink !== null) {
                url = config.staticFile + "SaveDesigns/User/" + design.DesignParentFileLink + ".json";
            }

            loadDesignFromUrl(url)
            exportSVGWithFonts()

        }







    }





    return (
        <>

            {
                pdfExport ? (<>

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






                    <div ref={galleryRef} className='Arast-Designs-Map' >
                        {design.map((image) => {

                            const isIgnored = ignoredImages.includes(image.Id);

                            return (
                                <div key={image.Id} className={`design-image-container ${ignoredImages.includes(image.Id) ? 'design-ignored' : ''}`}>
                                    <img src={config.staticFile + image.DesignPhoto} className="design-gallery-image" />
                                    <div className="design-overlay">
                                        <button className={`design-overlay-button ${isIgnored ? 'unignore' : ''}`} onClick={() => handleIgnoreImage(image.Id)}>

                                            {isIgnored ? 'نمایش' : 'چشم پوشی'}
                                        </button>
                                    </div>
                                </div>

                            )



                        })}
                    </div >





                </>)
            }

            <br />


            <button class="btn-copy" onClick={() => handleExportPDF()}>دریافت خروجی PDF</button>
            <button class="arast-btn-cancle" >بازگشت به منوی اصلی خروجی</button>

        </>
    );
};

export default DesignsMap;
