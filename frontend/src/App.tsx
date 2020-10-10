import React, { Fragment } from "react";
import { Container } from "react-bootstrap";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const App: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Container>
          <h1 data-testid="welcome-header">Welcome</h1>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
