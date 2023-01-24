import React, { useContext, useState, useEffect, useRef } from 'react'
import { Button, Overlay, Tooltip } from 'react-bootstrap'

import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../Context'
import axios from 'axios'
import ContentDashboard from './ContentDashboard'
import AdminProfile from '../Profile/index'
import AdminStatistik from '../Statistik/index'
import AdminAbout from '../About/index'


const Admin = () => {

  const navigateTo = useNavigate()
  const [isActive, setIsActive] = useState("Dashboard")
  const { userID } = useContext(UserContext)
  const [adminName, setAdminName] = useState("")
  const [role, setRole] = useState("")
  const [nohp, setNoHp] = useState("")
  const [email, setEmail] = useState("")
  const [nik, setNik] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const target = useRef(null)
  const [totalClient, setTotalClient] = useState("")

  const logOut = () => {
    axios.put(`http://127.0.0.1:8000/logout/${userID}`).then((response) => {
      console.log(response.data)
      if (response.data === "offline") {
        localStorage.removeItem("userID")
        navigateTo("/")
      }
    })
  }

  const showTotalUser = (toolTipToogle) => {
    setShow(toolTipToogle)
    axios.get('http://127.0.0.1:8000/client-list').then((response) => {
      response.data.map(( result, i, row) => {
          return((i + 1 === row.length) && setTotalClient(`${i + 1}`))
        })
    })
  }

  useEffect(() => {
    const showCurrentAdminData = () => {
      axios.get(`http://127.0.0.1:8000/admin/${userID}`).then((response) => {
        setAdminName(response.data.nama)
        setRole(response.data.role)
        setNoHp(response.data.nohp)
        setEmail(response.data.email)
        setNik(response.data.nik)
        setPassword(response.data.password)
      })
    }
    showCurrentAdminData()
    //eslint-disable-next-line
  }, [])


  return (
    <>
      <section className='content-container' >
        <div className='sidebar-wrapper pt-2 px-2 pb-2'>
          <div className='sidebar-container box-shadow fixed-top m-2' style={{ height: "98%", border: "1px solid grey" }}>
            <div className='brand-container'>
              <div className='brand-content'>
                <div>
                  <img src='https://asset.kompas.com/crops/JZ0b7mJJ_tZvjF2WVxOM2Gwhdy8=/0x0:1920x1280/750x500/data/photo/2021/09/16/6142b0561f558.jpg' className='img-profile' alt='no preview' />
                </div>
                <div className='p-2 d-flex flex-column hide-desc-for-mobile'>
                  <h5 className='navbar-text-overflow'> {adminName}</h5>
                  <span className='bi bi-award-fill fw-light'> {role}</span>
                  <span className='bi bi-envelope-at-fill fw-light navbar-text-overflow'> {email} </span>
                  <span className='bi bi-telephone-fill fw-light'> {nohp} </span>
                </div>
              </div>
              <hr className="border border-warning border-2 opacity-50" />
            </div>
            <div className='list-container'>
              <div className={(isActive === "Dashboard") ? 'list-wrapper-active' : 'list-wrapper'} onClick={() => { setIsActive("Dashboard") }} >
                <span className='bi bi-house-fill text-primary fs-4' />
                <span className='fw-bold' style={{ marginLeft: "10px" }}> <span className='list-text'> Dashboard </span></span>
              </div>
              <div className={(isActive === "Profile") ? 'list-wrapper-active' : 'list-wrapper'} onClick={() => { setIsActive("Profile") }}>
                <span className='bi bi-person-fill text-info fs-4' />
                <span className='fw-bold' style={{ marginLeft: "10px" }}> <span className='list-text'> Profile </span></span>
              </div>
              <div className={(isActive === "Statistik") ? 'list-wrapper-active' : 'list-wrapper'} onClick={() => { setIsActive("Statistik") }}>
                <span className='bi bi-bar-chart-fill text-danger fs-4' />
                <span className='fw-bold' style={{ marginLeft: "10px" }}> <span className='list-text'> Detail </span></span>
              </div>
              <div className={(isActive === "About") ? 'list-wrapper-active' : 'list-wrapper'} onClick={() => { setIsActive("About") }}>
                <span className='bi bi-info-square-fill text-success fs-4' />
                <span className='fw-bold' style={{ marginLeft: "10px" }}> <span className='list-text'> About </span></span>
              </div>
            </div>
          </div>
        </div>
        <div className='content-container'>
          {/* ADMIN NAVBAR */}
          <div className='navbar-wrapper pt-2 px-2'>
            <div className='navbar-container box-shadow'>
              <div className='logo-container'>
                <div className='d-flex align-items-center' style={{ cursor: "pointer" }}>
                  <img src={logo} style={{ height: "50px", width: "50px", marginRight: "10px" }} alt='no preview' />
                  <h5 className='txt-logo'>DWANZ-FUTSAL</h5>
                </div>
                <div className='d-flex justify-content-center align-items-center gap-3 hide-desc-for-mobile' style={{ cursor: "pointer" }}>
                  <Button className='bi bi-people-fill  mt-1 mb-1 py-1 fw-bold' variant={(show)?'success':'outline-success'} ref={target} onClick={() => showTotalUser(!show)}> <span className='flex-column hide-desc-for-mobile'> User</span></Button>
                  <Button className='bi bi-box-arrow-left m-2 p-1 fw-bold'
                    variant='outline-danger'
                    onClick={() => {
                      logOut()
                    }}>
                    <span className='flex-column hide-desc-for-mobile'>
                      Logout
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            {/* ADMIN CONTENT */}
            {
              (isActive === "Dashboard")
                ?
                <ContentDashboard gotoProfile={() => setIsActive("Profile")} gotoDetail={() => setIsActive("Statistik")} adminName={adminName} role={role} nohp={nohp} email={email} />
                :
                (isActive === "Profile")
                  ?
                  <AdminProfile adminName={adminName} role={role} nohp={nohp} email={email} nik={nik} password={password} />
                  :
                  (isActive === "Statistik")
                    ?
                    <AdminStatistik />
                    :
                    (isActive === "About")
                    &&
                    <AdminAbout />
            }
          </div>
        </div>
      </section>
      {/* TOOLTIPS */}
      <Overlay target={target.current} show={show} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            Terdapat {totalClient} client yang telah melakukan registrasi. 
          </Tooltip>
        )}
      </Overlay>
    </>
  )
}

export default Admin