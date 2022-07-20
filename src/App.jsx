import React from "react";
import styled from "styled-components";

//react component
import { AppRouter } from "./routers/AppRouter";
import { BrowserRouter, useLocation } from "react-router-dom";
import { GlobalStateProvider } from "Hooks/GlobalHook";

const AppLayout = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
`;

function App() {
  return (
    <GlobalStateProvider>
      <AppLayout>
        <BrowserRouter>
          <ScrollToTop>
            <AppRouter></AppRouter>
          </ScrollToTop>
        </BrowserRouter>
      </AppLayout>
    </GlobalStateProvider>
  );
}

export default App;

function ScrollToTop({ children }) {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const canControlScrollRestoration = "scrollRestoration" in window.history;
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}
