import "./NextPrevButtons.scss";

interface props {
  isFirstStep: boolean | undefined;
  allowNext: boolean;
  onMoveForward: Function | undefined;
  onMoveBackwards: Function | undefined;
}
function NextPrevButtons(props: props): JSX.Element {
  return (
    <div className="NextPrevButtons">
      <button
        className="sell-ticket-nav"
        onClick={() => props.onMoveForward && props.onMoveForward()}
        disabled={!props.allowNext}
      >
        Next
      </button>
      {!props.isFirstStep && (
        <button
          className="sell-ticket-nav"
          onClick={() => props.onMoveBackwards && props.onMoveBackwards()}
        >
          Previous
        </button>
      )}
    </div>
  );
}

export default NextPrevButtons;
