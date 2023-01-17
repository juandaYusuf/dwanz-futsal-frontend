import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import NavigationBar from '../NavigationBar/NavigationBar'
import UserContext from '../Context'

const ProfileClient = () => {

    const { userID } = useContext(UserContext)
    const [clientName, setClientName] = useState("")
    const [nohp, setNoHp] = useState("")
    const [email, setEmail] = useState("")
    const [nik, setNik] = useState("")
    const [password, setPassword] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [updateNama, setUpdateNama] = useState("")
    const [updateEmail, setUpdateEmail] = useState("")
    const [updatePassword, setUpdatePassword] = useState("")
    const [updateNohp, setUpdateNoHp] = useState("")



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
                setEmail(response.data.email)
                setNoHp(response.data.nohp)
                showCurrentAdminData()
            })
        }
    }

    const showCurrentAdminData = () => {
        axios.get(`http://127.0.0.1:8000/admin/${userID}`).then((response) => {
            setNik(response.data.nik)

            setClientName(response.data.nama)
            setUpdateNama(response.data.nama)

            setEmail(response.data.email)
            setUpdateEmail(response.data.email)

            setNoHp(response.data.nohp)
            setUpdateNoHp(response.data.nohp)

            setPassword(response.data.password)
            setUpdatePassword(response.data.password)
        })
    }



    useEffect(() => {
        showCurrentAdminData()

        // eslint-disable-next-line
    }, [])



    return (
        <>
            <NavigationBar />
            <div className=' pt-3 dashboard-content-container'>
                <div className='d-flex align-items-center flex-column gap-2'>
                    <Card className=' p-2 box-shadow scale-up-center border-secondary' style={{ width: "50%" }}>
                        <h1>Identitas</h1>
                        <div className='d-flex'>
                            <div className="mx-4">
                                <p className='bi bi-person-vcard'> NIK</p>
                                <p className='bi bi-person-video'> Nama</p>
                                <p className='bi bi-envelope-at'> Email</p>
                                <p className='bi bi-telephone'> No Telepon</p>
                            </div>
                            <div>
                                <p className='bi bi-heart-arrow'> {nik} </p>
                                <p className='bi bi-heart-arrow'> {clientName} </p>
                                <p className='bi bi-heart-arrow'> {email} </p>
                                <p className='bi bi-heart-arrow'> {nohp} </p>
                            </div>
                        </div>
                    </Card>
                    <Card className='p-2 box-shadow scale-up-center border-secondary' style={{ width: "50%" }}>
                        <h1>Edit Profile</h1>
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
            </div>
        </>
    )
}

export default ProfileClient