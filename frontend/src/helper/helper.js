import axios from "axios";

(function () {
  let token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  else {
    axios.defaults.headers.common['Authorization'] = null;
  }
})()