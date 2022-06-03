import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

//React components
import Header from "components/organism/Header";
import Footer from "components/organism/Footer";
import SideBarMenu from "components/organism/SideBarMenu";
//HOOK
import { useLocalStorage } from "Hooks/LocalStoreHook";
//PAGES
import ChangeUserData from "pages/ChangeUserData";
import Busqueda from "pages/Busqueda";
import AdminRegister from "pages/AdminRegister";
import CreateHousing from "pages/CreateHousing";
import HostHousing from "pages/HostRegister";
import Profile from "pages/Profile";
import HomePage from "pages/Home";
import ChangePassword from "pages/ChangePassword";

function HeaderView() {
  const location = useLocation();
  console.log(location.pathname);
}

const RouterContainer = styled("div")`
  /* Registro Huésped */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 10px;
  /* Background */
  height: auto;

  position: relative;
  min-height: 100vh;

  background: #dee7fa;
`;
const Container = styled("div")`
  width: 100%;
  display: block;
  min-height: 100%;
  height: 100%;
  top: 0;
  margin: auto;
`;
export const AppRouter = ({ children }) => {
  const location = useLocation();
  const navegar = useNavigate();

  const [usuario] = useLocalStorage("usuario", "");
  const [busqueda, setBusqueda] = React.useState({ label: "" });
  const [activarFiltro, setActivarFiltro] = React.useState("");

  console.log(busqueda);
  HeaderView();

  React.useEffect(() => {
    if (busqueda.label != "") {
      navegar("/busqueda");
      console.log("entra en busqueadd");

      setActivarFiltro(true);
    }
  }, [busqueda.label]);
  React.useEffect(() => {
    if (
      activarFiltro &&
      location.pathname != "/busqueda" &&
      busqueda.label != ""
    ) {
      console.log("entra en activarfiltro");
      setBusqueda({ label: "" });
    }
  }, [activarFiltro]);
  return (
    <RouterContainer>
      {usuario.rol === "ROLE_ADMIN" && <SideBarMenu></SideBarMenu>}
      {usuario.rol !== "ROLE_ADMIN" && (
        <Header busqueda={busqueda} setBusqueda={setBusqueda} />
      )}

      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/registrar-anfitrion" element={<HostHousing />} />

          <Route path="/perfil" element={<Profile />}></Route>

          <Route
            path="/perfil/cambiar-contrasena"
            element={<ChangePassword />}
          />
          <Route path="/perfil/editar" element={<ChangeUserData />} />

          <Route path="/profile" element={<Profile />}></Route>
          <Route path="edit" element={<ChangeUserData />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="/anfitrion">
            <Route path="new-housing" element={<CreateHousing />} />
            <Route path="nuevo-alojamiento" element={<CreateHousing />} />
          </Route>
          <Route path="/busqueda" element={<Busqueda />}></Route>

          <Route path="/admin">
            <Route path="new-admin" element={<AdminRegister />} />
            <Route path="nuevo-admin" element={<AdminRegister />} />
          </Route>

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
        {children}
      </Container>
      {usuario.rol !== "ROLE_ADMIN" && <Footer />}
    </RouterContainer>
  );
};
