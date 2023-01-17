import React, { useState, useContext } from 'react'
import { Card, Button, Form, Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../Context/index'


const Login = () => {

  const navigateTo = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setRole, setUserID, setUserName } = useContext(UserContext)
  const [showAlert, setShowAlert] = useState(false)

  const login = () => {
    const apiURL = 'http://127.0.0.1:8000/login/'
    const dataUser = {
      "email": email,
      "password": password,
      "userDo": "login"
    }
    axios.post(apiURL, dataUser).then((response) => {
      if (response.data.id > 0) {
        setRole(response.data.role)
        setUserID(response.data.id)
        setUserName(response.data.nama)
        window.localStorage.setItem("userID", response.data.id)
        if (response.data.role === "admin") {
          navigateTo('/admin')
        } else {
          navigateTo("/home")
        }
      } else {
        setShowAlert(true)
      }
    }).catch(() => {
      setShowAlert(true)
    })
  }


  return (
    <>
      <section className='login-wrapper'>
        <div className='blur-bg-login-container'>
          <Card className='box-shadow scale-up-center' style={{ width: "350px" }}>
            <Card.Body>
              <h3>LOGIN</h3>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" />
                </Form.Group>
                <Container className='d-flex justify-content-center'>
                  <Col>
                    <Row>
                      {
                        (showAlert === true)
                        &&
                        <i className='text-danger mb-2 scale-up-center' >Login gagal...! Silahkan periksa kembali email dan password anda...!</i>
                      }
                      <Button className='m-1' variant="primary" onClick={() => { login() }}>
                        Login
                      </Button>
                      <Button className='m-1' variant="success" onClick={() => { navigateTo('/register/') }}>
                        Register
                      </Button>
                    </Row>
                  </Col>
                </Container>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  )
}

export default Login