import axios from "axios";

export function getSmartCityInfo() {
  return axios.get("http://127.0.0.1:4523/mock/804594/api/smartcity/info");
}

export function getSmartCityList() {
  return axios.get("https://mock.apifox.cn/m1/2940535-0-default/api/smartcity/list");
}
