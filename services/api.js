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

export const apiGetProductBySku = async (data, token) => {
  const uri = `${API_URL}/item/search`;
  const res = await axios({
    method: "POST",
    url: uri,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  })
    .then((res) => res.data)
    .catch((err) => err?.response?.data || err);

  return res;
};

export const apiAddProduct = async (data, token) => {
  const uri = `${API_URL}/item/add`;
  const res = await axios({
    method: "POST",
    url: uri,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  })
    .then((res) => res.data)
    .catch((err) => err?.response?.data || err);

  return res;
};

export const apiEditProduct = async (data, token) => {
  const uri = `${API_URL}/item/update`;
  const res = await axios({
    method: "POST",
    url: uri,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  })
    .then((res) => res.data)
    .catch((err) => err?.response?.data || err);

  return res;
};

export const apiDeleteProduct = async (data, token) => {
  const uri = `${API_URL}/item/delete`;
  const res = await axios({
    method: "POST",
    url: uri,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  })
    .then((res) => res.data)
    .catch((err) => err?.response?.data || err);

  return res;
};
