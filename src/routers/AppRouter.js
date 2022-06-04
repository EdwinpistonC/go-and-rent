import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";

//React components
import Header from "components/organism/Header";
import Footer from "components/organism/Footer";
import SideBarMenu from "components/organism/SideBarMenu";
//HOOK
import { useLocalStorage, DefaultBusqueda } from "Hooks/LocalStoreHook";
//PAGES
import ChangeUserData from "pages/ChangeUserData";
import Busqueda from "pages/Busqueda";
import AdminRegister from "pages/AdminRegister";
import CreateHousing from "pages/CreateHousing";
import HostHousing from "pages/HostRegister";
import Profile from "pages/Profile";
import HomePage from "pages/Home";
import ChangePassword from "pages/ChangePassword";
import { RouterContainer, Container } from "./StyledComponents";
import DetalleAlojamiento from "pages/DetalleAlojamiento";

function HeaderView() {
  const location = useLocation();
  console.log(location.pathname);
}

export const AppRouter = ({ children }) => {
  const [usuario] = useLocalStorage("usuario", "");

  return (
    <RouterContainer>
      {usuario.rol === "ROLE_ADMIN" && <SideBarMenu></SideBarMenu>}
      {usuario.rol !== "ROLE_ADMIN" && <Header />}

      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/registrar-anfitrion" element={<HostHousing />} />

          <Route path="/perfil" element={<Profile />}></Route>
          <Route path="/detalles/:id" element={<DetalleAlojamiento />} />

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
