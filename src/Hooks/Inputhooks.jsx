import { useState } from "react";

/*

ejemplo del array error

errors =
{
  numero:{
    value:"true",
    msg:"El campo no puede tener numeros"
  },
}


Posibles errores:
numero: Tiene numero
tamMin: Menos cantidad de caracteres== error
tamMax:  Menos cantidad de caracteres == error
email: Formato incorrecto de email 

*/

function useInputFormHook(errors) {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const controlInput = (e = "") => {
    setError("");
    if (e != "" && e.target.value != "") {
      if (errors.hasOwnProperty("numero")) {
        if (/\d/.test(e.target.value)) {
          setError(errors.numero.msg);
        }
      }
      if (errors.hasOwnProperty("tamMax")) {
        if (e.target.value.length > errors.ramMax.value) {
          setError(errors.tamMax.msg);
        }
      }
      if (errors.hasOwnProperty("tamMin")) {
        if (e.target.value.length < errors.ramMax.value) {
          setError(errors.tamMin.msg);
        }
      }
      if (errors.hasOwnProperty("email")) {
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value)) {
          setError(errors.email.msg);
        }
      }
    }
  };

  return [value, setValue, error, controlInput];
}

function useInputPassHook(errors) {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  const setInput = (e) => {
    if (errors.hasOwnProperty("numero")) {
      if (/\d/.test(e.target.value)) {
        setError(errors.numero.msg);
        return;
      }
    }
    if (errors.hasOwnProperty("tamMax")) {
      if (e.target.value.length > errors.ramMax.value) {
        setError(errors.tamMax.msg);
        return;
      }
    }
    if (errors.hasOwnProperty("tamMin")) {
      if (e.target.value.length < errors.ramMax.value) {
        setError(errors.tamMin.msg);
        return;
      }
    }
    if (errors.hasOwnProperty("email")) {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value)) {
        setError(errors.email.msg);
        return;
      }
    }
    setError("");
  };

  return [value, setValue, error, setInput];
}

export { useInputFormHook, useInputPassHook };
