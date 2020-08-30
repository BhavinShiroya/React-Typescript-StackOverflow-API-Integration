import * as React from 'react';
import NavBar from './navigation/NavBar';
import Home from './pages/Home';
import { Container } from 'reactstrap';

const App: React.FunctionComponent = () => (
  <Container>
    <NavBar />
    <Home />
  </Container>
);

export default App;
