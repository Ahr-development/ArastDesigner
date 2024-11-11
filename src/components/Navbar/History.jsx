import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { objectName } from "../../js/Navbar";
import { loadJSON } from "../../js/SetupEditor";


const History = () => {
    let modal = null
    const app = useSelector((state) => state.InitApp);
    const history = useSelector((state) => state.IHistory)

    useEffect(() => {
        modal = document.getElementById("modal-history")
        modal.classList.add('arast-history');

    }, [])


    const LoadFromJson = (e) => {
        loadJSON(e.json)
    }
 

    return (<>

        <div id="modal-history" class="Arast-modal " >
            <div class="Arast-modal-wrap">
                <div class="Arast-modal-inner">
                    <div class="Arast-modal-bg">
                        <h3 class="Arast-history-title">تاریخچه<button id="Arast-clear-history" type="button"
                            class="Arast-btn danger"><span class="material-icons">clear</span>پاک کردن تاریخچه</button>
                        </h3>

                        <ul id="Arast-history-list" class="Arast-template-list" data-max="50">

                            {/*                        {history.map((historyEntry, index) => (
                                <li key={index} className="active" dangerouslySetInnerHTML={{ __html: historyEntry }} />
                            ))}

                            <
 */}

                            {history.map((element) => (
                                <li key={element.id}> {/* Add a unique key for each item */}
                                    <div className="info">
                                        
                                        <span class="material-icons">{element.icon}</span>
                                        { element.layerName + " " + element.action }
                                        <span className="time">{element.time}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => LoadFromJson(element)} type="button" className="Arast-btn primary">
                                            <span className="material-icons">restore</span>بازگردانی
                                        </button>
                                        <button type="button" className="Arast-btn danger">
                                            <span className="material-icons">clear</span>حذف
                                        </button>
                                    </div>
                                </li>
                            ))}

                        </ul>
                        <p class="Arast-history-count">در اینجا شما میتوانید کارهایی که بر روی بوم انجام داده اید را بررسی کنید <span id="Arast-history-count"></span> این صرفا برای بازگردانی و بالعکس ساخته شده است
                        </p>
                    </div>
                </div>
            </div>
        </div>


    </>);
}

export default History;