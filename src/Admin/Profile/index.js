import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Form, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../Context'

const AdminProfile = (props) => {

  const [userClient, setUserClient] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const { userID } = useContext(UserContext)
  const [updateNama, setUpdateNama] = useState(props.adminName)
  const [updateEmail, setUpdateEmail] = useState(props.email)
  const [updatePassword, setUpdatePassword] = useState(props.password)
  const [updateNohp, setUpdateNoHp] = useState(props.nohp)
  const [adminName, setAdminName] = useState("")
  const [nohp, setNoHp] = useState("")
  const [email, setEmail] = useState("")
  const navigateTo = useNavigate()


  const editProfile = () => {
    if (updateNama === "" || updateEmail === "" || updatePassword === "" || updateNohp === "") {
      setShowAlert(true)
    } else {
      const data = {
        "nama": updateNama,
        "email": updateEmail,
        "password": updatePassword,
        "nohp": updateNohp
      }
      axios.put(`http://127.0.0.1:8000/update/${userID}`, data).then((response) => {
        setAdminName(response.data.nama)
        setEmail(response.data.email)
        setNoHp(response.data.nohp)
      })
    }
  }

  const clientList = () => {
    axios.get('http://127.0.0.1:8000/client-list').then((response) => {
      setUserClient(response.data)
    })
  }

  const makeOtherUserAsAdmin = (idOfCandidatAdmin) => {
      axios.put(`http://127.0.0.1:8000/update/add-admin/${idOfCandidatAdmin}/admin`).then((response) => {
        clientList()
      })
  }

  const logOut = () => {
    axios.put(`http://127.0.0.1:8000/logout/${userID}`).then((response) => {
      console.log(response.data)
      if (response.data === "offline") {
        localStorage.removeItem("userID")
        navigateTo("/")
      }
    })
  }

  const kickAdmin = () => {
      axios.put(`http://127.0.0.1:8000/update/add-admin/${userID}/client`).then((response) => {
        logOut()
      })
  }

  useEffect(() => {
    clientList()
  }, [])

  return (
    <>
      <div className=' mt-3 dashboard-content-container'>
        <div className='edit-profile-container'>
          <div className='w-100'>
            <Card className='p-2 box-shadow w-100 scale-up-center' style={{ border: "1px solid grey" }}>
              <h1>Edit Profile</h1>
              <hr className='my-4' />

              {
                (showAlert === true)
                  ?
                  <Alert variant='danger' className="scale-up-center" style={{ height: "366px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}> <h1><b>JANGAN MENGOSONGKAN FORM.</b> </h1> <br /> <h5>anda harus melengkapi seluruh form update</h5> <Button variant="outline-danger" className="w-50" onClick={() => { setShowAlert(false) }}>Ok</Button> </Alert>
                  :
                  <Form>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Nama</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Edit nama"
                        value={updateNama}
                        onChange={(e) => { setUpdateNama(e.target.value) }}

                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Edit email"
                        value={updateEmail}
                        onChange={(e) => { setUpdateEmail(e.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={updatePassword}
                        onChange={(e) => { setUpdatePassword(e.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>No HP</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Edit No HP"
                        value={updateNohp}
                        onChange={(e) => { setUpdateNoHp(e.target.value) }} />
                    </Form.Group>

                    <Button variant="primary" onClick={() => { editProfile() }}>
                      Simpan
                    </Button>

                  </Form>
              }

            </Card>
          </div>

          <div>
            <Card className='p-2 box-shadow w-100 scale-up-center' style={{ border: "1px solid grey" }}>
              <div className='background-profile p-2 text-warning'>
                <img src='https://asset.kompas.com/crops/JZ0b7mJJ_tZvjF2WVxOM2Gwhdy8=/0x0:1920x1280/750x500/data/photo/2021/09/16/6142b0561f558.jpg' className='img-profile-on-card-info' alt='no preview' />
                <h2 style={{ textTransform: "uppercase" }}>
                  {
                    (adminName === "")
                      ?
                      props.adminName
                      :
                      adminName
                  }
                </h2>
                <div className='d-flex gap-2'>
                  <div>
                    <h6 className="bi bi-envelope-at-fill" style={{ textTransform: "lowercase" }}>
                      {
                        (email === "")
                          ?
                          <span> {props.email}</span>
                          :
                          <span> {email}</span>
                      }
                    </h6>
                    <h6 className='bi bi-telephone-fill'>
                      {
                        (nohp === "")
                          ?
                          <span> {props.nohp}</span>
                          :
                          <span> {nohp}</span>

                      }
                    </h6>
                    <h6 className='bi bi-credit-card-fill'> {props.nik}</h6>
                    <h6 className='bbi bi-award-fill'> {props.role}</h6>
                  </div>
                  <Button style={{width: "100px"}} variant='warning' onClick={() => {kickAdmin()}}>Keluar dari admin</Button>
                </div>
              </div>
            </Card>

            <Alert variant='info' className=' border-info mt-2 mb-0 scale-up-center box-shadow'>
              <span className='bi bi-journals fw-bold'> Note....</span> <br />
              <span>
                Untuk menjadikan sesorang sebagai admin silahkan lihat pada tabel daftar user
              </span>
            </Alert>
          </div>

        </div>
        <div className='d-flex gap-2'>

          <Card className='p-2 box-shadow w-100  scale-up-center mt-2 mb-2' style={{ border: "1px solid grey" }}>
            <div className='make-admin'>
              <h2>Daftar client</h2>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userClient.map((result, i) => {
                      return (
                        <tr key={i + 1}>
                          <td>{i + 1}</td>
                          <td>{result.nama}</td>
                          <td>{result.email}</td>
                          <td><Button variant='info' onClick={() => { makeOtherUserAsAdmin(result.id) }}>Pilih sebagai admin</Button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default AdminProfile