import { useDispatch } from "react-redux";
import { setEditTextBoxContentModalAction } from "../../Actions/InitAppAction";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TextBoxChangeContentModal = () => {
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.IModal);
    const app = useSelector((state) => state.InitApp);
    const [text, setText] = useState(null);
    const [quill, setQuill] = useState(null);

    const handleClose = () => {
        const data = {
            EditTextBoxContentModal: false,
            TextBoxIdChangeContent: 0,
        };
        dispatch(setEditTextBoxContentModalAction(data));
    };

    function findObjectById(id) {
        return app.canvas.getObjects().find((obj) => obj.id === id);
    }

    useEffect(() => {
        const quillInstance = new Quill("#editor", {
            theme: "snow",
            modules: {
                toolbar: false, // حذف toolbar
            },
        });
        setQuill(quillInstance);

        const obj = findObjectById(modal.TextBoxIdChangeContent);
        setText(obj);

        if (obj && obj.text) {
            // قرار دادن متن موجود در ویرایشگر
            quillInstance.root.innerHTML = obj.text;
        }
    }, []);

    const handleSave = () => {
        if (quill && text) {
            // دریافت محتوای ویرایش‌شده به‌صورت متن ساده
            const updatedContent = quill.getText().trim(); // حذف فاصله‌های اضافی
    
            // ذخیره متن جدید در obj.text
            text.text = updatedContent;
    
            // بازآفرینی Canvas برای نمایش تغییرات
            app.canvas.renderAll();
    
            // بستن مودال
            handleClose();
        }
    };
    
    return (
        <>
            <div id="modal-history" className="Arast-modal arast-history">
                <div className="Arast-modal-wrap">
                    <div className="Arast-modal-inner">
                        <div className="Arast-modal-bg">
                            <h3 className="Arast-history-title">
                                تغییر متن
                                <button
                                    onClick={() => handleClose()}
                                    id="Arast-clear-history"
                                    type="button"
                                    className="Arast-btn danger"
                                >
                                    <span className="material-icons">clear</span>
                                    بستن
                                </button>
                            </h3>

                            <hr />
                            <br />
                            <div id="editor">
                                <h1>متن خودتان را وارد کنید</h1>
                            </div>
                            <br />

                            <button
                                onClick={handleSave}
                                className="Arast-btn btn-full primary arast-btn-success"
                            >
                                ذخیره متن و بستن
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TextBoxChangeContentModal;
