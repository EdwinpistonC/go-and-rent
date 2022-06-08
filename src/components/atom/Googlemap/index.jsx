import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { BusquedaContainer } from "./StyledComponents";
import { useLocalStorage, DefaultBusqueda } from "Hooks/LocalStoreHook";
import { useGlobalState } from "Hooks/GlobalHook";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";

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
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMapLocation() {
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
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_GOOGLEMAP }}
        defaultCenter={{
          lat: -34.906123565084464,
          lng: -56.18609223221018,
        }}
        defaultZoom={11}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
