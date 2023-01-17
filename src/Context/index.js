import React, { createContext, useState } from 'react'
const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [role, setRole] = useState("")
    const [userName, setUserName] = useState("")
    const [userID, setUserID] = useState(window.localStorage.getItem("userID"))

    return (
        <UserContext.Provider value={{
            role,
            setRole,
            userID,
            setUserID,
            userName,
            setUserName
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext