import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Módulo de Desencriptación
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default NavBar;
