import { useState } from "react";
import { RegisterUser } from "../../Services/userService";
import Cookies from 'js-cookie'
import  Swal  from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';





const Register = ({mobile}) => {

    const [activeCode, setActiveCode] = useState(null)
    const [name, setName] = useState(null)
    const [family, setFamily] = useState(null)

    const createUser = async () => {
        const browserUUID = localStorage.getItem('browserUUID') || uuidv4();
        localStorage.setItem('browserUUID', browserUUID); // اطمینان از ذخیره UUID


        if (name != null && family != null && activeCode != null) {
            
            const token = await RegisterUser(mobile,name,family,activeCode,browserUUID)

            Cookies.set('ArastAuthorize',JSON.stringify(token), {expires : 90 })
    
            Swal.fire({
                icon: "success",
                title: "ثبت نام موفقیت آمیز",
                text: "اکنون به آراست دسترسی دارید. خوش آمدید",
                footer: '<a href="/">بازگشت به آراست</a>'
            });
        }


    }

    return (<>


        <div className="col-12 col-md-6">

            <h2 className="txt-center">خوش آمدید</h2>
            <p className="txt-center" >کاربر عزیز به آراست خوش آمدید. جهت تکمیل ثبت نام نام و نام خانوادگی خودتان را در فیلد های زیر وارد کنید تا ثبت نام انجام شود</p>

        </div>

        <div className="col-12 col-md-6 arast-login-div">

            <div className="row">


            <div className="col-6">
                <input onChange={(e) => setFamily(e.target.value)} class="input arast-input-login" placeholder="نام خانوادگی" />

                </div>

                <div className="col-6">
                <input onChange={(e) => setName(e.target.value)} class="input arast-input-login" placeholder="نام" />

                </div>


            </div>

            <br/>
            <br/>



            <h4 className="arast-login-text ">کد تائید را وارد کنید</h4>

            <input onChange={(e) => setActiveCode(e.target.value)} class="input arast-input-login" placeholder="کد تائید" />
            <a onClick={() => createUser()} className="custom-btn btn-1 fullWidth arast-login-submit">ثبت نام</a>

            <h4 className="arast-login-text ">کد تائید 177494 میباشد</h4>

        </div>


    </>);
}
 
export default Register;