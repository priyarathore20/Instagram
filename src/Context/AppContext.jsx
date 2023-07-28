import React, { createContext, useState } from 'react'
const firebaseContext = createContext(null)

const AppContext = (props) => {
const [currentUser, setCurrentUser] = useState()
const [googleCurrentUser, setGoogleCurrentUser] = useState()

  return (
    <firebaseContext.Provider value={{currentUser, setCurrentUser, googleCurrentUser, setGoogleCurrentUser}}>
      {props.children}
    </firebaseContext.Provider>
  )
}

export default AppContext