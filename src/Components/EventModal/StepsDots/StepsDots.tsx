import "./StepsDots.scss";

interface props {
  currentSlide: number;
  slides: number;
}
function StepsDots(props: props): JSX.Element {
  const steps = [];
  for (let i = 0; i < props.slides; i++) {
    steps.push(
      <div className="single-step-holder" key={i}>
        <span className="step-span">Step {i + 1}</span>
        <div
          className={`single-step ${
            props.currentSlide === i ? "active-slide" : ""
          } ${props.currentSlide > i ? "previous" : ""}`}
        >
          {props.currentSlide > i ? "✓" : ""}
        </div>
      </div>
    );
  }
  return (
    <div className="StepsDots">
      <div className={`dots-area ${props.slides === 3 ? "three-slides" : ""}`}>
        <hr className="dots-splitter" />
        {steps}
      </div>
    </div>
  );
}

export default StepsDots;
