import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextTools from "./NavbarToolsComponents/TextTools";
import CanvasTools from "./NavbarToolsComponents/CanvasTools";
import ImageTools from "./NavbarToolsComponents/ImageTools";


const NavbarTools = () => {
  const app = useSelector((state) => state.InitApp);
  const object = useSelector((state) => state.IObject);

  const [lastId, setLastId] = useState(0);
  const [activeObject, setActiveObject] = useState(null);
  const [objectType, setObjectType] = useState("");
  const [render, setRender] = useState(null)



  const getObjectById = () => {
    if (Array.isArray(app.canvas._objects)) {
      const matchingObject = search()
      setActiveObject(matchingObject)
      setObjectType(matchingObject.type)

    } else {
      // Handle the scenario where _objects is not an array (e.g., log a warning)
      console.warn("app.canvas._objects is not an array. Cannot search for objects by ID.");
    }

  }


  function search() {
    for (let i = 0; i < app.canvas._objects.length; i++) {
      if (app.canvas._objects[i].id === object.activeObjectId) {
        return app.canvas._objects[i];
      }
    }
  }




  useEffect(() => {

    console.log(app.canvas);
      console.log(object.activeObjectId);

    if (object.activeObjectId !== 0 && object.activeObjectId !== undefined) {

      getObjectById();
      setLastId(object.activeObjectId)
      switch (objectType) {
        case "textbox":
          setRender(<TextTools object={activeObject} isArray={false} />)
          break;

          case "image" : 
          setRender(<ImageTools object={activeObject} isArray={false} />)

            break;
        default:
          setRender(<CanvasTools />)
          break;
      }




    }
    else {

      if (object.selectionObjects.length !== 0) {
        let firstObject;
        for (var i = 0; i < object.selectionObjects.length; i++) {
          firstObject = object.selectionObjects[i]
          break
        }

        switch (firstObject.type) {
          case "textbox":
            setRender(<TextTools object={object.selectionObjects} isArray={true} />)
            break;
  
          default:
            break;
        }
  


      }
      else{
      setRender(<CanvasTools />)

      }

    }


    


  }, [object])






  return (<>




    <div id="NavbarTools" className="row NavbarTools NavbarTools-PaddingOpen">

      {render}

    </div>


  </>);
}

export default NavbarTools;
