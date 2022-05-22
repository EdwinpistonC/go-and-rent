import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

//React components
import HomePage from "pages/Home";
import Header from "components/organism/Header";
import Footer from "components/organism/Footer";
import RegisterAdmin from "components/organism/RegisterAdmin";
import AdminRegister from "../pages/AdminRegister";

const RouterContainer = styled("div")`
  /* Registro Huésped */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 58px;
  /* Background */
  height: auto;

  position: relative;
  min-height: 100vh;

  background: #dee7fa;
`;
const Container = styled("div")`
  width: 100%;
  height: 100%;
  display: block;
  min-height: 100%;
  height: auto !important;
  height: 100%;
  /* margin: 0 auto -100px; */
  margin: auto;
`;
export const AppRouter = ({ children }) => {
  return (
    <RouterContainer>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/admin">
              <Route path="new-admin" element={<AdminRegister />} />
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
        <Footer />
      </BrowserRouter>
    </RouterContainer>
  );
};
