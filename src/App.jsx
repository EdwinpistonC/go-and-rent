import styled from "styled-components";

//react component
import { AppRouter } from "./routers/AppRouter";

const AppLayout = styled.div`
  margin: 0;
  padding: 0;
`;

function App() {
  return (
    <AppLayout>
      <AppRouter></AppRouter>
    </AppLayout>
  );
}

export default App;
