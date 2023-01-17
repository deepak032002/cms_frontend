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

export const formUpdate = async (data, token) => {
  try {
    const res = await axios.put(`${api_url}/form/`, data, {
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

const changeUrlToByte = async (url) => {
  let res = await fetch(url);
  let file;
  const data = await res.blob();
  if (data.type === "image/png") {
    file = new File([data], "image.png", {
      type: "image/png",
    });
  }

  if (data.type === "application/octet-stream") {
    file = new File([data], "image.webp", {
      type: "application/octet-stream",
    });
  }

  if (data.type === "image/jpg") {
    file = new File([data], "image.jpg", {
      type: "image/jpg",
    });
  }

  if (data.type === "image/jpeg") {
    file = new File([data], "image.jpeg", {
      type: "image/jpeg",
    });
  }

  if (data.type === "application/pdf") {
    file = new File([data], "myFile.pdf", {
      type: "application/pdf",
    });
  }
  return file;
};

export const getForm = async (token) => {
  try {
    const res = await axios.get(`${api_url}/form/`, {
      headers: {
        Authorisation: token,
      },
    });

    const image = await changeUrlToByte(res.data.form.personal_details.image);

    const promise = new Promise((resolve, reject) => {
      // {
      //   ...res.data.form,
      //   personal_details: {
      //     ...res.data.form.personal_details,
      //     image_url: res.data.form.personal_details.image,
      //     image: image,
      //   },
      // }

      res.data.form.personal_details.image_url =
        res.data.form.personal_details.image;
      res.data.form.personal_details.image = image;

      resolve(res);
    });

    return promise;
  } catch (error) {
    return error;
  }
};
