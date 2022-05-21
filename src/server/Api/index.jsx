import axios from "axios";

export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }
  init = () => {
    //this.api_token = getCookie("ACCESS_TOKEN");
    let headers = {
      "Content-Type": "application/json",
    };
    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }
    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });
    return this.client;
  };

  login = (data) => {
    return this.init().post("auth/login", data);
  };

  loginAnfitrion = (data) => {
    return this.init().post("users", data);
  };

  addNewUser = (data) => {
    return this.init().post("/users", data);
  };
  getRolList = (data) => {
    return this.init().get("/roles", data);
  };
  addNewRol = (data) => {
    return this.init().post("/roles", data);
  };
}
