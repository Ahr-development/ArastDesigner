import { GetUserByServerCode } from "../Services/userService";
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid';


export const checkAuthenticated = async () => {

    let token = Cookies.get('ArastAuthorize');
    let browserUUID = Cookies.get("browserUUID");

    if (!browserUUID) {
        // اگر مقدار موجود نبود، مقدار جدید بساز و ذخیره کن
        browserUUID = uuidv4();
        Cookies.set("browserUUID", browserUUID, {
            expires: 365, // اعتبار به مدت 1 سال
            path: "/", // در تمام صفحات معتبر باشد
            domain: ".arastdev.ir", // اشتراک‌
        });
    }

    if (token === undefined || token === null) {
        Cookies.remove('ArastAuthorize')
        return null;
    }
    else{
        token = JSON.parse(token)
        const { status, data } = await GetUserByServerCode(token.SToken, token.RoleId, token.Token,browserUUID);    
        if (data) {
            data.ServerToken = token.SToken
            data.Token = token.Token
            data.RoleId = token.RoleId

            return data;
        }
        else {
            Cookies.remove('ArastAuthorize')
            return null;
        }
    }


}