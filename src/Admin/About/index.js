import React from 'react'
import { Card } from 'react-bootstrap'
import strukturOrg from '../../assets/struktur-organinsasi.png'

const AdminAbout = () => {
    return (
        <div className='dashboard-content-container'>
            <div className='d-flex justify-content-center p-3' style={{ height: "90vh" }}>
                <Card className='p-4 border-secondary box-shadow scale-up-center'>
                    <img src={strukturOrg} alt=' ' />
                </Card>
            </div>
        </div>
    )
}

export default AdminAbout