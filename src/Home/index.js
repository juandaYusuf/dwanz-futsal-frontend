import React, { useContext, useEffect, useState } from 'react'
import NavigationBar from '../NavigationBar/NavigationBar'
import {  Container, Button, Card, Alert, Row  } from 'react-bootstrap'
import axios from 'axios'
import UserContext from '../Context'


const Home = () => {

  const [booklist, setBooklist] = useState([])
  const [bookListID, setBookListID] = useState(0)
  const { userID, userName } = useContext(UserContext)

  const showBooklist = () => {
    axios.get(`http://127.0.0.1:8000/booklist/${userID}`).then((response) => {
      setBooklist(response.data)
    })
  }

  useEffect(() => {
    if (bookListID > 0) {
      const cancleBook = () => {
        axios.delete(`http://127.0.0.1:8000/delete-user-booklist/${bookListID}`).then(() => {
          showBooklist()
        })
      }
      cancleBook()
    }
    // eslint-disable-next-line
  }, [bookListID])

  useEffect(() => {
    showBooklist()
    // eslint-disable-next-line
  }, [bookListID])


  return (
    <>
      <NavigationBar />
      <section className='content-container'>
        <Container className='d-flex justify-content-center p-5' style={{ width: "100%", height: "auto" }}>
          <Card className='p-3 box-shadow scale-up-center'>
            <Container>
              <h1>Daftar booking</h1>
              <div className='d-flex gap-2'>
                {
                  booklist.map((result) => {
                    return (
                      <Alert variant="info border-info" style={{ width: "300px" }}>
                        <h3 className='text-center'>Tiket booking</h3>
                        <hr />
                        <div className='d-flex justify-content-center gap-3'>
                          <div>
                            <p className='bi bi-diagram-3-fill fw-bold'> Club</p>
                            <p className='bi bi-clock fw-bold'> Jam mulai</p>
                            <p className='bi bi-clock-history fw-bold'> Jam selesai</p>
                            <p className='bi bi-hourglass-split fw-bold'> Durasi</p>
                            <p className='bi bi-calendar-date fw-bold'> Tgl main</p>
                            <p className='bi bi-telephone fw-bold'> Nomor HP</p>
                            <p className='bi bi-cursor fw-bold'> Status</p>
                          </div>
                          <div>

                            <span key={result.id}>
                              <p className='bi bi-arrow-right'> {result.club}</p>
                              <p className='bi bi-arrow-right'> {result.jam_mulai}</p>
                              <p className='bi bi-arrow-right'> {result.jam_selesai}</p>
                              <p className='bi bi-arrow-right'> {result.durasi} Jam</p>
                              <p className='bi bi-arrow-right'> {result.tgl_main}</p>
                              <p className='bi bi-arrow-right'> {result.nohp}</p>
                              <p className='bi bi-arrow-right'> {result.status}</p>
                            </span>

                          </div>
                        </div>
                        <Container>
                          <Row>
                            <Button className=' p-1 bi bi-x-square-fill' variant='danger' onClick={() => { setBookListID(result.id) }}> Batal</Button>
                          </Row>
                        </Container>
                        <hr />
                        <i style={{ fontSize: "0.8rem", opacity: "0.5" }}>{userName}</i>

                      </Alert>
                    )
                  })}
              </div>
            </Container>
          </Card>
        </Container>
      </section>
    </>
  )
}

export default Home