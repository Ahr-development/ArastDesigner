import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { GetAllUploads, GetUserUploadExpireLinkService, UploadUserFile } from "../../../Services/userService";
import { SetOverrideUserUploadsFilesLinkAction, SetUploadsAction, SetUserUploadsFilesLinkAction, UserUploadsAction } from "../../../Actions/UserAction";
import { getSignedUrlsForFiles } from "../../../utils/GetAuthenticatedFile";
import _ from 'lodash';
import { generateRandomStringwithWord } from "../../../utils/CodeGenerator";
import Masonry from 'react-masonry-css'
import ShowImageDynamic from "../../Common/ShowImageDynamic";
import { debounce } from 'lodash';
import config from '../../../Services/config.json'


const Upload = ({ mode }) => {
    const user = useSelector((state) => state.IUser);
    const userUploads = useSelector((state) => state.IUserUpload);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch()
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);
    const app = useSelector((state) => state.InitApp);

    const [imageUrl, setImageUrl] = useState(null);


    const breakpointColumnsObj = {
        default: 2,
        1100: 3,
        700: 2,
        500: 2
    };



    const handleScroll = debounce(async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.getElementById('Arast-icon-panel-inner');

        const loading = document.getElementById("arast-photos-loader")
        loading.style.display = "block"

        if (scrollTop + clientHeight >= scrollHeight - 1) {
            // Dispatch your action here

            if (userUploads.upload == false) {
                const { data } = await GetAllUploads(user.UserId, user.ServerToken, userUploads.pages.uploadPage)
                if (data.length !== 0) {
                    dispatch(SetUploadsAction(data))
                    userUploads.pages.uploadPage = userUploads.pages.uploadPage + 1
                }
                else {
                    userUploads.upload = true
                }
            }

        }
    }, 300); // Adjust the delay as needed





    const handleProgress = useCallback(_.debounce((progress) => {
        setUploadProgress(progress);
    }, 100), []);
    /* 
        const findNewUploads = () => {
            const newItems = userUploads.uploads.filter(
                item => !lastUploads.some(lastUpload => lastUpload.Id === item.Id)
            )
            setNewUploads(newItems)
        }
     */

    function findUniqueObjects(uploads, userFilesLinks) {
        // ایجاد یک Set برای ذخیره IDهای فایل‌های کاربر
        const userFileIds = new Set(userFilesLinks.map(link => link.Id));

        // فیلتر کردن عناصر uploads که ID آن‌ها در userFileIds وجود ندارد
        const newUploads = uploads.filter(upload => !userFileIds.has(upload.Id));


        return newUploads;
    }


    // تابعی برای مدیریت تغییر فایل
    const handleFileChange = async (event) => {
        setUploadComplete(true)
        const file = event.target.files[0]; // دریافت فایل انتخاب‌شده
        if (!file) {
            console.error('No file selected');
            return;
        }

        // تنظیم وضعیت فایل انتخاب‌شده
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setImageUrl(url);

        const formData = new FormData();
        formData.append('File', file); // اضافه کردن فایل به FormData
        formData.append('UserId', user.UserId); // اضافه کردن فایل به FormData
        formData.append('Stoken', user.ServerToken); // اضافه کردن فایل به FormData

        try {
            const result = await UploadUserFile(formData, (progress) => {
                handleProgress(progress);
            });

            // استفاده از داده‌های موفقیت‌آمیز از سرور
            setTimeout(() => {
                dispatch(UserUploadsAction(user.UserId, user.ServerToken, userUploads.pages.uploadPage));
                setUploadComplete(false)

            }, 500); // می‌توانید این مقدار را بر اساس نیاز خود تنظیم کنید


        } catch (error) {

        }
    };


    const fetchSignedUrls = async (newLinks) => {
        try {

            if (newLinks) {
                const urls = await getSignedUrlsForFiles(newLinks);
                dispatch(SetOverrideUserUploadsFilesLinkAction(urls))
            }
            else {
                const urls = await getSignedUrlsForFiles([...userUploads.uploads].reverse());
                dispatch(SetUserUploadsFilesLinkAction(urls))
            }

        } catch (error) {
            console.error('Error fetching signed URLs:', error);
        }
    };



    useEffect(() => {
        if (userUploads.pages.uploadPage === 1) {

            dispatch(UserUploadsAction(user.UserId, user.ServerToken, userUploads.pages.uploadPage))
            userUploads.pages.uploadPage = userUploads.pages.uploadPage + 1
        }


        const scrollControl = document.getElementById('Arast-icon-panel-inner');
        scrollControl.addEventListener('scroll', handleScroll);


        const loading = document.getElementById("arast-photos-loader")
        loading.style.display = "none"

        return () => {
            scrollControl.removeEventListener('scroll', handleScroll);
        };


    }, []); // وابستگی‌های خالی؛ این useEffect تنها در بارگذاری اولیه اجرا می‌شود

    const handleUploadingPhoto = () => {
        const idForUploading = "fileShow-" + generateRandomStringwithWord()
        const idForProgressBar = "progressBarShow-" + generateRandomStringwithWord()

    }


    // از لحاظ امنیتی اصلاح شود بعدا

    const handleAddToCanvas = async (Id) => {

       /*  const { data } = await GetUserUploadExpireLinkService(user.UserId, user.ServerToken, Id) */
        let data = userUploads.uploads.find(u => u.Id == Id).MainFile

        if (data) {
            console.log(data);
            data = config.staticFile + data

            fabric.Image.fromURL(data, function (img) {
                // تنظیمات اولیه تصویر مانند مقیاس یا موقعیت
                img.set({
                    angle: 0,
                    opacity: 1.0,
                    left: 100,
                    top: 100,
                    selectable: true,
                });

                // اضافه کردن گروه به Canvas
                app.canvas.add(img);
                app.canvas.requestRenderAll();

            }, { crossOrigin: 'anonymous' }); // تنظیم crossOrigin برای جلوگیری از مشکلات CORS


        }
    }




    useEffect(() => {
        if (userUploads.userFilesLinks.length !== 0) {
            const newUploads = findUniqueObjects(userUploads.uploads, userUploads.userFilesLinks)
            fetchSignedUrls(newUploads)
        }
        else {
            fetchSignedUrls();
        }

        console.log("UPLOAD SUC");
    }, [userUploads.uploads]);



    useEffect(() => {

        const loading = document.getElementById("arast-photos-loader")
        loading.style.display = "none"

    }, [userUploads.userFilesLinks]);
    return (
        <>

            <div id={mode != null ? ("") : ("Arast-icon-panel")}>
                <div id={mode != null ? ("") : ("Arast-icon-panel-inner")}>
                    <div className="Arast-file-field">
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => handleFileChange(e)}
                            id="Arast-img-upload"
                            className="Arast-hidden-file"
                            accept="image/png, image/jpeg"
                        />
                        <label
                            htmlFor="Arast-img-upload"
                            className="Arast-btn primary Arast-lg-btn btn-full"
                        >
                            <span className="material-icons">upload</span>
                            <span>بارگذاری فایل</span>
                        </label>
                    </div>
                    <br />


                    <div className="row">
                        {
                            uploadComplete ? (<>
                                {uploadProgress > 0 && (
                                    <>
                                        {imageUrl && (
                                            <div className="image-preview-container col-6  arast-logos">
                                                <img src={imageUrl} alt="Preview" className="image-preview designsImage fade-in-out" />
                                            </div>
                                        )}
                                        <div>

                                            <progress value={uploadProgress} max="100" />
                                            {/*  <span>{uploadProgress}%</span> */}
                                        </div>

                                    </>

                                )}

                            </>) : (<></>)

                        }

                        <Masonry breakpointCols={breakpointColumnsObj}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">

                            {
                                userUploads.userFilesLinks.length > 0 ? (
                                    userUploads.userFilesLinks.map((item, index) => (
                                        <div key={index} className=" arast-logos " onClick={() => handleAddToCanvas(item.Id)}>
                                            <ShowImageDynamic classImage="designsImage " image={item.url} />
                                            <div className="dots"></div>
                                        </div>
                                    ))
                                ) : (
                                    <>

                                    </>
                                )
                            }




                        </Masonry>

                        <div id='arast-photos-loader' class="Arast-frame arast-loader-sidebar" >
                            <div class="Arast-img-wrap">
                                <div class="Arast-img-loader"></div><img class="lazy" />
                            </div>

                        </div>
                    </div>


                </div>

            </div>
        </>
    );
};


const areEqual = (prevProps, nextProps) => {
    return prevProps.value === nextProps.value
}

export default React.memo(Upload);

/* 
export default Upload */