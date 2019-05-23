import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import './Navigation.css';

class NavigationInside extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" className="navbar-header mb-3">
                <Container>
                    <LinkContainer to="/blockchain-project/add">
                        <Navbar.Brand className="navbar-logo p-0 m-0"><img src="http://www.tu.ac.th/uploads/main-logo.svg" width="75%" alt="" /></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle-button p-0"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto text-center link">
                            <LinkContainer to="/blockchain-project/add"><Nav.Link>ADD ISSUER</Nav.Link></LinkContainer>
                            <LinkContainer to="/blockchain-project/request"><Nav.Link>REQUEST</Nav.Link></LinkContainer>
                            <NavDropdown title="PROFILE" id="collasible-nav-dropdown">
                                <LinkContainer to="/blockchain-project/profile"><NavDropdown.Item href="#action/3.3">Your Profile</NavDropdown.Item></LinkContainer>
                                <NavDropdown.Divider />
                                <LinkContainer to="/blockchain-project/logout"><NavDropdown.Item>Log out</NavDropdown.Item></LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavigationInside;