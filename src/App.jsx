import styled from "styled-components";

//react component
import { AppRouter } from "./routers/AppRouter";
import { BrowserRouter } from "react-router-dom";

const AppLayout = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
`;

function App() {
  return (
    <AppLayout>
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </AppLayout>
  );
}

export default App;
