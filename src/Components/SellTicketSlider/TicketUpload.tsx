import NextPrevButtons from "./NextPrevButtons/NextPrevButtons";
import "./TicketUpload.scss";

interface props {
  onSubmit: Function;
  onMoveBackwards:Function;
}

function TicketUpload(props: props): JSX.Element {
  return (
    <>
    <div className="TicketUpload" onClick={() => props.onSubmit()}>
      <h5>Payment Details</h5>
      <label htmlFor="upload-ticket" className="upload-ticket-label">
        Upload PDF
      </label>
      <input type="file" id="upload-ticket" className="upload-ticket-input" />
    </div>
    <NextPrevButtons
        allowNext
        onMoveForward={() => props.onSubmit()}
        onMoveBackwards={props.onMoveBackwards}
        isFirstStep={false}
      />
    </>
  );
}

export default TicketUpload;
