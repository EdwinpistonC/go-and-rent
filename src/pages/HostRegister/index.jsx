import Api from "server/Api";
import RegisterHost from "components/organism/RegisterHost";

const registerHost = async function (
  alias,
  email,
  contra,
  apellido,
  nombre,
  telefono,
  avatar,
  fechaNacimiento,
  bank,
  account,
  locCoordinates,
  locCountry,
  accPrice,
  locStreet,
  imagenes,
  locDoorNumber,
  accName,
  accDescription,
  servicios,
  caracteristicas
) {
  const backend = new Api();
  var formData = new FormData(); //formdata object
  console.log(servicios);
  servicios.forEach((service) => {
    if (service.hasOwnProperty("valor") && service.valor) {
      formData.append("services", service.id);
    }
  });
  caracteristicas.forEach((feature) => {
    formData.append("features", feature.id + "-" + feature.cantidad);
  });

  for (const [index, image] of imagenes.entries()) {
    const blob = await fetch(image).then((res) => res.blob());
    formData.append("images", blob, "imagen" + index + ".jpg");
  }
  formData.append("alias", alias);
  formData.append("email", email);
  formData.append("password", contra);
  formData.append("name", nombre);
  formData.append("lastName", apellido);
  formData.append("phone", telefono);
  formData.append("birthday", fechaNacimiento);
  formData.append("picture", avatar);
  formData.append("bank", bank);
  formData.append("account", account);
  formData.append("loc_coordinates", locCoordinates);
  formData.append("loc_country", locCountry);
  formData.append("loc_province", "montevideo");
  formData.append("loc_street", locStreet);
  formData.append("loc_doorNumber", locDoorNumber);
  formData.append("acc_price", accPrice);
  formData.append("loc_city", "montevideo");
  formData.append("acc_name", accName);
  formData.append("acc_description", accDescription);

  return backend.hostCreate(formData);
};

export default function HostHousing() {
  return <RegisterHost submit={registerHost}></RegisterHost>;
}
