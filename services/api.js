import axios from "axios";

const API_URL = "https://hoodwink.medkomtek.net/api";

export const apiRegister = async (payload) => {
  const uri = `${API_URL}/register`;
  const res = await axios({
    method: "POST",
    url: uri,
    data: payload,
  })
    .then((res) => res.data)
    .catch((err) => err?.response?.data || err);

  return res;
};

export const apiLogin = async (payload) => {
  const uri = `${API_URL}/auth/login`;
  const res = await axios({
    method: "POST",
    url: uri,
    data: payload,
  })
    .then((res) => res.data)
    .catch((err) => err?.response?.data || err);

  return res;
};

export const apiGetProduct = async () => {
  const uri = `${API_URL}/items`;
  const res = await axios({
    method: "GET",
    url: uri,
  })
    .then((res) => res.data)
    .catch((err) => err?.response?.data || err);

  return res;
};
