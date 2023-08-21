import { Bid } from "../../../models/Bid";
import { User } from "../../../models/User";
import SingleHistory from "./SingleHistory";
import { LanguageTicketsPage } from "../../../languageControl/Language";
import "./SalesHistory.scss";

interface props {
  confirmedBids: Bid[];
  user: User;
  data: LanguageTicketsPage;
  isHebrew: boolean;
}

function SalesHistory(props: props): JSX.Element {
  const data = props.data.SalesHistory;
  return (
    <div className="SalesHistory user-page-section">
      <h4 className="section-header">{data.header}</h4>
      <hr />
      <div className="sales-history-container">
        {props.confirmedBids.map((b) => (
          <SingleHistory
            bid={b}
            key={`${b._id}-history`}
            isHebrew={props.isHebrew}
            data={data}
          />
        ))}
      </div>
    </div>
  );
}

export default SalesHistory;
