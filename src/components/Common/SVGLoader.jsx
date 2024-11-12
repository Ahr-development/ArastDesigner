import React, { useState, useEffect } from 'react';

const SvgLoader = ({ url, onClick }) => {
    const [svgContent, setSvgContent] = useState('');

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(url);
                const svgText = await response.text();
                setSvgContent(svgText);
            } catch (error) {
                console.error('Error fetching SVG:', error);
            }
        };

        fetchSvg();
    }, [url]);

    return (
        <div onClick={() => onClick(svgContent)} dangerouslySetInnerHTML={{ __html: svgContent }} />
    );
};

export default SvgLoader;