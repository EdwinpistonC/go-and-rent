import React from "react";
import Autocomplete from "react-google-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { BusquedaContainer } from "./StyledComponents";

export default function GoogleMap({ setInput, input }) {
  return (
    <BusquedaContainer>
      <GooglePlacesAutocomplete
        style={{
          innerHeight: "100%",
        }}
        getOptionValue={({ value }) => console.log(value)}
        apiKey={process.env.REACT_APP_API_GOOGLEMAP}
        apiOptions={{ language: "es", region: "es" }}
        autocompletionRequest={{
          bounds: [
            { lat: 50, lng: 50 },
            { lat: 100, lng: 100 },
          ],
        }}
        selectProps={{
          input,
          onChange: setInput,
        }}
      />
    </BusquedaContainer>
  );
}
