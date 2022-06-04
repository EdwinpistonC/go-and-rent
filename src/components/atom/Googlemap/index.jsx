import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { BusquedaContainer } from "./StyledComponents";
import { useLocalStorage, DefaultBusqueda } from "Hooks/LocalStoreHook";

export default function GoogleMap() {
  const [busqueda, , setBusqueda] = useLocalStorage(
    "busqueda",
    DefaultBusqueda
  );
  let mapVal = busqueda.place;

  return (
    <BusquedaContainer>
      <GooglePlacesAutocomplete
        style={{
          innerHeight: "100%",
        }}
        getOptionValue={({ value }) => console.log(value)}
        apiKey={process.env.REACT_APP_API_GOOGLEMAP}
        apiOptions={{ language: "es", region: "es" }}
        types={"geocode"}
        autocompletionRequest={{
          bounds: [
            { lat: 50, lng: 50 },
            { lat: 100, lng: 100 },
          ],
        }}
        selectProps={{
          mapVal,
          onChange: (e) => {
            setBusqueda("place", e);
          },
        }}
      />
    </BusquedaContainer>
  );
}
