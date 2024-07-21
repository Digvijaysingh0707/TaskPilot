import { endPoint } from "../settings/urls";
import axios from "axios";

export function addUser(params) {
  let _url = `${endPoint.url.Apiurl}${endPoint.user.addUser}`
  return axios.post(_url, params);
}
