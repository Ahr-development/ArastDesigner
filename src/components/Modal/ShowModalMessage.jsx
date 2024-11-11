import { useDispatch } from "react-redux";
import { setModalMessageForPublishStore } from "../../Actions/InitAppAction";




const ShowModalMessage = ({message}) => {
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setModalMessageForPublishStore(false))
    } 
    return ( <>
    
    
    <div id="modal-history" class="Arast-modal arast-history" >
            <div class="Arast-modal-wrap">
                <div class="Arast-modal-inner">
                    <div class="Arast-modal-bg">
                        <h3 class="Arast-history-title">متن پیغام مدیریت<button onClick={() => handleClose()} id="Arast-clear-history" type="button"
                            class="Arast-btn danger"><span class="material-icons">clear</span>بستن</button>
                        </h3>

                        <hr />
                        <br />
                        <h4 className="text-center">{message}</h4>
                        <br />
          

                        <button onClick={() => handleClose()}  className="Arast-btn btn-full primary arast-btn-success">بستن پیغام مدیریت</button>

                    </div>
                </div>
            </div>
        </div>

    
    
    
    
    </> );
}
 
export default ShowModalMessage;