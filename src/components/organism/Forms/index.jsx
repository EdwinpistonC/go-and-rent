import React from "react";
import { useForm } from "react-hook-form";
import { TextField } from "components/atom/Textfield";
import { Grid } from "@mui/material";
import { Button } from "components/atom/Button";
import { ErrorLabel, EmptyLabel } from "./StyledComponents";
import Api from "server/Api";
import { useNavigate } from "react-router-dom";
import IconSelector from "components/molecule/IconSelector";
import { DatePicker } from "components/atom/Textfield";
export function FormRequestCode({ onBack, children, setFields }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const [backendError, setBackendError] = React.useState("");

  const onSubmit = async (data) => {
    const api = new Api();
    api
      .recoverPassword(data.email)
      .then((response, status) => {
        setBackendError("");
        setFields("email", data.email);
        setFields("step", 1);
      })
      .catch((err) => {
        if (typeof err.response !== "undefined") {
          setBackendError("Correo no registrado");
        }
      });
    return false;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", height: "100%" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        sx={{ px: 2 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Grid item>
          <Grid item sm sx={{ mt: 2 }}>
            <TextField
              type="text"
              placeholder="email"
              label="Email"
              {...register("email", {
                validate: {
                  requerido: (v) => v !== "" || "Email es requerido",
                  email: (v) =>
                    String(v)
                      .toLowerCase()
                      .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      ) || "Formato de Email incorrecto",
                },
              })}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
            />
          </Grid>
          <Grid item sx={{ mt: 2, my: 2 }}>
            {backendError !== "" ? (
              <ErrorLabel>{backendError}</ErrorLabel>
            ) : (
              <EmptyLabel />
            )}
          </Grid>
        </Grid>
        {children}

        <Grid
          item
          container
          direction="row"
          justifyContent="space-around"
          sx={{ mb: 2 }}
          alignItems="stretch"
        >
          <Grid item>
            <Button onClick={onBack}>Volver</Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit">Solicitar Codigo</Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export function FormSendCode({ onBack, children, email, setFields }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      codigo: "",
    },
  });
  const [backendError, setBackendError] = React.useState("");

  const onSubmit = async (data) => {
    const api = new Api();
    api
      .validateCode(email, data.codigo)
      .then((response, status) => {
        console.log(response);
        setBackendError("");
        setFields("codigo", data.codigo);
        setFields("step", 2);
      })
      .catch((err) => {
        if (typeof err.response !== "undefined") {
          setBackendError("Codigo incorrecto");
        }
      });
    return false;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", height: "100%" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        sx={{ px: 2 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Grid item>
          <Grid item sm sx={{ mt: 2 }}>
            <TextField
              type="text"
              placeholder="codigo"
              label="Codigo"
              {...register("codigo", {
                validate: {
                  requerido: (v) => v !== "" || "Se requiere el codigo",
                },
              })}
              error={errors.codigo ? true : false}
              helperText={errors.codigo && errors.codigo.message}
            />
          </Grid>
          <Grid item sx={{ mt: 2, my: 2 }}>
            {children}
            {backendError !== "" ? (
              <ErrorLabel>{backendError}</ErrorLabel>
            ) : (
              <EmptyLabel />
            )}
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-around"
          sx={{ mb: 2 }}
          alignItems="stretch"
        >
          <Grid item>
            <Button onClick={onBack}>Cancelar</Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit">Verificar codigo</Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
export function FormChangePassword({
  onBack,
  children,
  email,
  codigo,
  setFields,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm({
    defaultValues: {
      password: "",
    },
  });
  const [backendError, setBackendError] = React.useState("");

  const onSubmit = async (data) => {
    const api = new Api();
    api
      .changePassword(email, {
        codigo: codigo,
        password: data.password,
      })
      .then((response, status) => {
        console.log(response);
        setBackendError("");
        setFields("step", 3);
      })
      .catch((err) => {
        if (typeof err.response !== "undefined") {
          setBackendError("Codigo incorrecto");
        }
      });
    return false;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", height: "100%" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        sx={{ px: 2 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Grid item>
          <Grid item sm sx={{ mt: 2 }}>
            <TextField
              type="password"
              placeholder="contraseña"
              label="Contraseña"
              {...register("contrasena1", {
                validate: {
                  requerido: (v) => v !== "" || "Ingrese la contraseña",
                },
              })}
              error={errors.contrasena1 ? true : false}
              helperText={errors.contrasena1 && errors.contrasena1.message}
            />
          </Grid>

          <Grid item sm sx={{ mt: 2 }}>
            <TextField
              type="password"
              placeholder="Contraseña"
              label="Repita Contraseña"
              {...register("contrasena2", {
                validate: {
                  requerido: (v) => v !== "" || "Repita la contraseña",
                  iguales: (v) =>
                    v === watch("contrasena1") ||
                    "Las contraseñas no coinciden",
                },
              })}
              error={errors.contrasena2 ? true : false}
              helperText={errors.contrasena2 && errors.contrasena2.message}
            />
          </Grid>
          <Grid item sx={{ mt: 2, my: 2 }}>
            {children}
            {backendError !== "" ? (
              <ErrorLabel>{backendError}</ErrorLabel>
            ) : (
              <EmptyLabel />
            )}
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-around"
          sx={{ mb: 2 }}
          alignItems="stretch"
        >
          <Grid item>
            <Button onClick={onBack}>Cancelar</Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit">Verificar codigo</Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
export function FormChangePasswordProfile({ onBack, children, setFields }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      contrasena1: "",
      contrasena2: "",
      contrasenavieja: "",
    },
  });
  const [backendError, setBackendError] = React.useState("");
  const navegar = useNavigate();

  const onSubmit = async (data) => {
    const api = new Api();
    api
      .changePassword({
        password: data.password,
        oldpassword: data.contrasenavieja,
      })
      .then((response, status) => {
        console.log(response);
        setBackendError("");
        navegar("/perfil");
      })
      .catch((err) => {
        if (typeof err.response !== "undefined") {
          setBackendError("Codigo incorrecto");
        }
      });
    return false;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", height: "fit-content" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        sx={{ px: 2 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Grid item>
          <Grid item sm sx={{ mt: 2 }}>
            <TextField
              type="password"
              placeholder="contraseña"
              label="Contraseña Anterior"
              {...register("contrasenavieja", {
                validate: {
                  requerido: (v) => v !== "" || "Ingrese su contraseña actual",
                },
              })}
              error={errors.contrasenavieja ? true : false}
              helperText={
                errors.contrasenavieja && errors.contrasenavieja.message
              }
            />
          </Grid>
          <Grid item sm sx={{ mt: 2 }}>
            <TextField
              type="password"
              placeholder="contraseña"
              label="Contraseña"
              {...register("contrasena1", {
                validate: {
                  requerido: (v) => v !== "" || "Ingrese la contraseña nueva ",
                },
              })}
              error={errors.contrasena1 ? true : false}
              helperText={errors.contrasena1 && errors.contrasena1.message}
            />
          </Grid>

          <Grid item sm sx={{ mt: 2 }}>
            <TextField
              type="password"
              placeholder="Contraseña"
              label="Repita Contraseña"
              {...register("contrasena2", {
                validate: {
                  requerido: (v) => v !== "" || "Repita la contraseña",
                  iguales: (v) =>
                    v === watch("contrasena1") ||
                    "Las contraseñas no coinciden",
                },
              })}
              error={errors.contrasena2 ? true : false}
              helperText={errors.contrasena2 && errors.contrasena2.message}
            />
          </Grid>
          <Grid item sx={{ mt: 2, my: 2 }}>
            {children}
            {backendError !== "" ? (
              <ErrorLabel>{backendError}</ErrorLabel>
            ) : (
              <EmptyLabel />
            )}
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-around"
          sx={{ mb: 2 }}
          alignItems="stretch"
        >
          <Grid item>
            <Button onClick={onBack}>Cancelar</Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit">Verificar codigo</Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
export function FormEditUser({ onBack, children, setFields }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      account: null,
      alias: "",
      bank: null,
      birthday: "",
      email: "",
      lastName: "",
      name: "",
      phone: "",
      picture: "",
    },
  });
  const [carga, setCarga] = React.useState(false);
  const [avatar, setAvatar] = React.useState(0);

  if (!carga && false) {
    const api = new Api();
    setCarga(true);

    api.profile().then((response) => {
      const data = response.data;
      console.log(data);
      setValue([
        { account: data.name },
        { bank: data.bank },
        { birthday: data.birthday },
        { name: data.name },
        { lastName: data.lastName },
        { phone: data.phone },
        { picture: data.picture },
        { lastName: data.lastName },
        { alias: data.alias },
      ]);
      setAvatar(data.picture);
    });
  }

  const [backendError, setBackendError] = React.useState("");
  const [fecha, setFecha] = React.useState();
  const navegar = useNavigate();

  const onSubmit = async (data) => {
    const api = new Api();
    api
      .editUserProfile({
        alias: data.alias,
        email: data.email,
        name: data.name,
        lastName: data.lastName,
        phone: data.phone,
        birthday: data.birthday,
        picture: avatar,
        bank: data.bank,
        account: data.account,
      })
      .then((response, status) => {
        console.log(response);
        setBackendError("");
        navegar("/perfil");
      })
      .catch((err) => {
        if (typeof err.response !== "undefined") {
          setBackendError("Codigo incorrecto");
        }
      });
    return false;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", height: "fit-content" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        sx={{ px: 2 }}
        style={{ width: "100%", height: "fit-content" }}
        spacing={2}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="stretch"
          spacing={1}
          item
        >
          <Grid item sm sx={{ mt: 2 }}>
            <TextField
              type="text"
              placeholder="Nombre"
              label="Nombre"
              {...register("name", {
                validate: {
                  requerido: (v) => v !== "" || "Ingrese el nombre",
                },
              })}
              error={errors.name ? true : false}
              helperText={errors.name && errors.name.message}
            />
          </Grid>

          <Grid item sm sx={{ mt: 2 }}>
            <TextField
              type="text"
              placeholder="Apellido"
              label="Apellido"
              {...register("lastName", {
                validate: {
                  requerido: (v) => v !== "" || "Ingrese el apellido",
                },
              })}
              error={errors.lastName ? true : false}
              helperText={errors.lastName && errors.lastName.message}
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="stretch"
          spacing={1}
          item
        >
          <Grid item sm sx={{ mt: 2 }}>
            <TextField
              type="tel"
              placeholder="Telefono"
              label="Telefono"
              {...register("phone", {
                validate: {
                  requerido: (v) => v !== "" || "Ingrese el telefono",
                },
              })}
              error={errors.phone ? true : false}
              helperText={errors.phone && errors.phone.message}
            />
          </Grid>

          <Grid item sm sx={{ mt: 2 }}>
            <TextField
              type="text"
              placeholder="Alias"
              label="Alias"
              {...register("alias", {
                validate: {
                  requerido: (v) => v !== "" || "Ingrese el alias",
                },
              })}
              error={errors.alias ? true : false}
              helperText={errors.alias && errors.alias.message}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="stretch"
          spacing={1}
          item
        >
          <Grid item sm sx={{ mt: 2 }}>
            <DatePicker
              label="Fecha de nacimiento"
              fecha={fecha}
              onChange={(newValue) => {
                setFecha(newValue);
              }}
            ></DatePicker>
          </Grid>
          <Grid item sm sx={{ mt: 2 }}>
            <IconSelector avatar={avatar} setAvatar={setAvatar} />
          </Grid>
        </Grid>
        <Grid item sx={{ mt: 2, my: 2 }}>
          {children}
          {backendError !== "" ? (
            <ErrorLabel>{backendError}</ErrorLabel>
          ) : (
            <EmptyLabel />
          )}
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-around"
          sx={{ mb: 2 }}
          alignItems="stretch"
        >
          <Grid item>
            <Button onClick={() => navegar("/perfil")}>Volver</Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit">Guardar</Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
