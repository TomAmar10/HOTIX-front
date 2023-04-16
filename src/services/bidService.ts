import axios from "axios";
import { Bid } from "../models/Bid";
import config from "../utils/config";
import { Ticket } from "../models/Ticket";

class Service {
  public getAllBids = async (): Promise<any> => {
    try {
      const response = await axios.get(config.bidURL.getAll);
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
    bid: number,
  ): Promise<any> => {
    try {
      const userBid: Bid = {
        id_ticket: tickets[0]._id as string,
        id_bidder,
        amount: bid,
        status: "",
      };
      const response = await axios.post(config.bidURL.create, userBid);
      console.log(response);
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
