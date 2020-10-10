import React, { Fragment } from "react";
import { Container } from "react-bootstrap";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

const App: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <main className="py-3">
        <Container>
          <h1 data-testid="welcome-header">Welcome</h1>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
