const { default: AuthContext } = require("@/context/auth/authProvider");
const { useContext } = require("react");

import AppContext from '@/context/app/appContext';
import React from 'react'

const Alerta = () => {
  const { mensaje } = useContext(AuthContext)
  const { mensaje_archivo } = useContext(AppContext)
  return (
    <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'>
      {mensaje || mensaje_archivo}
    </div>
  )
}

export default Alerta
