import React from "react";
import Api from "server/Api";
import NewReserve from "components/organism/NewReserve";

const registerAdmin = async function (
  alias,
  nombre,
  apellido,
  password,
  email,
  telefono,
  avatar,
  fechaNacimiento
) {
  const backend = new Api();
  const objeto = {
    alias: alias,
    email: email,
    password: password,
    name: nombre,
    lastName: apellido,
    phone: telefono,
    birthday: fechaNacimiento,
    picture: avatar,
  };
  return backend.adminCreate({
    alias: alias,
    email: email,
    password: password,
    name: nombre,
    lastName: apellido,
    phone: telefono,
    birthday: fechaNacimiento,
    picture: avatar,
  });
};

export default function AdminRegister() {
  return <NewReserve submit={registerAdmin} type={""} />;
}
