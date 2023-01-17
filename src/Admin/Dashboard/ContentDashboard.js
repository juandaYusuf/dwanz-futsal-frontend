import React from 'react'
import BookingList from '../Dashboard/BookingList'
import { Alert } from 'react-bootstrap'

const ContentDashboard = (props) => {


    const gotoTabelClientList = () => {
        props.gotoProfile("Profile")
    }



    return (
        <>
            <div className='dashboard-content-container '>
                <BookingList gotoProfile/>
                <div className=' gap-2 admin-info-container'>
                    <div className='info-admin box-shadow scale-up-center'>
                        <h2 className='bi bi-person-bounding-box' style={{ color: "DimGrey" }}> PROFILE ADMIN</h2>
                        <div className='background-profile p-2 text-warning'>
                            <img src='https://asset.kompas.com/crops/JZ0b7mJJ_tZvjF2WVxOM2Gwhdy8=/0x0:1920x1280/750x500/data/photo/2021/09/16/6142b0561f558.jpg' className='img-profile-on-card-info' alt='no preview' />
                            <h1 style={{ textTransform: "uppercase" }}>{props.adminName}</h1>
                            <span style={{ textTransform: "lowercase" }} className="bi bi-envelope-at-fill"> {props.email}</span>
                            <span className='bi bi-telephone-fill'> {props.nohp}</span>
                        </div>
                    </div>
                    <div className=' info-admin box-shadow scale-up-center'>
                        <h2 className='bi bi-person-vcard' style={{ color: "DimGrey" }}> IDENTITAS ADMIN</h2>
                        <div className='admin-identitas-container'>
                            <div className='background-identitas p-2 text-success'>
                                <div className='d-flex justify-content-center'>
                                    <div className='d-flex flex-column mx-2'>
                                        <span>Nama</span>
                                        <span>Email</span>
                                        <span>No Telepon</span>
                                        <span>Role</span>
                                    </div>
                                    <div className='d-flex flex-column mx-2'>
                                        <span>{props.adminName}</span>
                                        <span>{props.email}</span>
                                        <span>{props.nohp}</span>
                                        <span>{props.role}</span>
                                    </div>
                                    <div className='d-flex  flex-column mx-2'>
                                        <span className='bi bi-check-square-fill' ></span>
                                        <span className='bi bi-check-square-fill' > Verified</span>
                                        <span className='bi bi-check-square-fill' > Verified</span>
                                        <span className='bi bi-check-square-fill' ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='alert-container'>
                            <Alert className='border-info' variant='info'>
                                <span className='bi bi-journals fw-bold'> Note....</span> <br />
                                <div>
                                    <div className=' d-flex align-items-center my-1'>
                                        <div className='mx-2'>
                                            <span className='bi bi-caret-right-fill' />
                                        </div>
                                        <div>
                                            <span>
                                                Anda sebagai admin di penyewaan lapang fursal Dwan futsal. Anda juga dapat menambahkan seseorang sebagai admin. <br />Jika anda ingin menambahkan seseorang sebagai admin anda bisa
                                                <span style={{ color: "red", textDecoration: "underline", cursor: "pointer" }} onClick={() => { gotoTabelClientList() }}>
                                                    klik disini
                                                </span> <br />
                                            </span>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center my-1'>
                                        <div className='mx-2'>
                                            <span className='bi bi-caret-right-fill' />
                                        </div>
                                        <div>
                                            <span>Jika anda ingin mengedit profile atau data pribadi anda silahkan kunjungi halaman profile pada sidebar.</span>
                                        </div>
                                    </div>
                                </div>
                            </Alert>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContentDashboard