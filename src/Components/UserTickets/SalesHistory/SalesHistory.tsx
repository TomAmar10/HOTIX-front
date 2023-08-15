import { Bid } from "../../../models/Bid";
import { User } from "../../../models/User";
import SingleHistory from "./SingleHistory";
import "./SalesHistory.scss";
import { LanguageTicketsPage } from "../../../languageControl/Language";

interface props {
  confirmedBids: Bid[];
  user: User;
  data: LanguageTicketsPage;
}

function SalesHistory(props: props): JSX.Element {
  const data = props.data.SalesHistory;
  return (
    <div className="SalesHistory user-page-section">
      <h4 className="section-header">{data.header}</h4>
      <hr />
      <div className="sales-history-container">
        {props.confirmedBids.map((b) => (
          <SingleHistory bid={b} key={`${b._id}-history`} />
        ))}
      </div>
    </div>
  );
}

export default SalesHistory;
