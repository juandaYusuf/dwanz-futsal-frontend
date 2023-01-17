import React, { useState } from 'react'
import { Form, Button, Card, Container, Alert, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const navigateTo = useNavigate()

  const [nik, setNik] = useState("")
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nohp, setNohp] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [showErrAlert, setErrShowAlert] = useState(false)


  const register = () => {
    if (nik === "" || nama === "" || email === "" || password === "" || nohp === "" || showAlert === "" || showErrAlert) {
      setErrShowAlert(true)
    } else {

      const apiURL = 'http://127.0.0.1:8000/register/'
      const data = {
        "nik": nik,
        "nama": nama,
        "email": email,
        "password": password,
        "nohp": nohp
      }
      console.log(data)
      axios.post(apiURL, data).then((response) => {
        if (response.data != null) {
          setShowAlert(true)
          setErrShowAlert(false)
        }
      }).then((err) => {
        if (err.code) {
          setErrShowAlert(true)
          setShowAlert(false)
          console.log(err.code)
        }
      })
    }

  }

  return (
    <>
      <section className='login-wrapper'>
        <div className='blur-bg-login-container'>
          <Card className='scale-up-center box-shadow'>
            <Card.Body>
              <h4>REGISTER</h4>
              <Container>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>NIK</Form.Label>
                    <Form.Control type="number" placeholder="Masukan NIK" onChange={(e) => { setNik(e.target.value) }} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control type="text" placeholder="Masukan Nama" onChange={(e) => { setNama(e.target.value) }} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>No HP</Form.Label>
                    <Form.Control type="number" placeholder="Masukan No HP" onChange={(e) => { setNohp(e.target.value) }} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Masukan Email" onChange={(e) => { setEmail(e.target.value) }} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                  </Form.Group>
                  <Container style={{ width: "350px" }}>
                    {
                      (showAlert === true)
                        ?
                        <Alert variant='success'>
                          <b>Sukses </b>
                          Pendaftar berhasil silahkan klik tombol login untuk melanjutkan...!
                        </Alert>
                        :
                        (showErrAlert === true)
                        &&
                        <Alert variant='danger'>
                          <b>Gagal </b>Registrasi gagal harap periksa form dengan benar...!
                        </Alert>
                    }
                  </Container>
                  <Container className='d-flex justify-content-center gap-2'>
                    <Col>
                      <Row>
                        <Button className="mb-2" onClick={() => { register() }} variant="primary" >Register</Button>
                        <Button variant="success" onClick={() => { navigateTo('/') }}>Login</Button>
                      </Row>
                    </Col>
                  </Container>
                </Form>
              </Container>
            </Card.Body>
          </Card>
        </div>
      </section>

    </>
  )
}

export default Register