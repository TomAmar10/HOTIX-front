import { useDispatch } from "react-redux";
import { axiosInstance as axios } from "../utils/config";
import config from "../utils/config";
import { communityAction } from "../store/communitySlice";
import { Community } from "../models/Community";

interface CommunityService {
  getAllCommunities: () => Promise<any>;
  addCommunity: (community: Community) => Promise<any>;
}

const useCommunityService = (): CommunityService => {
  const dispatch = useDispatch();
  const getAllCommunities = async (): Promise<any> => {
    try {
      const response = await axios.get(config.communityURL.getAll);
      dispatch(communityAction.setCommunities(response.data));
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const addCommunity = async (community: Community): Promise<any> => {
    try {
      const response = await axios.post(config.communityURL.create, community);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  return {
    getAllCommunities,
    addCommunity,
  };
};

export default useCommunityService;
