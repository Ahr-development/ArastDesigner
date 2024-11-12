import DesignCollectionModal from "../../Modal/DesignCollectionModal";
import StoreModal from "../../Modal/StoreModal";



const Apps = ({mode}) => {
    return (<>


        <div id={mode != null ? ("") : ("Arast-icon-panel")}>
            <div id={mode != null ? ("") : ("Arast-icon-panel-inner")}>
                <div id="Arast-elements" class="Arast-icon-panel-content">


                    <div className="row">

                        <h4 className="text-center">درحال حاضر برنامه ای تعریف نشده</h4>
                        
                    </div>




                </div>
            </div>
        </div>


        {/*         <StoreModal/>
 */}
    </>);
}

export default Apps;