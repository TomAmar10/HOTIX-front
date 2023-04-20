import { useEffect, useState } from "react";
import UserOffers from "../Components/ProfilePages/UserOffers";
import bidService from "../services/bidService";
import { useSelector } from "react-redux";
import { IStore } from "../store/store";
import { Bid } from "../models/Bid";
import { User } from "../models/User";
import filterTickets from "../utils/ticketsFilter";
import { Ticket } from "../models/Ticket";

function ProfileOffersPage(): JSX.Element {
  const user = useSelector((state: IStore) => state.user.user);
  const [userBids, setUserBids] = useState<Bid[]>([]);
  const [userSells, setUserSells] = useState<Bid[]>([]);

  useEffect(() => {
    user?._id &&
      bidService.getUserBids(user?._id).then((res) => {
        const bids: Bid[] = [];
        const sells: Bid[] = [];
        res.data.forEach((b: Bid) => {
          b.tickets = filterTickets(b.tickets as Ticket[]);
          (b.id_bidder as User)._id === user._id ? bids.push(b) : sells.push(b);
        });
        setUserBids(bids);
        setUserSells(sells);
      });
  }, [user]);

  return (
    <main className="container-main">
      <UserOffers bids={userBids} sells={userSells} />
    </main>
  );
}

export default ProfileOffersPage;
