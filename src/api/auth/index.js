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

export const isVerifyEmail = async (token) => {
  try {
    const res = await axios.get(`${api_url}/isverify-email/`, {
      headers: {
        Authorisation: token,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const resendSendEmail = async (data) => {
  try {
    const res = await axios.post(`${api_url}/resend-email/`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const verifyEmail = async (data) => {
  try {
    const res = await axios.post(`${api_url}/verify-email/`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const forgetPassword = async (data) => {
  try {
    const res = await axios.post(`${api_url}/forget-password/`, data);
    return res;
  } catch (error) {
    return error;
  }
};
export const resetPassword = async (data) => {
  try {
    const res = await axios.post(`${api_url}/reset-password/`, data);
    return res;
  } catch (error) {
    return error;
  }
};

// export const
