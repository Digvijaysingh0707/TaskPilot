import { endPoint } from "../settings/urls";
import axios from "axios";

export function addTask(params) {
  let _url = `${endPoint.url.Apiurl}${endPoint.task.addTask}`
  return axios.post(_url, params);
}

export function getTasks(params) {
  let _url = `${endPoint.url.Apiurl}${endPoint.task.getTasks}`;
  return axios.get(_url, { params });
}

export function updateTask(params) {
  let _url = `${endPoint.url.Apiurl}${endPoint.task.updateTask}`
  return axios.put(_url, params);
}


export function deleteTask(taskId) {
  let _url = `${endPoint.url.Apiurl}${endPoint.task.deleteTask}/${taskId}`;
  return axios.delete(_url);
}
