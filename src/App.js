import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Login/Register';
import Login from './Login/Login';
import Home from './Home/index';
import Tiket from './Tiket/index'
import { UserContextProvider } from './Context/index';
import Admin from './Admin/Dashboard/index';
import AdminProfile from './Admin/Profile/index';
import ProfileClient from './ProfileClient';


function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/tiket" element={<Tiket />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/home/" element={<Home />} />
            <Route exact path="/admin/profile/" element={<AdminProfile />} />
            <Route exact path="/profile-client" element={<ProfileClient />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
