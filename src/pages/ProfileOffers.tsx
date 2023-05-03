import OffersList from "../Components/Profile/OffersList/OffersList";
import { useSelector } from "react-redux";
import { IStore } from "../store/store";

function ProfileOffersPage(): JSX.Element {
  const user = useSelector((state: IStore) => state.user.user);
  const userBidsConfirmed = useSelector(
    (state: IStore) => state.userBids.userBidsConfirmed
  );
  const userBidsWaiting = useSelector(
    (state: IStore) => state.userBids.userBidsWaiting
  );
  const receivedBidsConfirmed = useSelector(
    (state: IStore) => state.userBids.receivedBidsConfirmed
  );
  const receivedBidsWaiting = useSelector(
    (state: IStore) => state.userBids.receivedBidsWaiting
  );

  return (
    <OffersList
      userBidsConfirmed={userBidsConfirmed}
      userBidsWaiting={userBidsWaiting}
      receivedBidsConfirmed={receivedBidsConfirmed}
      receivedBidsWaiting={receivedBidsWaiting}
      user={user}
    />
  );
}

export default ProfileOffersPage;
