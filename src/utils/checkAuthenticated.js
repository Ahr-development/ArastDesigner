import { GetUserByServerCode } from "../Services/userService";
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid';


export const checkAuthenticated = async () => {

    let token = Cookies.get('ArastAuthorize');
    const browserUUID = localStorage.getItem('browserUUID') || uuidv4();
    localStorage.setItem('browserUUID', browserUUID); // اطمینان از ذخیره UUID

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