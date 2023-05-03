import { useDispatch } from "react-redux";
import "./ModeSwitch.scss";
import { UserModes, userActions } from "../../../store/authSlice";
import { useState } from "react";

interface props {
  isSeller: boolean;
}

export default function ModeSwitch(props: props) {
  const dispatch = useDispatch();
  const initText = props.isSeller ? "Seller" : "Buyer";
  const [currentText, setCurrentText] = useState(initText);

  const switchClick = () => {
    const changeTo = props.isSeller ? UserModes.BUYER : UserModes.SELLER;
    dispatch(userActions.setMode(changeTo));
    setCurrentText("");
    setTimeout(() => {
      setCurrentText(props.isSeller ? "Buyer" : "Seller");
    }, 300);
  };

  return (
    <div className="ModeSwitch">
      <label htmlFor="" className="switch" onClick={switchClick}>
        <input type="checkbox" />
        <span className={`slider round ${props.isSeller ? "" : "buyer"}`}>
          {currentText}
        </span>
      </label>
    </div>
  );
}
