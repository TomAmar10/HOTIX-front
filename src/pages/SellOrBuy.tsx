import { useSelector } from "react-redux";
import ChooseSellBuy from "../Components/ChooseSellBuy/ChooseSellBuy";
import { User } from "../models/User";

function SellOrBuyPage(): JSX.Element {
  const user: User = useSelector((state: any) => state.user.user);

  return (
    <main className="container-main">
      <ChooseSellBuy user={user} />
    </main>
  );
}

export default SellOrBuyPage;
