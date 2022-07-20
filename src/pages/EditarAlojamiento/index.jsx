import React from "react";
import { EditHousing } from "components/organism/NewHousing";
import Api from "server/Api";
import { useParams } from "react-router-dom";

const actualizarAlojamiento = async (
  id,
  services,
  features,
  place,
  loc_coordinates = "test",
  loc_street = "test",
  loc_doorNumber = "test",
  acc_price = "test",
  acc_name = "test",
  acc_description = "test",
  images
) => {
  const backend = new Api();
  var formData = new FormData(); //formdata object

  let _place;
  if (typeof place.value == "undefined") {
    _place = place;
  } else {
    _place = place.value.terms;
  }
  let country = _place[0].value;
  let province = _place[0].value;
  let city = _place[0].value;

  if (_place.length === 3) {
    country = _place[2].value;
    province = _place[1].value;
  } else if (place.value.terms.length === 2) {
    country = _place[1].value;
    province = _place[0].value;
  }

  services.forEach((service) => {
    if (service.hasOwnProperty("value") && service.value) {
      formData.append("services", service.id);
    }
  });
  features.forEach((feature) => {
    formData.append("features", feature.id + "-" + feature.value);
  });

  for (const [index, image] of images.entries()) {
    const blob = await fetch(image).then((res) => res.blob());
    formData.append("images", blob, "imagen" + index + ".jpg");
  }

  formData.append("loc_coordinates", "");
  formData.append("loc_country", country);
  formData.append("loc_province", province);
  formData.append("loc_street", loc_street);
  formData.append("loc_doorNumber", loc_doorNumber);
  formData.append("acc_price", acc_price);
  formData.append("loc_city", city);

  formData.append("acc_name", acc_name);
  formData.append("acc_description", acc_description);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  return backend.editarAlojamiento(id, formData);
};

export default function EditarAlojamiento() {
  const { id } = useParams();
  const [alojamientoOriginal, setAlojamientoOriginal] = React.useState({});

  React.useEffect(() => {
    const obtenerData = async () => {
      const api = new Api();

      const data = await api.details(id);

      setAlojamientoOriginal(data);
    };
    obtenerData();
    return () => {};
  }, []);
  if (Object.keys(alojamientoOriginal).length == 0) {
    return <div></div>;
  }

  return (
    <EditHousing
      id={id}
      data={alojamientoOriginal}
      submit={actualizarAlojamiento}
      type={""}
    />
  );
}
