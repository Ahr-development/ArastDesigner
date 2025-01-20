import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adjustZoom, getScaledSize } from "../../../js/SetupEditor";
import { setActiveObject, updateObjects } from "../../../Actions/InitAppAction";
import { debouncedSaveDesign } from "../../../utils/SaveDesign";

const Text = ({ mode }) => {

    const app = useSelector((state) => state.InitApp);
    const settings = useSelector((state) => state.ISettings);
    const dispatch = useDispatch();
    const design = useSelector((state) => state.IDesign);
    const designManager = useSelector((state) => state.IDesignController);
    const currentDesignIndex = useSelector((state) => state.IDesignController.CurrentActiveDesignIndex);



    // تابع ایجاد نئون با افکت‌های پیشرفته
    function createNeonText(textString, left, top, fillColor, shadowColor) {
        // ساخت متن اصلی
        const text = new fabric.Text(textString, {
            fontSize: 80,
            fill: fillColor, // رنگ متن نئون
            fontFamily: 'Cursive',
            fontWeight: 'bold',
            left: left,
            top: top,
            shadow: {
                color: shadowColor, // رنگ سایه که ایجاد افکت نئون می‌کند
                blur: 400, // میزان تاری سایه
                offsetX: 0,
                offsetY: 0,
            },
            stroke: fillColor, // رنگ خط بیرونی متن
            strokeWidth: 2, // ضخامت خط بیرونی
            originX: 'center', // متن را در مرکز قرار می‌دهد
            originY: 'center',
        });

        // ایجاد لایه‌ی نور بیرونی (حالت درخشان‌تر)
        const outerGlow = new fabric.Text(textString, {
            fontSize: 80,
            fill: fillColor, // رنگ مشابه متن اصلی
            fontFamily: 'Cursive',
            fontWeight: 'bold',
            left: left,
            top: top,
            shadow: {
                color: shadowColor, // رنگ سایه که افکت درخشان ایجاد می‌کند
                blur: 300, // تاری زیاد برای ایجاد درخشش
                offsetX: 0,
                offsetY: 0,
            },
            opacity: 0.7, // شفافیت کمتر برای لایه بیرونی
            originX: 'center',
            originY: 'center',
        });

        // هر دو لایه را به canvas اضافه می‌کنیم
        app.canvas.add(outerGlow, text);
        app.canvas.renderAll();
    }



    const addNeonText = () => {

        var text = new fabric.Text('NEON', {
            fontFamily: 'Arial',
            fontSize: 70,
            fill: 'white',
            left: 100,
            top: 100
        });

        // لایه نورانی
        var glowText = new fabric.Text('NEON', {
            fontFamily: 'Arial',
            fontSize: 70,
            fill: 'pink',
            shadow: '0px 0px 10px rgba(255, 0, 255, 0.7)',
            left: 102,
            top: 102
        });

        app.canvas.add(text, glowText)
    }

    
    const addText = async () => {
        var text = new fabric.Textbox(ArastParams.textbox, {
            objectType: 'textbox',
            fontSize: settings.fontSize,
            fontFamily: settings.fontFamily,
            fontWeight: settings.fontWeight,
            fontStyle: settings.fontStyle,
            lineHeight: settings.lineHeight,
            fill: settings.fill,
            stroke: settings.stroke,
            strokeWidth: settings.strokeWidth,
            textBackgroundColor: settings.textBackgroundColor,
            textAlign: settings.textAlign,
            left: 1080 / 2,
            top: 1080 / 2,
            width: 1080 / 1.5,
            originX: 'center',
            originY: 'center'
        });
    
        app.canvas.add(text);
        app.canvas.setActiveObject(text);
        app.canvas.requestRenderAll();
    
        // تابع برای مرتب‌سازی علائم نگارشی در متن RTL
        const formatRTLText = (textContent) => {
            // افزودن کاراکترهای RTL و رعایت علائم نگارشی
            return `\u202B${textContent}\u202C`;
        };
    
        // اعمال اولیه RTL به متن هنگام افزودن به کانواس
        text.set("text", formatRTLText(text.text));
        app.canvas.renderAll();
    
        let preventTextChange = false;
    
        // مدیریت رویداد تغییر متن
        text.on("text:changed", () => {
            if (!preventTextChange) {
                preventTextChange = true;
                const cleanText = text.text.replace(/\u202B|\u202C/g, "");
                const formattedText = formatRTLText(cleanText);
                text.set("text", formattedText);
                app.canvas.renderAll();
                preventTextChange = false;
            }
        });
    
        text.on("editing:entered", () => {
            const cleanText = text.text.replace(/\u202B|\u202C/g, "");
            text.set("text", cleanText);
            app.canvas.renderAll();
        });
    
        text.on("editing:exited", () => {
            const cleanText = text.text.replace(/\u202B|\u202C/g, "");
            const formattedText = formatRTLText(cleanText);
            text.set("text", formattedText);
            app.canvas.renderAll();
        });
    
        // رویداد `object:added` برای اعمال صحیح RTL
        app.canvas.on("object:added", (e) => {
            if (e.target && e.target.type === "textbox") {
                const currentText = e.target.text.replace(/\u202B|\u202C/g, "");
                const formattedText = formatRTLText(currentText);
                e.target.set("text", formattedText);
                app.canvas.renderAll();
            }
        });
    
        // ذخیره و بروزرسانی وضعیت و داده‌ها
        dispatch(setActiveObject(text.id));
        dispatch(updateObjects(app.canvas._objects));
    
        debouncedSaveDesign(design[currentDesignIndex].Id);
        console.log('----------->>> Saved design for index: ' + currentDesignIndex);
    };
    
    
    


    const addTextWithShadow = () => {


        // ایجاد متن با فونت و سایز دلخواه و افزودن سایه به آن
        const text = new fabric.Textbox('متن شما', {
            fontSize: 80,
            left: app.originalWidth / 2,
            top: app.originalHeight / 2,
            fill: '#ffffff', // رنگ متن
            shadow: new fabric.Shadow({ // ایجاد سایه به عنوان یک خاصیت
                color: 'rgba(255, 22, 28, 0.95)', // رنگ سایه اول
                blur: 18, // شدت محو شدن سایه
                offsetX: 0,
                offsetY: 0,
            }),
        });


        // اضافه کردن متن به canvas
        app.canvas.add(text);
  
    }


    const strokeText = () => {
        var strokeText = new fabric.Textbox('Mary On The Cross', {
            left: 50,
            top: 250,
            fontFamily: "Arial",
            fontWeight: "bold",
            stroke: 'red',
            fill: '',
            strokeWidth: 2
        });

        app.canvas.add(strokeText);

    }


    const paddingText = () => {

        const textBox6 = new fabric.Textbox('Text with Background', {
            left: 100,
            top: 500,
            width: 250,
            fontSize: 26,
            fill: '#FFFFFF',
            backgroundColor: '#607D8B', // رنگ پس‌زمینه
            padding: 10, // فاصله از لبه‌ها
            cornerColor: '#FFEB3B', // رنگ گوشه‌ها
          });
        // اضافه کردن Textbox به canvas
        app.canvas.add(textBox6);
        app.canvas.renderAll();

    }


    const textGradient = () => {
        const textBox2 = new fabric.Textbox('Gradient Text', {
            left: 100,
            top: 200,
            width: 250,
            fontSize: 28,
            fontWeight: 'bold',
            fill: new fabric.Gradient({
                type: 'linear',
                gradientUnits: 'pixels',
                coords: { x1: 0, y1: 0, x2: 200, y2: 0 },
                colorStops: [
                    { offset: 0, color: '#FF5722' }, // شروع گرادینت
                    { offset: 1, color: '#2196F3' }  // پایان گرادینت
                ]
            }),
            shadow: new fabric.Shadow({
                color: 'rgba(0, 0, 0, 0.2)',
                blur: 5,
                offsetX: 3,
                offsetY: 3
            })
        });


        app.canvas.add(textBox2)
    }


    const textWithBoxEffect = () => {
        // ایجاد یک مستطیل با گوشه‌های گرد به عنوان پس‌زمینه
        const roundedRect = new fabric.Rect({
            left: 100,
            top: 500,
            width: 250,
            height: 100,
            fill: '#607D8B',  // رنگ پس‌زمینه
            rx: 20,  // شعاع گوشه‌ها (radius)
            ry: 20,  // شعاع گوشه‌ها (radius)
        });

        // ایجاد TextBox روی مستطیل
        const textBoxWithRadius = new fabric.Textbox('Text with Rounded Corners', {
            left: 110,  // کمی جابه‌جا شده تا درون مستطیل قرار بگیرد
            top: 510,
            width: 230,
            fontSize: 26,
            fill: '#FFFFFF',
            backgroundColor: '', // بدون پس‌زمینه چون مستطیل داریم
            padding: 10,
        });

        // اضافه کردن هر دو به canvas
        app.canvas.add(roundedRect);
        app.canvas.add(textBoxWithRadius);
    }




    const ItalicText = () => {
        const textBox5 = new fabric.Textbox('Curved Text', {
            left: 100,
            top: 400,
            width: 300,
            fontSize: 30,
            fill: '#9C27B0',
            angle: 10, // زاویه چرخش
            skewX: 20, // زاویه منحنی
          });

          app.canvas.add(textBox5)
    }









    return (<>

        <div id={mode != null ? ("") : ("Arast-icon-panel")}>
            <div id={mode != null ? ("") : ("Arast-icon-panel-inner")}>

                <div id="Arast-text" class="Arast-icon-panel-content ">
                    <button onClick={() => addText()} id="Arast-add-text" type="button" class="Arast-btn primary Arast-lg-btn btn-full" >اضافه کردن متن جدید</button>

                </div>

                <br />
                <div className="row" >

                    <div className="col-6 arast-logos" onClick={() => addTextWithShadow()}>
                        <img className="designsImage" src="/img/text/neon.png"
                        />
                    </div>
                    <div className="col-6 arast-logos" onClick={() => strokeText()} >
                        <img className="designsImage" src="/img/text/stroke.png"
                        />
                    </div>
                    <div className="col-6 arast-logos" onClick={() => paddingText()}>
                        <img className="designsImage" src="/img/text/subtitle.png"
                        />
                    </div>
                    <div className="col-6 arast-logos" onClick={() => textWithBoxEffect()}>
                        <img className="designsImage" src="/img/text/corner.png"
                        />
                    </div>
                    <div className="col-6 arast-logos" onClick={() => textGradient()}>
                        <img className="designsImage" src="/img/text/gradient.png"
                        />
                    </div>
              
                </div>
            </div>
        </div>



    </>);




}

export default Text;