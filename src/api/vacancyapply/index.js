import axios from "axios";
const api_url = process.env.REACT_APP_URL;

export const vacancyTeachingForm = async (data, token) => {
  try {
    const res = await axios.post(`${api_url}/form/`, data, {
      headers: {
        Authorisation: token,
        "Content-Type": "multipart/form-data"
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const vacancyNonTeachingForm = async (data, token) => {
    try {
      const res = await axios.post(`${api_url}/form/`, data, {
        headers: {
          Authorisation: token,
          "Content-Type": "multipart/form-data"
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  };