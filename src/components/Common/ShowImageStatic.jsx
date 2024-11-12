import { Img } from "react-image";
import BounceLoader from "react-spinners/BounceLoader";
import config from "../../Services/config.json"



const ShowImageStatic = (props) => {
    return ( 

        <Img className={props.classImage}
            src={[`${ config.staticFile + props.image}`,"https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"]}
            loader={
                <div className="text-center mx-auto">
                    <BounceLoader loading={true} color={"#4A90E2"}  />    
                </div>
            }
            
        />


     );
}
 
export default ShowImageStatic;