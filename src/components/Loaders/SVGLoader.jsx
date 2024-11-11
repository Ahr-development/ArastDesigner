

export const SVGLoader = ({ svgData }) => {
    return (
      <div className="svg-container">
        <img src={svgData.url} alt={svgData.altText} />
        <p>{svgData.title}</p>
      </div>
    );
  };