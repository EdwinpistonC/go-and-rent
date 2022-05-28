import axios from "axios";

/*

const [token, setToken] = useLocalStorage("token", "");
const [alias, setAlias] = useLocalStorage("alias", "");
const [nombre, setNombre] = useLocalStorage("nombre", "");
const [rol, setRol] = useLocalStorage("rol", "");

*/

export default class Api {
  constructor() {
    //localStorage.getItem("token")

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let token = null;
    if (
      usuario != null &&
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
  hostCreate = (data) => {
    return this.init({ "Content-Type": "multipart/form-data" }).post(
      "auth/signup/host",
      data
    );
  };
  features = () => {
    return this.init().get("data/features");
  };
  reserveCreate = (data) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario != null &&
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
