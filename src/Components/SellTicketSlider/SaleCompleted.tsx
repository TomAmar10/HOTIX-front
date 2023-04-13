import "./SaleCompleted.scss";

interface props {
  isCurrent: boolean;
}

function SaleCompleted(props: props): JSX.Element {
  return (
    <div className="SaleCompleted" style={{ opacity: props.isCurrent ? 1 : 0 }}>
      <h5>CONGRATULATIONS !!!</h5>
      <p>
        Now you can see your bids in your wallet and choose the best one for you
      </p>
      <i className="fa-solid fa-circle-check"></i>
    </div>
  );
}

export default SaleCompleted;
