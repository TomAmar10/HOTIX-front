import axios from "axios";
import { User } from "../models/User";
import config from "../utils/config";

class Service {
  public getAllUsers = async (): Promise<User[]> => {
    try {
      const response = await axios.get(config.userURL.getAll);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getUser = async (id: string): Promise<User> => {
    try {
      const response = await axios.get(`${config.userURL.getSingle}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public login = async (userCred: User): Promise<any> => {
    try {
      const response = await axios.post(config.userURL.login, userCred);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  public register = async (user: User): Promise<any> => {
    try {
      const response = await axios.post(config.userURL.register, user);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  public deleteUser = async (details: User, token: string) => {
    try {
      await axios.post(config.userURL.delete, details, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response.data;
    }
  };

  public updateUser = async (user: User) => {
    try {
      const response = await axios.patch(
        `${config.userURL.update}/${user._id}`,
        user,
        {
          //   headers: {
          //     authorization: `Bearer ${user.token}`,
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
