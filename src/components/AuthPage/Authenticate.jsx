import { useEffect, useState } from "react";
import { IsFoundUser, SignInUserByMobile } from "../../Services/userService";
import Activate from "./Activate";
import Register from "./Register";
import { v4 as uuidv4 } from 'uuid';



const Authenticate = () => {
    const [mobile, setMobile] = useState(null)
    const [status, setStatus] = useState(null)



    useEffect(() => {
        const browserUUID = localStorage.getItem('browserUUID') || uuidv4();
        localStorage.setItem('browserUUID', browserUUID); // اطمینان از ذخیره UUID
    },[])



    const sendMobile = async () => {
        const { status } = await IsFoundUser(mobile);

        switch (status) {
            case 200:
                const { status } = await SignInUserByMobile(mobile);
                setStatus(<Activate mobile={mobile} />)
                break;

                case 204:
                    setStatus(<Register mobile={mobile}/>)
                    break;
    
            default:
                break;
        }

    }

    return (<>





        <div className="container arast-login-main">

            <div className="row">



                {

                    status == null ? (
                        <>
                            <div className="col-12 col-md-6">

                                <h2 className="txt-center">خوش آمدید</h2>
                                <p className="txt-center" >آراست اولین پلتفرم ویرایشگر آنلاین تحت وب در ایران با تمامی امکانات</p>

                            </div>

                            <div className="col-12 col-md-6 arast-login-div">

                                <h4 className="arast-login-text ">شماره تلفن همراه</h4>

                                <input onChange={(e) => setMobile(e.target.value)} class="input arast-input-login" placeholder="شماره خودتان را وارد کنید" />
                                <a onClick={() => sendMobile()} className="custom-btn btn-1 fullWidth arast-login-submit">ارسال کد تایید</a>


                            </div>

                        </>
                    ) : (
                        <>
                            {status}
                        </>
                    )

                }





            </div>



        </div>



    </>);
}

export default Authenticate;