import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SVGLoader } from "../../../../Loaders/SVGLoader";
import InfiniteScroll from 'react-infinite-scroller';
import { updateSVGLogos } from "../../../../../Actions/InitAppAction";



const LogoTab = () => {

    const svg = useSelector((state) => state.ISVG)
    const app = useSelector((state) => state.InitApp);
    const dispatch = useDispatch();


    const arrayo = [
        {
            "id": Math.random() * 2,
            "url": "/svg/logos/bmw.svg",
            "altText": "BMW",
            "faTitle": "َشرکت بی ام و",
            "title": "BMW CARS COMPANY",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]

        },
        {
            "id": Math.random() * 2,
            "url": "/svg/logos/bmw.svg",
            "altText": "BMW",
            "faTitle": "َشرکت بی ام و",
            "title": "BMW CARS COMPANY",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]

        },
        {
            "id": Math.random() * 2,
            "url": "/svg/logos/bmw.svg",
            "altText": "BMW",
            "faTitle": "َشرکت بی ام و",
            "title": "BMW CARS COMPANY",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]

        },
        {
            "id": Math.random() * 2,
            "url": "/svg/logos/bmw.svg",
            "altText": "BMW",
            "faTitle": "َشرکت بی ام و",
            "title": "BMW CARS COMPANY",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]

        },
    ]



    useEffect(() => {
        const svgs = document.getElementById("logosvg-server")
    }, [])

    const logoClickListener = function (id) {
        const item = svg.Logos.find(logo => logo.id === id);

        fabric.loadSVGFromURL(item.url, function (objects) {
            const groupedObject = new fabric.Group(objects);
            app.canvas.add(groupedObject);
        });
        app.canvas.requestRenderAll()

    };





    useEffect(() => {
    }, []);



    const loadmore = () => {
        dispatch(updateSVGLogos(arrayo))
    }

    return (<>

        <div className="row " id="logosvg-server" >
            {svg.Logos.map((svgObject) => (
                <div className="col-6 arast-logos" key={svgObject.id}>
                    <img className="designsImage" onClick={() => logoClickListener(svgObject.id)} src={svgObject.url} alt={svgObject.title}
                    />
                </div>
            ))}

            <button className="custom-btn-no-dimensions btn-10" onClick={() => loadmore()}>بارگزاری بیشتر</button>
        </div>

    </>);
}

export default LogoTab;