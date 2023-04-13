import "./StepsDots.scss";

interface props {
    currentSlide:number;
}
function StepsDots(props:props): JSX.Element {
  return (
    <div className="StepsDots">
      <div className="dots-area">
        <hr className="dots-splitter" />
        {[0, 1, 2, 3, 4].map((d) => (
          <div className="step-button-holder" key={d}>
            <span className="step-span">Step {d + 1}</span>
            <button
              value={d}
              className={`${props.currentSlide === d ? "active-slide" : ""} ${
                props.currentSlide > d ? "previous" : ""
              }`}
            >
              {props.currentSlide > d ? "✔" : ""}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepsDots;
