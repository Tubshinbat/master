import axios from "axios-base";

export const updateUser = async (user, data) => {
  if (user) {
    const update = await axios.put(`/members/${user._id}`, data);
    return { update };
  }
};

export const createUser = async (user, data) => {
  if (user) {
    const result = await axios.put(`/members/${user._id}`, data);
    return { result };
  }
};
