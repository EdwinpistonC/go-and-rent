import Visibility from "@mui/icons-material/Visibility";
//styles
import { Page } from "pages/style";
import { LoginBase, LoginLayout } from "./style";

//img
import Image1 from "resources/images/login3.jpg";

//react component
import Login from "components/organism/Login";

const LoginPage = ({ ...props }) => {
  return (
    <Page backgroundImg={Image1}>
      <LoginLayout>
        <LoginBase>
          <Login />
        </LoginBase>
      </LoginLayout>
    </Page>
  );
};

export default LoginPage;
