import { endPoint } from "../settings/urls";
import axios from "axios";

export function addTask(params) {
  let _url = `${endPoint.url.Apiurl}${endPoint.task.addTask}`
  return axios.post(_url, params);
}

export function getTasks(params) {
  let _url = `${endPoint.url.Apiurl}${endPoint.task.getTasks}`;
  return axios.get(_url, params);
}
