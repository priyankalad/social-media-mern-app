import { create } from "axios";
import config from "config";

const createClient = (baseURL, contentType) =>
  create({
    baseURL,
    headers: {
      "Content-Type": contentType,
      Accept: "application/json",
      Version: "1.0",
    },
  });

const clients = {
  default: {
    client: createClient(config.apiUrl, "application/json"),
  },
  // ,
  // multiPartFormData: {
  //   client: createClient(process.env.REACT_APP_API_URL, "multipart/form-data")
  // }
};

export default clients;
