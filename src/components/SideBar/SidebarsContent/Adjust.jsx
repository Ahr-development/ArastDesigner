import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PublishRulesModal from "../../Modal/PublishRulesModal";
import { setModalAddDesignCollection, setModalMessageForPublishStore, setModalPublishDesignStore } from "../../../Actions/InitAppAction";
import Swal from 'sweetalert2'
import { GetStoreDesignAction, GetStoreDesignCollectionAction } from "../../../Actions/StoreAction";
import { StorePublishDesignService } from "../../../Services/storeService";
import ShowModalMessage from "../../Modal/ShowModalMessage";
import Select from 'react-select'
import DesignCollectionModal from "../../Modal/DesignCollectionModal";


const Adjust = ({ collection = false, mode }) => {
    const modal = useSelector((state) => state.IModal);
    const user = useSelector((state) => state.IUser);
    const app = useSelector((state) => state.InitApp);
    const design = useSelector((state) => state.IDesign);
    const store = useSelector((state) => state.IStore);
    const storeDesign = useSelector((state) => state.IStoreDesign)
    const designCollection = useSelector((state) => state.IDesignCollection);
    const designManager = useSelector((state) => state.IDesignController);
    const currentDesignIndex = useSelector((state) => state.IDesignController.CurrentActiveDesignIndex);

    const [send, setSend] = useState(false)
    const [selectedCollection, setSelectedCollection] = useState(0)

    const handleShowMessage = () => {
        dispatch(setModalMessageForPublishStore(true))
    }


    const handleCreateCollection = () => {
        const modal = {
            AddDesignCollectionModal: true,
            ResultAddCollectionModal: 2
        }
        dispatch(setModalAddDesignCollection(modal))
    }


    const handleSetCollection = (selected) => {
        setSelectedCollection(selected.value)
    }

    const options = []
    const dispatch = useDispatch()

    const handlePublishDesign = async () => {
        const btn = document.getElementById("arast-btn-end-publish")
        btn.style.backgroundColor = "green"
        btn.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text" id="text-btn-publish">در حال ارسال اطلاعات ...</div>
        `

        const hashtags = document.getElementById("hiddenHashtags")
        const designName = document.getElementById("DesignName")
        const description = document.getElementById("description")
        const colors = document.getElementById("selectedColors")

        btn.disabled = true
        if (hashtags !== undefined && designName !== undefined && description !== undefined && colors !== undefined) {

            if (designName.value !== "" && description.value !== "") {
                if (hashtags.value !== "") {

                    if (colors.value !== "") {
                        const formData = new FormData()
                        const json = JSON.stringify(app.canvas.toJSON());
                        const fileImage = app.canvas.toDataURL('image/png')
                        const blob = await (await fetch(fileImage)).blob()

                        formData.append('Stoken', user.ServerToken)
                        formData.append('StoreId', store.Id)
                        formData.append('DesignId', design[designManager.CurrentActiveDesignIndex].Id)
                        formData.append('Canvas', json)
                        formData.append('Image', blob)
                        formData.append('DesignName', designName.value)
                        formData.append('Description', description.value)
                        formData.append('DesignTags', hashtags.value)
                        formData.append('DesignLink', design[designManager.CurrentActiveDesignIndex].DesignLink)
                        formData.append('DesignColor', colors.value)
                        formData.append('DesignCollectionId', selectedCollection)

                        const { status } = await StorePublishDesignService(formData)

                        if (status == 200) {
                            Swal.fire({
                                icon: "success",
                                title: "عملیات موفق",
                                text: "درخواست انتشار طرحتان موفق آمیز بود با محض تایید مدیریت طرح شما انتشار خواهد شد",
                                footer: '<a href="#">چگونه دیزاین خودم را منتشر کنم؟</a>'
                            });

                            dispatch(GetStoreDesignAction(design[designManager.CurrentActiveDesignIndex].DesignLink, user.ServerToken))
                            btn.style.backgroundColor = "green"
                            btn.innerHTML = "تغییر و انتشار مجدد"
                        }
                    }
                    else {
                        Swal.fire({
                            icon: "info",
                            title: "بی رنگ نمیشه که",
                            text: "حداقل انتخاب یک رنگ الزامی است",
                            footer: '<a href="#">چگونه دیزاین خودم را منتشر کنم؟</a>'
                        });
                    }
                }
                else {
                    Swal.fire({
                        icon: "info",
                        title: "هشتگ نداری که",
                        text: "حداقل 3 هشتگ متفاوت الزامی است",
                        footer: '<a href="#">چگونه دیزاین خودم را منتشر کنم؟</a>'
                    });
                }
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "خالی گذاشتی",
                    text: "لطفا نام دیزاین را بهمراه توضیحات دیزاین پر کنید",
                    footer: '<a href="#">چگونه دیزاین خودم را منتشر کنم؟</a>'
                });


            }

            /*     */

        }
        else {
            Swal.fire({
                icon: "error",
                title: "خطای نامعلوم",
                text: "به احتمال زیاد دستکاری در دام ایجاد شده است! لطفا صفحه را مجدد بارگذاری کنید",
                footer: '<a href="#">چگونه دیزاین خودم را منتشر کنم؟</a>'
            });
        }
    }


    const handleAcceptRule = () => {
        const btn = document.getElementById("arast-btn-publish")
        btn.style.backgroundColor = "green"
        btn.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text" id="text-btn-publish">در انتظار تایید قوانین ...</div>
        `

        setSend(true)
        const modal = {
            StorePublishModal: true,
            ResultStorePublishModal: 0
        }
        dispatch(setModalPublishDesignStore(modal))
    }


    useEffect(() => {


        if (Object.keys(storeDesign).length !== 0) {
            const designName = document.getElementById("DesignName")
            const description = document.getElementById("description")
            const btn = document.getElementById("arast-btn-publish")
            const pub = document.getElementById("arast-btn-end-publish")


            const selectedColorsInput = document.getElementById('selectedColors');
            selectedColorsInput.value = storeDesign.DesignColors
            let selectedColors = selectedColorsInput.value.split(',');

            // انتخاب دایره‌ها بر اساس رنگ‌های موجود در input
            selectedColors.forEach(color => {
                const circle = document.querySelector(`.circle[data-color="${color}"]`);
                if (circle) {
                    circle.classList.add('selected');
                }
            });

            designName.value = storeDesign.DesignName
            description.value = storeDesign.DesignDescription
            btn.style.display = "none"
            pub.style.display = "flex"

        }


        const input = document.getElementById('hashtagInput');
        const addButton = document.getElementById('addHashtag');
        const hashtagContainer = document.getElementById('hashtagContainer');
        const hiddenHashtags = document.getElementById('hiddenHashtags');

        let hashtags = []

        if (Object.keys(storeDesign).length !== 0 && storeDesign.DesignTags !== undefined) {
            hashtags = storeDesign.DesignTags.split(',').filter(h => h.trim() !== '');
            hashtags.forEach(text => {
                const span = document.createElement('span');
                span.className = 'hashtag';
                span.textContent = `${text}`;

                span.addEventListener('click', function () {
                    hashtagContainer.removeChild(span);
                    hashtags = hashtags.filter(h => h !== text);
                });
                hashtagContainer.appendChild(span);
            });
            updateHiddenInput()
        }


        function updateHiddenInput() {
            hiddenHashtags.value = hashtags.join(',');
        }

        addButton.addEventListener('click', function () {
            const text = input.value.trim();
            if (text) {
                const span = document.createElement('span');
                span.className = 'hashtag';
                span.textContent = `${text}`;
                span.addEventListener('click', function () {
                    hashtagContainer.removeChild(span);
                    hashtags = hashtags.filter(h => h !== text);
                    updateHiddenInput();
                });
                hashtagContainer.appendChild(span);
                hashtags.push(text);
                updateHiddenInput();
                input.value = '';
            }
        });



        const circles = document.querySelectorAll('.circle');
        const selectedColorsInput = document.getElementById('selectedColors');
        let selectedColors = [];

        circles.forEach(circle => {
            circle.addEventListener('click', () => {
                const color = circle.getAttribute('data-color');

                if (circle.classList.contains('selected')) {
                    circle.classList.remove('selected');
                    selectedColors = selectedColors.filter(c => c !== color);
                } else {
                    circle.classList.add('selected');
                    selectedColors.push(color);
                }

                selectedColorsInput.value = selectedColors.join(',');
            });
        });




    }, [])




    useEffect(() => {
        designCollection.forEach(element => {
            options.push({ value: element.Id, label: element.CollectionName })
        });
    }, [designCollection])


    useEffect(() => {

        const btn = document.getElementById("arast-btn-publish")
        const pub = document.getElementById("arast-btn-end-publish")

        switch (modal.ResultStorePublishModal) {
            case 1:

                btn.style.display = "none"
                pub.style.display = "flex"
                break;

            case 2:

                btn.value = "مرحله بعدی"
                break;

            default:
                break;
        }
    }, [modal.ResultStorePublishModal])



    return (

        <>

            <div id={mode != null ? ("") : ("Arast-icon-panel")}>
                <div id={mode != null ? ("") : ("Arast-icon-panel-inner")}>


                    <div id="Arast-adjust" class="Arast-icon-panel-content">

                        {

                            collection ? (<>
                                <h3 className="text-center">انتشار دیزاین با پوشه</h3>
                                <p className="text-center">این قسمت مخصوص شما فروشنده عزیز میباشد. شما در این قسمت میتوانید دیزاین خودتان را بطور عمومی منتشر کنید. برای انتشار ابتدا اطلاعات ذیل را پر نمایید</p>

                                <Select onChange={(e) => handleSetCollection(e)} placeholder="انتخاب پوشه" options={options} />
                                <button onClick={() => handleCreateCollection()} className="Arast-btn btn-full primary">ایجاد پوشه جدید</button>

                            </>) : (<>

                                <h3 className="text-center">انتشار دیزاین</h3>
                                <p className="text-center">این قسمت مخصوص شما فروشنده عزیز میباشد. شما در این قسمت میتوانید دیزاین خودتان را بطور عمومی منتشر کنید. برای انتشار ابتدا اطلاعات ذیل را پر نمایید</p>

                            </>)

                        }


                        {
                            storeDesign.ReasonReject !== null && storeDesign.ReasonReject !== undefined ? (<>
                                <div className="arast-error-div">
                                    <h6 className="text-center">اطلاعیه رد دیزاین توسط مدیریت</h6>
                                    <p className="text-center">متاسفانه دیزاین شما به دلایل زیر توسط مدیریت رد شد اگر تمایل دارید میتوانید متن پیام بخوانید</p>
                                    <button onClick={() => handleShowMessage()} id="Arast-resize-apply" type="button" class="Arast-btn btn-full primary">مشاهده پیغام مدیریت</button>

                                </div>
                            </>) : (<></>)
                        }

                        {

                            collection == false ? (<>
                                {
                                    storeDesign.IsPrivate ? (<>
                                        <div className="arast-error-div">
                                            <h6 className="text-center">این دیزاین خصوصی است</h6>
                                            <p className="text-center">اگر با این حالت منتشر کنید دیزاین بطور عمومی منتشر خواهد شد</p>

                                        </div>
                                    </>) : (<></>)
                                }
                            </>) : (<>


                            </>)


                        }


                        <br />


                        <div className='row'>
                            <h6 className="text-right arast-labal-input">نام دیزاین</h6>

                            <input id="DesignName" placeholder='نام دیزاین' className='text-right input arast-input-publish ' />
                        </div>

                        <br />

                        <div className='row'>
                            <h6 className="text-right arast-labal-input">توضیحات دیزاین</h6>

                            <textarea id="description" placeholder='کمی توضیح راجب این طرح بنویسید' className='text-center input arast-input-publish ' ></textarea>
                        </div>

                        <br />
                        <h6 className="text-center arast-labal-input">بهمون بگین قالب رنگی طرح شما از چه رنگ هایی تشکیل شده است؟</h6>

                        <div class="arast-colors ">
                            <div class="circle red" data-color="red"></div>
                            <div class="circle blue" data-color="blue"></div>
                            <div class="circle green" data-color="green"></div>
                            <div class="circle yellow" data-color="yellow"></div>
                            <div class="circle purple" data-color="purple"></div>

                        </div>
                        <input type="text" id="selectedColors" />
                        <br />


                        <input type="text" id="hashtagInput" className="input arast-input-publish" placeholder="متن خود را وارد کنید" />
                        <button id="addHashtag" className="Arast-btn btn-full primary">اضافه کردن هشتگ</button>
                        <div class="hashtag-container" id="hashtagContainer"></div>
                        <input type="hidden" id="hiddenHashtags" />




                        <button onClick={() => handleAcceptRule()} dir="rtl" id="arast-btn-publish" className="Arast-btn btn-full primary arast-publish-button">
                            مرحله بعدی
                        </button>

                        <button dir="rtl" onClick={() => handlePublishDesign()} id="arast-btn-end-publish" className="Arast-btn btn-full primary arast-publish-button hidden">
                            انتشار محتوا
                        </button>

                    </div>







                </div>



            </div>


            {
                modal.StorePublishModal ? (<>

                    <PublishRulesModal />

                </>) : (<>



                </>)

            }


            {
                modal.MessgeForPublishDesign ? (<>

                    <ShowModalMessage message={storeDesign.ReasonReject} />
                </>) : (<></>)

            }



        </>




    );
}

export default Adjust;