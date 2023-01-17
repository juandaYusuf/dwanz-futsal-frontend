import React, { useState } from 'react'
import Calendar from 'react-calendar';
import { Alert, Card } from 'react-bootstrap'
import 'react-calendar/dist/Calendar.css';
import TabelDetailBooking from './TabelDetailBooking';

const AdminStatistik = () => {

  const [totalTimeUsed, setTotalTimeUsed] = useState(0)

  const getTotalTimeUser = (value) => {
    setTotalTimeUsed(value)
  }


  return (
    <>
      <div className='statistik-container'>
        <Card className='p-2 box-shadow calender-container scale-up-center' style={{ border: "1px solid grey" }}>
          <Calendar className="bg-light" />
        </Card>
        <div className='d-flex flex-column justify-content-center gap-2 w-100'>
          <Card className='p-2 box-shadow h-50 scale-up-center' style={{ border: "1px solid grey" }}>
            <Alert variant='info' className='d-flex align-items-center justify-content-center flex-column h-100 border-info m-0' >
            <div className='d-flex'>
                <span style={{ fontSize: "5rem", marginRight: "0px" }}>{18 - totalTimeUsed}</span>
                <div className="d-flex flex-column justify-content-end">
                  <span style={{ fontSize: "1.5rem", margin: "0px"}}> Jam</span>
                  <span>Yang tersisa dari 18 jam</span>
                </div>
              </div>
            </Alert>
          </Card>
          <Card className='p-2 box-shadow h-50 scale-up-center' style={{ border: "1px solid grey" }}>
            <Alert variant='warning' className='d-flex align-items-center justify-content-center flex-column h-100 border-warning m-0'>
              <div className='d-flex'>
                <span style={{ fontSize: "5rem", marginRight: "10px" }}>{totalTimeUsed}</span>
                <div className="d-flex flex-column justify-content-end">
                  <span style={{ fontSize: "1.5rem", margin: "0px"}}> Jam</span>
                  <span>Yang terpakai</span>
                </div>
              </div>
            </Alert>
          </Card>
        </div>
      </div>
      <div className='tabel-detail-container scale-up-center'>
        <Card className=' box-shadow w-100' style={{ border: "1px solid grey" }}>
          <div className='card-tabel-detail'>
            <h1>Booking List</h1>
            <TabelDetailBooking 
            time_used={getTotalTimeUser}
            />
          </div>
        </Card>
      </div>
    </>
  )
}

export default AdminStatistik