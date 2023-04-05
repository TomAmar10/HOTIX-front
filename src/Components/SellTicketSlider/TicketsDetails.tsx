import NextPrevButtons from "./NextPrevButtons/NextPrevButtons";
import "./TicketsDetails.scss";

interface props {
  amount: number;
  onSubmit: Function;
  onMoveBackwards: Function;
}

function TicketsDetails(props: props): JSX.Element {
  const Tickets = () => {
    const ticketsArray = [];
    for (let i = 0; i < props.amount; i++) {
      ticketsArray.push(
        <tr key={i}>
          <td>
            <input type="text" value={i + 1} required disabled />
          </td>
          <td>
            <input type="text" maxLength={3} placeholder="3A" required />
          </td>
          <td>
            <input type="text" placeholder="9" required />
          </td>
        </tr>
      );
    }
    return <>{ticketsArray}</>;
  };

  return (
    <>
      <div className="TicketsDetails">
        <h5>Ticket details</h5>
        <div className="details-container">
          <table className="details-table">
            <thead>
              <tr>
                <th>Ticket Number</th>
                <th>Seat</th>
                <th>Row</th>
              </tr>
            </thead>
            <tbody>{<Tickets />}</tbody>
          </table>
        </div>
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

export default TicketsDetails;
