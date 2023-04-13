import axios from "axios";
import config from "../utils/config";

class Service {
  public getAllSubscribes = async (): Promise<any> => {
    try {
      const response = await axios.get(config.subscribeUrl.getAll);
      return response;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getSubscribe = async (id: string): Promise<any> => {
    try {
      const response = await axios.get(`${config.subscribeUrl.getSingle}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public addSubscribe = async (email: string): Promise<any> => {
    try {
      const response = await axios.post(config.subscribeUrl.create, {email});
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

}

const service = new Service();
export default service;
