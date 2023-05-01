import axios from "axios";
import { Ticket } from "../models/Ticket";
import config from "../utils/config";

class Service {
  public getAllTickets = async (): Promise<any> => {
    try {
      const response = await axios.get(config.ticketURL.getAll);
      return response;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getTicket = async (id: string): Promise<Ticket> => {
    try {
      const response = await axios.get(`${config.ticketURL.getSingle}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getTicketsForSaleByEvent = async (
    eventId: string
  ): Promise<Ticket[]> => {
    try {
      const response = await axios.get(
        `${config.ticketURL.getForSaleByEvent}/${eventId}`
      );
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getUserTicketsForSaleByEvent = async (
    userId: string,
    eventId: string
  ): Promise<Ticket[]> => {
    try {
      const response = await axios.get(
        `${config.ticketURL.getForSaleByUserEvent}/${userId}/${eventId}`
      );
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getUserTickets = async (userId: string): Promise<Ticket[]> => {
    try {
      const response = await axios.get(
        `${config.ticketURL.getUserTickets}/${userId}`
      );
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public addTickets = async (tickets: Ticket[] | any): Promise<any> => {
    try {
      const response = await axios.post(
        config.ticketURL.createFew,
        tickets
        //   , {
        //   headers: { "Content-Type": "multipart/form-data" },
        // }
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  public deleteTicket = async (details: Ticket, token: string) => {
    try {
      await axios.post(config.ticketURL.delete, details, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response.data;
    }
  };

  public updateTicket = async (ticket: Ticket) => {
    try {
      const response = await axios.patch(
        `${config.ticketURL.update}/${ticket._id}`,
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
