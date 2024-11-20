import { useDispatch, useSelector } from "react-redux";
import { debounce } from 'lodash';
import { getMoreDesignByDesignTypeService, setStoreDesignForCurrentUser } from "../../../Services/designService";
import { useEffect } from "react";
import config from "../../../Services/config.json"
import { LoadMoreStoreDesignAction, LoadMoreStoreDesignForFirstTimeAction } from "../../../Actions/DesignAction";
import { FontManager } from "../../../js/FontManager";

const Frames = ({mode}) => {
    const arastDesign = useSelector((state) => state.IArastDesign);
    const design = useSelector((state) => state.IDesign);
    const user = useSelector((state) => state.IUser);
    const app = useSelector((state) => state.InitApp);
    const fonts = useSelector((state) => state.IFonts);
    const designManager = useSelector((state) => state.IDesignController);

    const dispatch = useDispatch();

    function loadDesignFromUrl(url) {
        const noCath = `${url}?nocache=${new Date().getTime()}`
        fetch(noCath)
          .then(response => response.json())
          .then(json => {
            app.canvas.loadFromJSON(json, () => {
              app.canvas.renderAll();
            });
    
            setAllFontsForObjects()
          })
          .catch(error => {
            console.error('Error loading design:', error);
          });
      }
    

      const setAllFontsForObjects = async () => {
        const fontsReady = [];
        const fontManager = new FontManager();
        const objects = app.canvas._objects
        // استفاده از حلقه for...of برای اطمینان از اجرای صحیح
        objects.forEach( async (obj) => {
          if (obj.type === 'text' || obj.type === 'i-text' || obj.type === 'textbox') {
            var fontObjName = obj.fontFamily;
    
            if (fontObjName === "MainFont") {
              const mainFont = fonts[0];
              const fontURL = "https://arastme.s3-website.ir-thr-at1.arvanstorage.ir/" + mainFont.FontFileName;
    
              try {
                await fontManager.loadFontAndApplyToObject(mainFont.FontName, fontURL);
                obj.set('fontFamily', mainFont.FontName);
                app.canvas.requestRenderAll();
                obj.setCoords();
              } catch (error) {
                console.error('Error loading font:', error);
              }
    
            } else {
              for (const font of fonts.slice(1)) {
                const sanitizedFontName = fontObjName.replace(/\d+/g, '');
                if (font.FontName === sanitizedFontName) {
                  const fontURL = "https://arastme.s3-website.ir-thr-at1.arvanstorage.ir/" + font.FontFileName;
                  const random = Math.floor(Math.random() * 101);
                  try {
                    await fontManager.loadFontAndApplyToObject(font.FontName + random, fontURL);
                    obj.set('fontFamily', font.FontName + random);
                    app.canvas.requestRenderAll();
                    fontsReady.push(font.FontName);
                    obj.setCoords();
                  } catch (error) {
                    console.error('Error loading font:', error);
                  }
                }
              }
            }
          }
        })
      }
    


    const handleUseNewDesign = async (designId) => {
        const {data} = await setStoreDesignForCurrentUser(user.ServerToken,designId,user.UserId,design[designManager.CurrentActiveDesignIndex].Id)
        loadDesignFromUrl(config.staticFile + "SaveDesigns/User/" + design[designManager.CurrentActiveDesignIndex].DesignLink + ".json");

    }

    const handleScroll = debounce(async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.getElementById('Arast-icon-panel-inner');

        if (scrollTop + clientHeight >= scrollHeight - 1) {
            // Dispatch your action here

        }
    }, 300); // Adjust the delay as needed





    useEffect(() => {
        const scrollControl = document.getElementById('Arast-icon-panel-inner');
        scrollControl.addEventListener('scroll', handleScroll);

        if (arastDesign.pages.designPage === 1) {
            dispatch(LoadMoreStoreDesignForFirstTimeAction(user.ServerToken, design[designManager.CurrentActiveDesignIndex].DesignTypeId, 1,user.UserId))
            arastDesign.pages.designPage = arastDesign.pages.designPage + 1
        }

        return () => {
            scrollControl.removeEventListener('scroll', handleScroll);
        };

    }, [])

    return (

        <>

            <div id={mode != null ? ("") : ("Arast-icon-panel")}>
                <div id={mode != null ? ("") : ("Arast-icon-panel-inner")}>



                    <div id="Arast-all-frames" class="Arast-tab active">
                        <div class="Arast-search-wrap">
                            <input id="Arast-frame-search" type="search" class="Arast-form-field" placeholder="جستجوی طرح" autocomplete="off" />
                            <span id="Arast-frame-search-icon" class="material-icons">search</span>
                        </div>



                        <div class="Arast-templates-content">
                            <div class="Arast-grid-wrap">
                                <div id="Arast-templates-grid" class="Arast-grid template-grid template-selection paginated" data-perpage="21">


                                    {
                                        arastDesign.designs.length !== 0 ? (<>


                                            {
                                                arastDesign.designs.map((element, index) => (
                                                    <div class="grid-item" onClick={() => handleUseNewDesign(element.Id)} data-keyword={element.DesignName} data-category="blog-banners" >
                                                        <div class="template-favorite">
                                                            <button type="button" class="Arast-btn-simple star" data-templateid=""><span class="material-icons">star_border</span></button>
                                                        </div>
                                                        <div class="Arast-masonry-item-inner Arast-select-template" data-json="files/templates/json/25.json">
                                                            <div class="Arast-img-wrap" >

                                                                <img class="lazy entered loaded" data-src="files/templates/img/25.jpg" title={element.DesignName} data-ll-status="loaded" src={config.staticFile + element.DesignShowImage + "?=" +  Math.floor(Math.random() * 101) } />
                                                            </div>
                                                            <div class="Arast-masonry-item-desc">{element.DesignName}</div>
                                                        </div>
                                                    </div>
                                                ))

                                            }


                                        </>) : (<></>)
                                    }




                                </div>

                            </div>
                        </div>
                    </div>





                </div>

            </div>

        </>




    );
}

export default Frames;