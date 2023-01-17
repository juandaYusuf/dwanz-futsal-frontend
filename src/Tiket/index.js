import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Form, Button, Container, Row, Col, Alert, Card, } from 'react-bootstrap'
import NavigationBar from '../NavigationBar/NavigationBar'
import UserContext from '../Context'


const Tiket = () => {


  const [namaTim, setNamaTim] = useState("")
  const [tglMain, setTglMain] = useState("")
  const [jamMulai, setJamMulai] = useState("")
  const [jamSelesai, setJamSelesai] = useState("")
  const [nohp, setNohp] = useState("")
  const { userID } = useContext(UserContext)
  const [showAlert, setShowAlert] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  // const [tanngal, setTanngal] = useState("")


  // let d = new Date()
  // let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  // let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d)
  // let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)


  const booking = () => {
    // setTanngal(`${ye}-${mo}-${da} `) 

    if (namaTim === "" || tglMain === "" || jamMulai === "" || jamSelesai === "" || nohp === "") {
      setShowAlert("failed")
    } else {

      let start_playing = jamMulai.split(":")[0]
      let end_playing = jamSelesai.split(":")[0]
      let duration = 0
      for (start_playing; start_playing < end_playing; start_playing++) {
        duration += 1
      }
      const apiURL = 'http://127.0.0.1:8000/booking/'
      const data = {
        userID: userID,
        club: namaTim,
        jam_mulai: `${jamMulai}`,
        jam_selesai: `${jamSelesai}`,
        durasi: duration,
        tgl_main: `${tglMain}`,
        nohp: nohp,
        status: "pending",
      }
      axios.post(apiURL, data).then((response) => {
        console.log(response.data)
        if (response.data) {
          setShowAlert("success")
        }
      }).catch((err) => {
        console.log("error => ", err.response.status)
        if (err.response.status === 404) {
          setShowAlert("failed")
          setAlertMessage("Jadwal pada jam tersebut telah dibooking")
        }
      })
    }
  }

  return (
    <>
      <NavigationBar />
      <section className='content-container'>
        <div className='d-flex justify-content-center p-5' style={{ width: "100%", height: "auto" }}>
          <Card className='p-3 box-shadow scale-up-center'>
            <h1>Form booking</h1>
            <Container>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nama Tim</Form.Label>
                  <Form.Control type="text" placeholder="Masukan nama tim" onChange={(e) => { setNamaTim(e.target.value) }} />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>jam mulai</Form.Label>
                      <Form.Control type="time" placeholder="Masukan jam main" onChange={(e) => { setJamMulai(e.target.value) }} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>jam selesai</Form.Label>
                      <Form.Control type="time" placeholder="Masukan jam main" onChange={(e) => { setJamSelesai(e.target.value) }} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>tgl main</Form.Label>
                      <Form.Control type="date" placeholder="Masukan jam main" onChange={(e) => { setTglMain(e.target.value) }} />
                    </Form.Group>
                  </Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>No HP</Form.Label>
                    <Form.Control type="number" placeholder="Masukan nomor hp" onChange={(e) => { setNohp(e.target.value) }} />
                  </Form.Group>
                </Row>
                {
                  (showAlert === "success")
                    ?
                    <Alert variant='success'><b>Alert</b> <br /> Booking berhasil, Silahkan cek pada booklist dan tunggu comfirmasi dari admin</Alert>
                    : (showAlert === "failed")
                    &&
                    <Alert variant='danger'><b>Alert</b> <br /> {(alertMessage === "") ? "Booking gagal, Silahkan cek kembali kelengkapan form" : alertMessage}  </Alert>
                }
                <Button variant="primary" onClick={() => { booking() }}>Booking</Button>
              </Form>
            </Container>
          </Card>
        </div>
      </section>
    </>
  )
}
export default Tiket