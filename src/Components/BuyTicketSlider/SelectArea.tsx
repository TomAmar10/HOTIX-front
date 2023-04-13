import { useState } from "react";
import "./SelectArea.scss";

interface props {
  onSubmit: Function;
  isCurrent: boolean;
  areas: string[];
}

function SelectArea(props: props): JSX.Element {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const toggleArea = (value: string) => {
    const areas = [...selectedAreas];
    const index = selectedAreas.findIndex((s) => s === value);
    if (index === -1) areas.push(value);
    else areas.splice(index, 1);
    setSelectedAreas(areas);
    props.onSubmit(areas);
  };

  return (
    <div
      className="sell-ticket-section-wrapper"
      style={{ opacity: props.isCurrent ? 1 : 0 }}
    >
      <div className="SelectArea">
        <img
          src="https://seatlab.com/wp-content/uploads/Screenshot-2020-09-10-at-11.06.36-1024x802.png"
          alt="venue"
          className="venue-image"
        />
        <h5 className="buy-ticket-section-header">Select Area</h5>
        <div className="available-area-container">
          {props.areas.map((a) => (
            <button key={a}
              className={`area-button ${
                selectedAreas.includes(a) ? "selected" : ""
              }`}
              onClick={() => toggleArea(a)}
            >{a}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectArea;
