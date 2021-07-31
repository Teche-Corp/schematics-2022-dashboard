import axios from 'axios';
import { bearerToken } from './helper';

export const getWithToken = (url) =>
  axios.get(url, { headers: { ...bearerToken() } }).then((res) => res.data);

export const postDetailTim = (url, id) =>
  axios
    .post(url, { team_id: id }, { headers: { ...bearerToken() } })
    .then((res) => res.data);
