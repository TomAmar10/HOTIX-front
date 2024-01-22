import { useSelector } from "react-redux";
import { IStore } from "../store/store";
import CommunityProfile from "../Components/CommunityProfile/CommunityProfile";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useTicketService from "../services/ticketService";
import { Event } from "../models/Event";
import { Ticket } from "../models/Ticket";

function CommunityPage(): JSX.Element {
  const ticketService = useTicketService();
  const { communityId } = useParams();
  const langData = useSelector((state: IStore) => state.language.langData);
  const allCommunities = useSelector(
    (state: IStore) => state.communities.communities
  );
  const currentCommunity = allCommunities?.filter(
    (c) => c._id === communityId
  )[0];
  const user = useSelector((state: IStore) => state.user.user);

  useEffect(() => {
    currentCommunity &&
      ticketService
        .getTicketsForSaleByEvent(
          (currentCommunity.events as Event[])[0]._id as string
        )
        .then((res: Ticket[]) => {
          console.log(res);
        });
  }, [currentCommunity]);

  return (
    <>
      {currentCommunity && (
        <CommunityProfile
          data={langData}
          community={currentCommunity}
          user={user}
        />
      )}
    </>
  );
}

export default CommunityPage;
