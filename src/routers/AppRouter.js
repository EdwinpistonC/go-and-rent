import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//React components
import LoginPage from "pages/guest/LoginPage";

export const AppRouter = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
    </BrowserRouter>
  );
};
