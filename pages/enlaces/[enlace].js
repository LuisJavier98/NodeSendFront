import Alerta from '@/components/Alerta'
import Layout from '@/components/Layout'
import clienteAxios from '@/config/axios'
import AppContext from '@/context/app/appContext'
import React, { useContext, useState } from 'react'

const EnlaceUrl = ({ enlace }) => {
  const [tienePassword, settienePassword] = useState(enlace.password)
  const [password, setpassword] = useState('')
  const { mostrarAlerta, mensaje_archivo } = useContext(AppContext)

  const verificarPassword = async e => {
    e.preventDefault()
    try {
      const resultado = await clienteAxios(`/api/enlaces/${enlace.enlace}`, { password })
      settienePassword(resultado.data.password)

    } catch (error) {
      mostrarAlerta(error.response.data.msg)
    }
  }

  return (
    <Layout>
      {
        tienePassword ?
          <>
            <p className='text-center'>Este enlace esta protegido por un password , colocalo a continuación</p>
            {mensaje_archivo && <Alerta />}
            <div className='flex justify-center mt-5'>
              <div className='w-full mx-w-lg'>
                <form
                  onSubmit={e => verificarPassword(e)}
                  action="" className='bg-wite wounded dhadow-md px-8 pt-6 pb-8 mb-4'>
                  <div className='mb-4'>
                    <label className='block text-black text-sm font-bold mb-2' htmlFor="password">password</label>
                    <input type="password" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-7000 leading-tight focus:outline-none focus:outline' id='password' placeholder='Password del enlace'
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}

                    />
                  </div>
                  <input type="submit"
                    className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white hover:cursor-pointer uppercase transition-colors font-bold'
                    value={'Validar Password'}
                  />
                </form>
              </div>
            </div>
          </>
          :
          <>
            <h1 className='text-4xl text-center text-gray-700 '>Descarga tu archivo</h1>
            <div className='flex items-center justify-center mt-10'>
              <a className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer' href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                download
              >Aqui</a>
            </div>
          </>
      }
    </Layout >
  )
}

export default EnlaceUrl

export async function getServerSideProps({ params: { enlace } }) {

  const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`)
  return {
    props: {
      enlace: resultado.data
    }
  }
}
export async function getServerSidePaths() {
  const enlaces = await clienteAxios.get('/api/enlaces')
  return {
    paths: enlaces.data.enlaces.map(enlace => ({
      params: { enlace: enlace.url }
    })),
    fallback: false,
  }
}
