import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import DeleteConfirmDialog from './DeleteConfirmDialog'


const TabelComponent = (props) => {

    const [whoIsBooking, setWhoIsBooking] = useState("")
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);


    const showWhoIsBooking = () => {
        axios.get(`http://127.0.0.1:8000/${props.user_id}`).then((response) => {
            setWhoIsBooking(response.data[0].nama)
        })
    }

    const confirm = () => {
        const apiURL = `http://127.0.0.1:8000/confirm/${props.id}`
        const data = {
            status: "confirmed"
        }
        axios.put(apiURL, data).then(() => {
            props.refresh()
        })
    }

    const tolak = () => {
        const apiURL = `http://127.0.0.1:8000/confirm/${props.id}`
        const data = {
            status: "ditolak"
        }
        axios.put(apiURL, data).then(() => {
            props.refresh()
        })
    }

    useEffect(() => {
        showWhoIsBooking()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!showDeleteConfirmDialog) {
            props.refresh()
        }

        // eslint-disable-next-line
    }, [showDeleteConfirmDialog])


    return (
        <>
            <tr>
                <td>{props.no}</td>
                <td>{whoIsBooking}</td>
                <td>{props.club}</td>
                <td>{props.jam_mulai}</td>
                <td>{props.jam_selesai}</td>
                <td>{props.durasi} jam</td>
                <td>{props.tgl}</td>
                <td>{props.nohp}</td>
                <td>{props.status}</td>
                <td>
                    <div className='d-flex gap-2'>
                        <Button className='bi bi-check-square-fill' variant='success' onClick={() => { confirm() }} > Confirm</Button>
                        <Button variant='warning bi bi-x-square-fill' onClick={() => { tolak() }}> Tolak</Button>
                        <Button variant='danger bi bi-trash-fill' onClick={() => { setShowDeleteConfirmDialog(true) }}>delete</Button>
                    </div>
                </td>
            </tr>

            {/* ================== Modal Dialog ==================== */}
            <DeleteConfirmDialog
                show={showDeleteConfirmDialog}
                club={props.club}
                jam_mulai={props.jam_mulai}
                jam_selesai={props.jam_selesai}
                tgl={props.tgl}
                id={props.id}
                onHide={() => setShowDeleteConfirmDialog(false)} />
        </>
    )
}

export default TabelComponent