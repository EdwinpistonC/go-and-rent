import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { BusquedaContainer } from "./StyledComponents";
import { useLocalStorage, DefaultBusqueda } from "Hooks/LocalStoreHook";
import { useGlobalState } from "Hooks/GlobalHook";
import { useLocation, useNavigate } from "react-router-dom";

export default function GoogleMap() {
  /*
  const [busqueda, , setBusqueda] = useLocalStorage(
    "busqueda",
    DefaultBusqueda
  );
  let mapVal = busqueda.place;*/
  const navegar = useNavigate();

  const [state, dispatch] = useGlobalState();
  const location = useLocation();

  const valor = state.busqueda;
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
          valor,
          onChange: (e) => {
            dispatch({ busqueda: e });
            if (location.pathname != "/busqueda") {
              navegar("/busqueda");
            }
            //setBusqueda("place", e);
          },
        }}
      />
    </BusquedaContainer>
  );
}
