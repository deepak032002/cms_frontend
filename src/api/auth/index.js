import axios from "axios";
const api_url = process.env.REACT_APP_URL;
// http://localhost:8000/vacancy

export const loginApi = async (data) => {
  try {
    const res = await axios.post(`${api_url}/login/`, data, {
      headers: {},
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const signUpApi = async (data) => {
  console.log(api_url);
  try {
    const res = await axios.post(`${api_url}/register/`, data, {
      headers: {},
    });

    return res;
  } catch (error) {
    return error;
  }
};
