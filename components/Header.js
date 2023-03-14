import AppContext from '@/context/app/appContext'
import AuthContext from '@/context/auth/authProvider'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const Header = () => {

  const { usuario, cerrarSesion } = useContext(AuthContext)
  const { limpiarState } = useContext(AppContext)
  const router = useRouter()
  const redireccionar = () => {
    router.push('/')
    limpiarState()
  }
  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>

      <Image onClick={() => redireccionar()} width={200} height={200} className='w-64 mb-8 cursor-pointer md:mb-0' src={'/logo.svg'} alt='Imagen logo' />

      <div>
        {
          usuario?.nombre ? (
            <div className='flex items-center '>
              <p className='mr-2'>Hola  {usuario.nombre}</p>
              <button
                className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'
                onClick={cerrarSesion}
              >Cerrar Sesion</button>
            </div>
          ) : (
            <>
              <Link className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2' href={'/login'}>Iniciar Sesión</Link>
              <Link className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase' href={'/crearcuenta'}>Crear Cuenta</Link>
            </>
          )
        }
      </div>
    </header>
  )
}

export default Header
