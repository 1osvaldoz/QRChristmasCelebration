/* eslint-disable no-param-reassign */
import axios from "axios";
import urlData from "../config.json";

const { SERVER_URL } = urlData;

const request = async (params) => {
  const { url, method = 'get', data = {}, headers = {}, token = '' } = params;
  try {
      const fullUrl = `${SERVER_URL}${url}`;
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await axios({
          method,
          headers,
          url: fullUrl,
          data,
      });

      return { error: '', data: response.data, status: '' };
  } catch (err) {
      return { error: err, data: '', status: err.response?.status };
  }
};

export default request;
