import { ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";
import { parseParams } from "components/util/functions";

export default class Api {
  constructor() {
    //localStorage.getItem("token")

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let token = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("token")
    ) {
      token = usuario.token;
    }
    this.api_token = token;
    this.client = null;
    this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }
  init = (header = {}) => {
    //this.api_token = getCookie("ACCESS_TOKEN");

    let headers = header;
    if (this.api_token && this.api_token !== "") {
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
  adminCreate = (data) => {
    return this.init().post("admin/signup", data);
  };

  guestCreate = (data) => {
    return this.init().post("auth/signup/guest", data);
  };
  recoverPassword = (email) => {
    return this.init().get("auth/recover-password/" + email);
  };
  validateCode = (email, code) => {
    return this.init().get("auth/validate-code/" + email + "/" + code);
  };
  changePassword = (email, data) => {
    return this.init().post("auth/recover/change-password/" + email, data);
  };
  changePasswordProfile = (email, data) => {
    //TODO falta en el back
    //return this.init().post("auth/recover/change-password/" + email, data);
  };
  editUserProfile = (data) => {
    return this.init().post("user/update-profile", data);
  };

  hostCreate = (data) => {
    return this.init({ "Content-Type": "multipart/form-data" }).post(
      "auth/signup/host",
      data
    );
  };
  profile = (data) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    return this.init({ "Content-Type": "multipart/form-data" }).get(
      "user/profile/" + alias,
      data
    );
  };

  details = async (id) => {
    try {
      const response = await this.init().get("data/accommodation/info/" + id);
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e.response);
    }
  };

  filter = async (params) => {
    /* return await this.init({ "Content-Type": "multipart/form-data" }).get(
      "/data/accommodation/search" + alias,
      data
    );

    */
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_ENDPOINT + "data/accommodation/search",
        { params, paramsSerializer: (params) => parseParams(params) }
      );
      return response.data.accommodations;
    } catch (e) {
      console.log(e.response);
    }
  };

  features = () => {
    return this.init().get("data/features");
  };
  reserveCreate = (data) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }

    return this.init({ "Content-Type": "multipart/form-data" }).post(
      "hosts/accommodation/add/" + alias,
      data
    );
  };
}
