import { useDispatch } from "react-redux";
import { axiosInstance as axios } from "../utils/config";
import config from "../utils/config";
import { eventActions } from "../store/eventSlice";
import { Tag } from "../models/Tag";

interface TagService {
  getAllTags: () => Promise<any>;
  addTag: (tag:Tag) => Promise<any>;
}

const useTagService = (): TagService => {
  const dispatch = useDispatch();
  const getAllTags = async (): Promise<any> => {
    try {
      const response = await axios.get(config.tagUrl.getAll);
      dispatch(eventActions.setTags(response.data));
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const addTag = async (tag: Tag): Promise<any> => {
    try {
      const response = await axios.post(config.tagUrl.create, tag);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  return {
    getAllTags,
    addTag,
  };
};

export default useTagService;
