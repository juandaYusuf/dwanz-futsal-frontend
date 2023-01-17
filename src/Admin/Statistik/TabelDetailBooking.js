import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import TabelComponent from './TabelComponent'

const TabelDetailBooking = ({time_used}) => {

    const [booklistdata, setBooklistData] = useState([])
    // const [totalDuration, setTotalDuration] = useState([])

    const getBookingList = () => {
        axios.get('http://127.0.0.1:8000/admin-booklist/').then((response) => {
            setBooklistData(response.data)
            const totalScores = response.data.reduce(
                (previousScore, currentScore)=>previousScore+currentScore.durasi, 0);
                time_used(totalScores)
        })
    }

    useEffect(() => {
        getBookingList()
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <Table striped bordered hover className='m-0 p-0' size='sm'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Club</th>
                        <th>Jam mulai</th>
                        <th>Jam selesai</th>
                        <th>Durasi</th>
                        <th>Tgl main</th>
                        <th>Nomor HP</th>
                        <th>Status</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        booklistdata.map((result, i) => {
                            return (
                                <TabelComponent
                                    key={result.id}
                                    no={i + 1}
                                    id={result.id}
                                    user_id={result.user_id}
                                    club={result.club}
                                    jam_mulai={result.jam_mulai}
                                    jam_selesai={result.jam_selesai}
                                    durasi={result.durasi}
                                    tgl={result.tgl_main}
                                    nohp={result.nohp}
                                    status={result.status}
                                    refresh={() => getBookingList()} />)
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default TabelDetailBooking