import styled from "styled-components";

//react component
import { AppRouter } from "./routers/AppRouter";

const AppLayout = styled.div`
  width: 100vw;
  height: fit-content;
`;

function App() {
  return (
    <AppLayout>
      <AppRouter></AppRouter>
    </AppLayout>
  );
}

export default App;
