import React from "react";
import Api from "server/Api";
import NewReserve from "components/organism/NewHousing";
import { dataURItoBlob } from "components/util/functions";

/*
acc_name

acc_description

acc_price

loc_country

loc_province

loc_city

loc_street

loc_doorNumber

loc_coordinates

services (este se puede repetir, es 1 por cada servicio que TIENE el alojamiento). : Valor = id del servicio

features (este se repite, uno por cada caracteristica que haya, no importa si el valor es cero, se tiene que pasar) : Valor = idCaract-Cantidad => Ejemplo: 4-2

images (tipo FILE, se puede repetir, uno por cada imagen que suba)

*/

const registerReserve = async function (
  services,
  features,
  loc_coordinates = "test",
  loc_country = "test",
  loc_region = "test",
  loc_street = "test",
  loc_doorNumber = "test",
  acc_price = "test",
  acc_name = "test",
  acc_description = "test",
  images
) {
  const backend = new Api();
  const objeto = {};

  var formData = new FormData(); //formdata object

  services.forEach((service) => {
    if (service.hasOwnProperty("valor") && service.valor) {
      formData.append("services", service.id);
    }
  });
  features.forEach((feature) => {
    formData.append("features", feature.id + "-" + feature.cantidad);
  });

  for (const [index, image] of images.entries()) {
    const blob = await fetch(image).then((res) => res.blob());
    formData.append("images", blob, "imagen" + index + ".jpg");
  }
  /*
  images.forEach(async (image, i) => {
    console.log(image);

    //const file = dataURItoBlob(image);
    const file = {
      uri: Platform.OS == "android" ? ImageUri.path : `file://${ImageUri.path}`,
      name: "image.jpg",
      type: ImageUri.mime, // e.g. 'image/jpg'
    };
    formData.append("images", blob);
  });
  */
  formData.append("loc_coordinates", "");
  formData.append("loc_country", "uruguay");
  formData.append("loc_province", "montevideo");
  formData.append("loc_street", "Av uruguay");
  formData.append("loc_doorNumber", "332");
  formData.append("acc_price", 3040);
  formData.append("loc_city", "montevideo");

  /*
  formData.append("loc_coordinates", loc_coordinates);
  formData.append("loc_country", loc_country);
  formData.append("loc_region", loc_region);
  formData.append("loc_street", loc_street);
  formData.append("loc_doorNumber", loc_doorNumber);
  formData.append("acc_price", acc_price);
  */
  formData.append("acc_name", acc_name);
  formData.append("acc_description", acc_description);
  /*for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }*/

  console.log(formData);
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  return backend.reserveCreate(formData);
};

export default function CreateHousing() {
  return <NewReserve submit={registerReserve} type={""} />;
}
