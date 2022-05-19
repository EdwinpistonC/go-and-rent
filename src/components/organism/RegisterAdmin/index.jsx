import React from "react";
import Textfield from "components/atom/Textfield";

export default function RegisterAdmin({
                                          submit
                                      }) {
    console.log("HERE");
    return (
        <>
            <Textfield label="Alias"></Textfield>
            <Textfield label="Email"></Textfield>
            <Textfield label="Contraseña"></Textfield>
            <Textfield label="Nombre"></Textfield>
            <Textfield label="Apellido"></Textfield>
            <Textfield label="Email"></Textfield>
            <Textfield label="Teléfono"></Textfield>
            <Textfield label="Fecha de Nacimiento"></Textfield>
            <Textfield label="Avatar"></Textfield>
        </>
    );
}