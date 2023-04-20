import axios from "axios";
import { Bid } from "../models/Bid";
import config from "../utils/config";
import { Ticket } from "../models/Ticket";
import { User } from "../models/User";

class Service {
  public getAllBids = async (): Promise<any> => {
    try {
      const response = await axios.get(config.bidURL.getAll);
      return response;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getUserBids = async (userId: string): Promise<any> => {
    try {
      const response = await axios.get(
        `${config.bidURL.getUserBids}/${userId}`
      );
      return response;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getBid = async (id: string): Promise<Bid> => {
    try {
      const response = await axios.get(`${config.bidURL.getSingle}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public addBid = async (
    tickets: Ticket[],
    id_bidder: string,
    bid: number
  ): Promise<any> => {
    try {
      const ticketsIds: string[] = [];
      tickets.forEach((t) => {
        ticketsIds.push(t._id as string);
      });
      const userBid: Bid = {
        tickets: ticketsIds,
        id_bidder,
        id_owner: (tickets[0].id_owner as User)._id as string,
        amount: bid,
        status: "",
      };
      const response = await axios.post(config.bidURL.create, userBid);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  public deleteBid = async (details: Bid, token: string) => {
    try {
      await axios.post(config.bidURL.delete, details, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response.data;
    }
  };

  public updateBid = async (ticket: Bid) => {
    try {
      const response = await axios.patch(
        `${config.bidURL.update}/${ticket._id}`,
        ticket,
        {
          //   headers: {
          //     authorization: `Bearer ${ticket.token}`,
          //   },
        }
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };
}

const service = new Service();
export default service;
