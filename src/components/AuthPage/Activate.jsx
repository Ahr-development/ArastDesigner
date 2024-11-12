import { useState } from "react";
import { ResumeSignInUserByMobileAndGetToken } from "../../Services/userService";
import Cookies from 'js-cookie'
import  Swal  from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';




const Activate = ({ mobile }) => {
    const [activeCode, setActiveCode] = useState(null)

    const activeAccount = async () => {
        const browserUUID = localStorage.getItem('browserUUID') || uuidv4();
        localStorage.setItem('browserUUID', browserUUID); // اطمینان از ذخیره UUID

        const { status, data } = await ResumeSignInUserByMobileAndGetToken(mobile, activeCode,browserUUID);

        Cookies.set('ArastAuthorize',JSON.stringify(data), {expires : 90 })

        Swal.fire({
            icon: "success",
            title: "احراز هویت موفقیت آمیز",
            text: "اکنون به آراست دسترسی دارید. خوش آمدید",
            footer: '<a href="/">بازگشت به آراست</a>'
        });
    }




    return (<>


        <div className="col-12 col-md-6">

            <h2 className="txt-center">خوش آمدید</h2>
            <p className="txt-center" >هم اکنون کد تائید خدمت شما ارسال گردید لطفا آن را در فیلد زیر وارد کنید تا به دنیای آراست وارد شوید</p>

        </div>

        <div className="col-12 col-md-6 arast-login-div">

            <h4 className="arast-login-text ">کد تائید را وارد کنید</h4>

            <input onChange={(e) => setActiveCode(e.target.value)} class="input arast-input-login" placeholder="کد تائید" />
            <a onClick={() => activeAccount()} className="custom-btn btn-1 fullWidth arast-login-submit">ورود به حساب</a>


        </div>


    </>);
}

export default Activate;