import React, { createContext, useState } from 'react'
const firebaseContext = createContext(null)

const AppContext = (props) => {
const [currentUser, setCurrentUser] = useState()

  return (
    <firebaseContext.Provider value={{currentUser, setCurrentUser}}>
      {props.children}
    </firebaseContext.Provider>
  )
}

export default AppContext