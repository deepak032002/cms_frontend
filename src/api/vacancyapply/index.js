import axios from "axios";
const api_url = process.env.REACT_APP_URL;

export const formPost = async (data, token) => {
  try {
    const res = await axios.post(`${api_url}/form/`, data, {
      headers: {
        Authorisation: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const getForm = async (token) => {
  try {
    const res = await axios.get(`${api_url}/form`, {
      headers: {
        Authorisation: token,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
