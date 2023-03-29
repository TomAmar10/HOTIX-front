import axios from "axios";
import { Category } from "../models/Category";
import { Event } from "../models/Event";
import config from "../utils/config";

class Service {
  public getAllEvents = async (): Promise<any> => {
    try {
      const response = await axios.get(config.eventURL.getAll);
      return response;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };
  public getAllCategories = async (): Promise<any> => {
    try {
      const response = await axios.get(config.categoryURL.getAll);
      return response;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };
  public getCategory = async (): Promise<Category> => {
    try {
      const response = await axios.get(config.eventURL.getSingle);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getEvent = async (id: string): Promise<Event> => {
    try {
      const response = await axios.get(`${config.eventURL.getSingle}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public addEvent = async (event: Event): Promise<any> => {
    try {
      const response = await axios.post(config.eventURL.create, event);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  public deleteEvent = async (details: Event, token: string) => {
    try {
      await axios.post(config.eventURL.delete, details, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response.data;
    }
  };

  public updateEvent = async (event: Event) => {
    try {
      const response = await axios.patch(
        `${config.eventURL.update}/${event._id}`,
        event,
        {
          //   headers: {
          //     authorization: `Bearer ${event.token}`,
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
