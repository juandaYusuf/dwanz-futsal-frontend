import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'

const DeleteConfirmDialog = (props) => {

    const [responseDelete, setResponseDelete] = useState("")

    const deleteBookingList = () => {
        axios.delete(`http://127.0.0.1:8000/delete-booking-list/${props.id}`).then((response) => {
            setResponseDelete(response.data)
            props.refreshbookinglist()
        })
    }



    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            style={{ backdropFilter: "blur(30px)" }}>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Hapus booking list
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                    apakah anda yakin ingin menghapus boking dari club: <b>{props.club}</b> dengan jam main dari {props.jam_mulai} dan selesai jam {props.jam_selesai} pada tanggal {props.tgl}
                </p>
                {
                    (responseDelete === 'Delete success')
                    &&
                    <Alert variant='success'>
                        <b>Hapus booking list berhasil</b><br />
                        <p>anda telah mengahpus bookinglist dari <b>{props.club}</b></p>
                    </Alert>

                }
            </Modal.Body>

            <Modal.Footer>
                {
                    (responseDelete !== 'Delete success')
                    &&
                    <Button variant='danger' onClick={() => { deleteBookingList() }}>Delete</Button>
                }
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmDialog