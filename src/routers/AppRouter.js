import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

//React components
import HomePage from "pages/Home";
import Header from "components/organism/Header";
import Footer from "components/organism/Footer";
import RegisterAdmin from "components/organism/RegisterAdmin";

const RouterContainer = styled("div")`
  /* Registro Huésped */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 58px;

  /* Background */

  background: #dee7fa;
`;

export const AppRouter = ({ children }) => {
    return (
        <RouterContainer>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/admin" >
                        <Route path="new-admin" element={<RegisterAdmin submit="" />} />
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
                <Footer />
            </BrowserRouter>
        </RouterContainer>
    );
};
