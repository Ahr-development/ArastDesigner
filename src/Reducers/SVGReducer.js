

import * as actionType from "../actionTypes";

const SVGState = {

    Logos : [

        {
            "id": 1,
            "url": "/svg/logos/apple.svg",
            "altText": "Apple Company",
            "faTitle": "َشرکت اپل",
            "title": "Apple",
            "hashtags": ["Apple", "SmartPhone", "Technology", "Design"]
        },
        {
            "id": 2,
            "url": "/svg/logos/bmw.svg",
            "altText": "BMW",
            "faTitle": "َشرکت بی ام و",
            "title": "BMW CARS COMPANY",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
        },
        {
            "id": 3,
            "url": "/svg/logos/microsoft.svg",
            "altText": "Microsoft Coroption",
            "faTitle": "مایکروسافت",
            "title": "Microsoft Coroption",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
        },
        {
            "id": 4,
            "url": "/svg/logos/coca-cola.svg",
            "altText": "Coca-Cola",
            "faTitle": "کوکاکولا",
            "title": "Coca-Cola",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
        },
        {
            "id": 3,
            "url": "/svg/logos/microsoft.svg",
            "altText": "Microsoft Coroption",
            "faTitle": "مایکروسافت",
            "title": "Microsoft Coroption",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
        },
        {
            "id": 4,
            "url": "/svg/logos/coca-cola.svg",
            "altText": "Coca-Cola",
            "faTitle": "کوکاکولا",
            "title": "Coca-Cola",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
        },
        {
            "id": 3,
            "url": "/svg/logos/microsoft.svg",
            "altText": "Microsoft Coroption",
            "faTitle": "مایکروسافت",
            "title": "Microsoft Coroption",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
        },
        {
            "id": 4,
            "url": "/svg/logos/coca-cola.svg",
            "altText": "Coca-Cola",
            "faTitle": "کوکاکولا",
            "title": "Coca-Cola",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
        },
        {
            "id": 3,
            "url": "/svg/logos/microsoft.svg",
            "altText": "Microsoft Coroption",
            "faTitle": "مایکروسافت",
            "title": "Microsoft Coroption",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
        },
        {
            "id": 4,
            "url": "/svg/logos/coca-cola.svg",
            "altText": "Coca-Cola",
            "faTitle": "کوکاکولا",
            "title": "Coca-Cola",
            "hashtags": ["bmw", "SmartPhone", "Technology", "Design"]
    
        },

    ],



}
// ... more SVG data objects


export const SVGReducer = (state = SVGState, action) => {
    switch (action.type) {
        case actionType.SVG:
            return [...action.payload];


        case actionType.ADD_SVG_LOGOS:
            return {
                ...state,
                Logos: state.Logos.concat(action.payload),
              };
        default:
            return state;

    }
}

