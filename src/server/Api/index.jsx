import axios from "axios";
import { useLocalStorage } from "Hooks/LocalStoreHook";

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
    console.log(usuario);
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
  init = () => {
    //this.api_token = getCookie("ACCESS_TOKEN");

    let headers = {};
    if (this.api_token && this.api_token != "") {
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
  hostCreate = (data) => {
    return this.init().post("auth/signup/guest", data);
  };
  features = () => {
    return this.init().get("data/features");
  };
}
