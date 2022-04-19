import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import { TextfieldBase } from "./style";

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

export { IconTextField };
