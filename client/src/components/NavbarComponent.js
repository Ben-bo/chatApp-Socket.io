import React from "react";

import { Container, Navbar } from 'react-bootstrap'
const NavbarComponent = () => {

    return (

        <Navbar expand="lg" variant="dark" bg="success" className="fixed-top ">
            <Container>
                <Navbar.Brand href="#">My ChatApp</Navbar.Brand>
            </Container>
        </Navbar>


    )
}
export default NavbarComponent