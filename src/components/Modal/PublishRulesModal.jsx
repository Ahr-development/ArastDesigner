import { useDispatch } from "react-redux";
import { setModalPublishDesignStore } from "../../Actions/InitAppAction";



const PublishRulesModal = () => {

    const dispatch = useDispatch()

    const handleClose = (status) => {
        const modal = {
            StorePublishModal: false,
            ResultStorePublishModal : status
        }
        dispatch(setModalPublishDesignStore(modal))
    }
    return (<>


        <div id="modal-history" class="Arast-modal arast-history" >
            <div class="Arast-modal-wrap">
                <div class="Arast-modal-inner">
                    <div class="Arast-modal-bg">
                        <h3 class="Arast-history-title">قوانین و مقررات انتشار دیزاین<button onClick={() => handleClose(2)} id="Arast-clear-history" type="button"
                            class="Arast-btn danger"><span class="material-icons">clear</span>بستن</button>
                        </h3>

                        <hr />
                        <br />
                        <h6 className="text-right">با نام و یاد خدا به بخش انتشار محصول | دیزاین | طرح گرافیکی آراست خوش آمدید</h6>
                        <br />
                        <p className="text-right">هر پلتفرمی یک خط مشی برای خودش تعریف میکند که بتواند چارچوبی خلاقانه برای همه سلایق فراهم کند که براساس همین  چارچوب بتواند با قوانین هر کشور تعامل سازنده ای داشته باشد. پس ما از شما ( طراحی | فروشگاه ) انتظار اینو داریم که شرایط ما را درک کنید و با احترام بپذیرید</p>
                        <div className="row">
                            <div className="col-6">
                            <h6 className="text-center">شرایط عمومی دیزاین</h6>
                            <br />
                                <p className="text-right">دیزاین شما باید تماما مطابقت با سیاست های جمهوری اسلامی ایران را داشته باشد. حتی در بخش طراحی های بین المللی آراست هم باید طبق چارچوب های اساسی جمهوری اسلامی ایران باشد</p>
                                <p className="text-right">ما از هر نوع طرحی که برای مذاهب خاص و غیریکتاپرستی باشد بشدت دوری میکنیم. پس سعی کنید از طرح هایی که چنین محتوایی دارند بپرهیزید</p>
                                <p  className="text-right" >هرگونه طرح های ( جنسی - سیاسی - خشونت - ترویج همجنسگرایی - ترویج نفاق جمعی ) بدون هیچ اخطاری حذف میشوند و فروشگاه شما توسط سیستم مسدود میشود</p>
                            </div>

                            <div className="col-6">
                            <h6 className="text-center">شرایط تخصصی دیزاین</h6>
                            <br />

                                <h6 className="text-center">
                                    برای دیدن خط مشی های دیزاین تخصصی ابتدا به لینک زیر رجوع کرده و به دانشنامه تخصصی آراست مراجعه کنید
                                </h6>
                                <br/>

                                <button  className="Arast-btn btn-full primary">دانشگاه تخصصی آراست</button>

                            </div>
                        </div>


                        <button onClick={() => handleClose(1)}  className="Arast-btn btn-full primary arast-btn-success">پذیرش قوانین و انتشار طرح</button>

                    </div>
                </div>
            </div>
        </div>




    </>);
}

export default PublishRulesModal;