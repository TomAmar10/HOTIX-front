import "./SaleCompleted.scss";

interface props {}

function SaleCompleted(props: props): JSX.Element {
  return (
    <div className="SaleCompleted">
      <h5>CONGRATULATIONS !!!</h5>
      <p>
        Now you can see your bids in your wallet and choose the best one for you
      </p>
      <i className="fa-solid fa-circle-check"></i>  
    </div>
  );
}

export default SaleCompleted;
