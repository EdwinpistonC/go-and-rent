//native react component
import { Link } from "react-router-dom";

//Style
import { LoginBase, LayoutTextField, LayoutOptions } from "./style";

//material component
import SvgIcon from "@mui/material/SvgIcon";

//react component
import { Button, TextButton } from "components/atom/Button";
import Textfield from "components/atom/Textfield";
import Typography from "@mui/material/Typography";
import Logue from "components/atom/Logue";

const Login = ({ children, ...props }) => {
  return (
    <LoginBase {...props} elevation={1}>
      <LayoutTextField>
        <Logue />
        <Typography variant="h5" align="center" component="div" gutterBottom>
          Iniciar sesion
        </Typography>
        <Textfield label="Email"></Textfield>
        <Textfield label="Contraseña"></Textfield>
        {children}
        <Button>Sign In</Button>
        <TextButton path="/about" size="small" color="pimary" align="left">
          ¿Olvidaste La contraseña?
        </TextButton>
        <Typography
          variant="caption"
          align="center"
          component="div"
          gutterBottom
        >
          O
        </Typography>
        <LayoutOptions>
          <Button size="ultrasmall">Registrarse</Button>
          <Button size="ultrasmall">Anfitrión</Button>
        </LayoutOptions>
      </LayoutTextField>
    </LoginBase>
  );
};

export default Login;
