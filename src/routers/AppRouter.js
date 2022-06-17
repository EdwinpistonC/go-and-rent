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
import TestPage from "pages/Test";
import { ListaReservas } from "pages/Reservas";
import AdministrarReservas from "pages/AdministrarReservas";
import EditarReserva from "pages/EditarReserva";
import Mensajeria from "pages/Mensajeria";

function HeaderView() {
  const location = useLocation();
  console.log(location.pathname);
}

export const AppRouter = ({ children }) => {
  const [usuario] = useLocalStorage("usuario", "");

  return (
    <RouterContainer>
      {usuario.rol !== "ROLE_ADMIN" && <Header />}

      <Container>
        <Routes>
          <Route path="/reservas" element={<ListaReservas />} />
          <Route path="/reservas/:id" element={<AdministrarReservas />} />
          <Route path="/reservas/editar/:id" element={<EditarReserva />} />

          <Route path="/" element={<HomePage key={Date.now()} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/registrar-anfitrion" element={<HostHousing />} />
          <Route path="/test" element={<TestPage />} />

          <Route path="/mensajeria" element={<Mensajeria />} />

          <Route path="/perfil" element={<Profile />}></Route>
          <Route
            path="/detalles/:id/:startDate/:endDate"
            element={<DetalleAlojamiento />}
          />
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
