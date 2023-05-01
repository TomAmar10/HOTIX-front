import axios from "axios";
import { Deal } from "../models/Deal";
import config from "../utils/config";
import { Bid } from "../models/Bid";
import { Ticket } from "../models/Ticket";

class Service {
  public getAllDeals = async (): Promise<any> => {
    try {
      const response = await axios.get(config.dealURL.getAll);
      return response;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getUserDeals = async (userId: string): Promise<any> => {};

  public getDeal = async (id: string): Promise<Deal> => {
    try {
      const response = await axios.get(`${config.dealURL.getSingle}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public transferTicket = async (bid: Bid): Promise<any> => {
    try {
      const newTicketsArr: string[] = bid.tickets.map(
        (t) => (t as Ticket)._id as string
      );
      const deal: Deal = {
        tickets: newTicketsArr,
        id_seller: bid.id_owner,
        id_buyer: bid.id_bidder,
        id_bid: bid._id as string,
        price: bid.amount,
      };
      const response = await axios.post(config.dealURL.create, deal);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  public deleteDeal = async (details: Deal, token: string) => {
    try {
      await axios.post(config.dealURL.delete, details, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response.data;
    }
  };

  public updateDeal = async (deal: Deal) => {
    try {
      const response = await axios.patch(
        `${config.dealURL.update}/${deal._id}`,
        deal
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };
}

const service = new Service();
export default service;
