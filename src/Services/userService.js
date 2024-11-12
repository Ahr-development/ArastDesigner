
import api from "./httpService";
import config from "./config.json";



export const IsFoundUser = (mobile) => {
  return api.post(`${config.apiLink}/api/authorize/CheckUserIsNew`, JSON.stringify({ mobile }));
};



export const GetUserByServerCode = (serverCode, roleId, token,UUID) => {
  return api.post(`${config.apiLink}/api/authorize/GetUserByServerCode`, JSON.stringify({ serverCode, roleId, token,UUID }));
};



export const SignInUserByMobile = (mobile) => {
  return api.post(`${config.apiLink}/api/authorize/SignInByMobile`, JSON.stringify({ mobile }));
};




export const RegisterUser = (mobile, Name, Family, ActiveCode,UUID) => {
  return api.post(`${config.apiLink}/api/authorize/SignUpNewUser`, JSON.stringify({ mobile, Name, Family, ActiveCode,UUID }));
};



export const ResumeSignInUserByMobileAndGetToken = (mobile, activecode,UUID) => {
  return api.post(`${config.apiLink}/api/authorize/ResumeSignInByMobile`, JSON.stringify({ mobile, activecode,UUID }));
};


export const UploadUserFile = async (file, onProgress) => {
  try {
    const response = await api.post(`${config.apiLink}/api/upload/byUser/UploadNewFileByUserArast`, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onProgress) onProgress(percentCompleted);
      }
    });

    // بررسی وضعیت پاسخ
    if (response.status === 200) {
      // عملیات موفقیت‌آمیز
      return response.data; // یا هر داده‌ای که از سرور دریافت می‌شود
    } else {
      // مدیریت وضعیت‌های غیر موفقیت‌آمیز
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    // مدیریت خطا
    console.error('Error uploading file:', error);
    throw error; // برای اینکه بتوانید خطا را در تابع بالاتر مدیریت کنید
  }
};


export const GetAllUploads = (UserId,Stoken,count) => {
  return api.post(`${config.apiLink}/api/upload/byUser/GetUploadsForUser`, JSON.stringify({ UserId,Stoken,count }));
}


export const GetUserUploadExpireLinkService = (UserId,Stoken,FileId) => {
  return api.post(`${config.apiLink}/api/upload/byUser/getUserUploadFileExpireLinkPrivate`, JSON.stringify({ UserId,Stoken,FileId }));
}
