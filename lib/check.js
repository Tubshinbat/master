import axios from "axios-base";
import base from "./base";

const errorRender = (error) => {
  let resError = "Алдаа гарлаа дахин оролдоно уу";

  if (error.message) {
    resError = error.message;
  }

  if (error.response !== undefined && error.response.status !== undefined) {
    resError = error.response.status;
  }
  if (
    error.response !== undefined &&
    error.response.data !== undefined &&
    error.response.data.error !== undefined
  ) {
    resError = error.response.data.error.message;
  }
  return resError;
};

export const convertFromdata = (formData) => {
  const sendData = new FormData();

  Object.keys(formData).forEach((key) => {
    const value = formData[key];

    if (
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return;
    }

    // Массив Object (links, category)
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === "object") {
        sendData.append(key, JSON.stringify(value));
      } else {
        value.forEach((v) => {
          sendData.append(key, v);
        });
      }
    }
    // File
    else if (value instanceof File) {
      sendData.append(key, value);
    }
    // Жинхэнэ object (location гэх мэт)
    else if (typeof value === "object") {
      sendData.append(key, JSON.stringify(value));
    }
    // String, number
    else {
      sendData.append(key, value);
    }
  });

  return sendData;
};

export const productRate = async (data) => {
  try {
    const result = await axios.post(`/productrates`, data);
    return { result };
  } catch (error) {
    return error;
  }
};

export const postRate = async (data) => {
  try {
    const result = await axios.post(`/rates`, data);
    return { result };
  } catch (error) {
    return { error: errorRender(error) };
  }
};

export const postCompanyRate = async (data) => {
  try {
    const result = await axios.post(`/companyrates`, data);
    return { result };
  } catch (error) {
    return { error: errorRender(error) };
  }
};
