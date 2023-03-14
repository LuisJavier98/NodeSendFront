import AppContext from '@/context/app/appContext'
import React, { useContext, useState } from 'react'

const Formulario = () => {
  const { agregarPassword, agregarDescargas } = useContext(AppContext)
  const [tienePassword, settienePassword] = useState(false)


  return (
    <div className='w-full mt-20 '>
      <div className='flex flex-col'>
        <label className='text-lg text-gray-800' htmlFor="">Eliminar tras:</label>
        <select onChange={(e) => agregarDescargas(+e.target.value)} className='appearance-none w-fulll mt-2 bg-shite border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500' name="" id="">
          <option value="" selected disabled>-- Seleccione --</option>
          <option value="1" >1</option>
          <option value="5" >5</option>
          <option value="10" >10</option>
          <option value="20" >20</option>
        </select>
      </div>
      <div className='mt-4'>
        <div className='flex justify-between items-center'>
          <label className='text-lg mr-2 text-gray-800' htmlFor="">Proteger con contraseña</label>
          <input onChange={() => settienePassword(!tienePassword)} type="checkbox" />
        </div>
        {
          tienePassword ?
            <input onChange={e => agregarPassword(e.target.value)} type="password" className='appearance-none w-full mt-2 bg-white border border-gray-400 tect-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500' /> :
            null

        }

      </div>
    </div>
  )
}

export default Formulario
