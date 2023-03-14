import Layout from '@/components/Layout'
import AuthContext from '@/context/auth/authProvider'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import Dropzone from '@/components/Dropzone'
import AppContext from '@/context/app/appContext'
import Alerta from '@/components/Alerta'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { usuarioAutenticado, usuario } = useContext(AuthContext)
  const { mensaje_archivo, url } = useContext(AppContext)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      usuarioAutenticado()

    }

  }, [])

  return (
    <Layout>
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        {url ?
          <>
            <p className='text-center text-2xl mt-10'>
              <span className='font-bold text-red-700 text-4xl uppercase'>
                Tu URL es:
              </span>
              {`${process.env.frontendURL}/enlaces/${url}`}</p>
            <button type="submit"
              className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white hover:cursor-pointer uppercase mt-10 transition-colors font-bold'
              onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
            >Copiar enlace</button>
          </>
          :
          <>
            {mensaje_archivo && <Alerta />}
            <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
              <Dropzone />
              <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
                <h2 className='text-4xl font-sans font-bold text-gray-800 my-4 '>
                  Compartir archivos de forma sencilla y privada
                </h2>
                <p className='text-lg leading-loose'>
                  <span className='text-red-500 font-bold'>ReactNodeSend</span> te permite compartir archivos cifrados de extremo a extremo y un archivo que es eliminado despues de ser descargado.Asi que puede mantener lo que compartes en privado y asegurarte de que las cosas no permanecen en linea para siempre.
                </p>
                {
                  usuario?.nombre ? null :
                    <Link className='text-red-500 font-bold text-lg hover:text-red-700 ' href={'/crearcuenta'}>
                      Crea una cuenta para mayores beneficios
                    </Link>
                }
              </div>
            </div>
          </>
        }
      </div>
    </Layout>
  )
}
