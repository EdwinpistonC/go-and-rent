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
      console.log(headers.Authorization);
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
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(usuario);
    //return this.init().post("auth/recover/change-password/" + email, data);
  };
  editUserProfile = async (data) => {
    let resultado = await this.init().put("user/update-profile", data);

    return [resultado.data, resultado.status];
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
  listadoUsuarios = () => {
    return this.init().get("admin/users");
  };
  alojamientosAnfitrion = async () => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    let resultado = await this.init().get("hosts/accommodation/list/" + alias);

    return resultado.data;
  };
  reservasHuesped = async () => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    let resultado = await this.init().get("guests/bookings/" + alias);

    return resultado.data;
  };

  listadoReservas = async () => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    let resultado = await this.init().get(
      "hosts/bookings/" + alias + "?nroPag=0&cantReg=100"
    );

    return resultado.data;
  };
  booking = async (data) => {
    let resultado = await this.init().post("booking/guest/confirm", data);
    return resultado.data;
  };
  calificarHuesped = async (
    data = {
      qualifyingUser: "anfitrion1",
      qualifiedUser: "prueba1",
      qualification: 4,
    }
  ) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    data.qualifyingUser = alias;
    let resultado = await this.init().post("hosts/qualify-guest", data);
    return resultado.data;
  };
  eliminarCalificacionHuesped = async (guest) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    let resultado = await this.init().delete(
      "hosts/qualify-guest/" + alias + "/" + guest
    );
    return resultado.data;
  };
  rechazarReserva = async (
    data = {
      booking_id: 0,
    }
  ) => {
    let resultado = await this.init().post("booking/host/reject", data);
    return resultado.data;
  };
  rembolsarReserva = async (
    data = {
      booking_id: 0,
      reimbursedBy: "HOST" | "GUEST",
    }
  ) => {
    let resultado = await this.init().post("booking/refund", data);
    return resultado.data;
  };
  confirmarReserva = async (
    data = {
      booking_id: 0,
    }
  ) => {
    let resultado = await this.init().post("booking/host/confirm", data);
    return resultado.data;
  };
  obtenerEstadisticas = async () => {
    let resultado = await this.init().get("admin/statistics");
    return resultado.data;
  };
}
