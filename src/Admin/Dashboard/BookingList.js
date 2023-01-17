import axios from 'axios'
import React, { useState, useEffect } from 'react'


const BookingList = (props) => {
    const [totalBookingList, setTotalBookingList] = useState(" Daftar booking kosong")
    const [confirmCounter, setConfirmCounter] = useState(" 0 Confirmed")
    const [denieCounter, setDenieCounter] = useState(" 0 Ditolak")
    const [pendingCounter, setPendingCounter] = useState(" 0 Pending")


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/admin-booklist/").then((response) => {
            const showDetailBookingList = () => {
                response.data.filter((result) => result.status === "ditolak").map((result, i, row) => {
                    return((i + 1 === row.length) && setDenieCounter(`${i + 1} ${result.status}`))
                })
        
                response.data.filter((result) => result.status === "pending").map((result, i, row) => {
                    return((i + 1 === row.length) && setPendingCounter(`${i + 1} ${result.status}`))
                })
        
                response.data.filter((result) => result.status === "confirmed").map((result, i, row) => {
                    return((i + 1 === row.length) && setConfirmCounter(`${i + 1} ${result.status}`))
                })
        
                response.data.map((result, i, row) => {
                    return((i + 1 === row.length) && setTotalBookingList(`${i + 1} Total Booking List`))
                })
        
            }
            showDetailBookingList()
        })
    }, [])

    return (
        <>
            <div className='box-shadow mt-3 card-booklist scale-up-center'>
                <div className='d-flex flex-column w-100 p-3'>
                    <h1 className='bi bi-card-checklist' style={{ color: "DimGrey" }}> Daftar booking</h1><br />
                    <div className='booklis-contaniner gap-3'>
                        <div className='club-container'>
                            <h4 className='bi bi-person-lines-fill text-warning'> {totalBookingList}</h4>
                        </div>
                        <div className='confirm-container'>
                            <h4 className='bi bi-check-square-fill text-success'> {confirmCounter}</h4>
                        </div>
                        <div className='tolak-container'>
                            <h4 className='bi bi-x-square-fill text-danger'>  {denieCounter} </h4>
                        </div>
                        <div className='pending-container'>
                            <h4 className='bi bi-alarm-fill text-secondary'>{pendingCounter}</h4>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default BookingList