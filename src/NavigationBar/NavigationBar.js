import React, {useContext } from 'react'
import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import UserContext from '../Context/index'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NavigationBar = () => {

  const { userID } = useContext(UserContext)
  const navigateTo = useNavigate()

  const logOut = () => {
    axios.put(`http://127.0.0.1:8000/logout/${userID}`).then((response) => {
      console.log(response.data)
      if(response.data === "offline"){
        localStorage.removeItem("userID")
          navigateTo("/")
      }
    })
  }


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">DWANZ FUTSAL</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/home" className="nav-link"> Home</Link>
            <Link  to="/tiket" className="nav-link"> Tiket</Link>
            <Link  to="/profile-client" className="nav-link"> profile</Link>
          </Nav>
          <Button variant='danger' onClick={() => { logOut() }}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar