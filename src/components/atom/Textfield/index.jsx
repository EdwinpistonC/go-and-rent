import * as React from "react";
import ModalBasico from "components/atom/Modal";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { TextfieldBase, CustomOutilinedInput } from "./style";
const TextField = ({
  theme,
  label = "Outlined",
  children = "Default",
  onClick,
  ...props
}) => {
  return (
    <TextfieldBase
      {...props}
      onClick={onClick}
      theme={theme}
      label={label}
      variant="outlined"
    >
      {children}
    </TextfieldBase>
  );
};

const FormTextfield = ({
  error = "",
  onChange = () => {},
  onBlur = () => {},
  nombre = "por defecto",
  id = "",
}) => {
  return (
    <TextField
      id={id}
      name={id}
      label={nombre}
      fullWidth
      required
      error={error !== ""}
      helperText={error === "" ? "" : error}
      onBlur={onBlur}
      onChange={onChange}
    ></TextField>
  );
};
const PasswordTextfield = ({
  id = "",
  nombre = "defecto",
  error = "",
  onChange = () => {},
  onBlur = () => {},
}) => {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{nombre}</InputLabel>
      <CustomOutilinedInput
        id={id}
        name={id}
        label={nombre}
        type={values.showPassword ? "text" : "password"}
        error={error !== ""}
        helperText={error === "" ? "" : error}
        onBlur={onBlur}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
export default TextField;

const IconTextField = ({
  iconStart = <Visibility />,
  iconEnd,
  InputProps,
  ...props
}) => {
  return (
    <TextfieldBase
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null,
      }}
    />
  );
};

export { IconTextField, FormTextfield, PasswordTextfield };
