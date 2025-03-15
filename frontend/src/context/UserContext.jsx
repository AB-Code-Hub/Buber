import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {

    const [user, setUser] = useState({
      email: "",
      fullName: {
        firstName: "",
        lastName: "",
      },
    })

  return (
    <UserDataContext.Provider value={ {user, setUser} }>
        <div>{children}</div>
    </UserDataContext.Provider>
  )
}

export default UserContext