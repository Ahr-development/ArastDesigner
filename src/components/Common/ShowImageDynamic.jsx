import { Img } from "react-image";
import PuffLoader  from "react-spinners/PuffLoader";
import config from "../../Services/config.json"



const ShowImageDynamic = (props) => {
    
    return ( 

        <Img className={props.classImage}
        src={[`${props.image}`,"https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"]}
        loader={
                <div className="text-center mx-auto">
                    <PuffLoader  loading={true} color={"#4A90E2"}  />    
                </div>
            }
            
        />


     );
}
 
export default ShowImageDynamic;