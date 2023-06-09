import AppContext from '@/context/app/appContext'
import AuthContext from '@/context/auth/authProvider'
import React, { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import Formulario from './Formulario'

const Dropzone = () => {

  const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = useContext(AppContext)
  const { usuario, autenticado } = useContext(AuthContext)
  const onDropRejected = () => {
    mostrarAlerta('No se pudo subir,el limite es 1MB,obten una cuenta para subir archivos mas grandes')
  }


  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData()
    formData.append('archivo', acceptedFiles[0])
    subirArchivo(formData, acceptedFiles[0].name)
  }, [])

  const { getRootProps, getInputProps, isDragAccept, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 })

  const archivos = acceptedFiles.map(archivo => (
    <li key={archivo.lastModified} className='bg-white flwx-1 p-3 mb-4 shadow-lg rounded'>
      <p className='font-bold text-xl'>
        {archivo.path}
      </p>
      <p className=' text-sm text-gray-500'>{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
    </li>
  ))



  return (
    <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4'>
      {acceptedFiles.length > 0 ?
        (
          <div className='mt-10 w-full'>
            <h4 className='text-2xl font-bold text-center mb-4'>Archivos</h4>
            <ul>
              {archivos}
            </ul>
            {autenticado ? <Formulario /> : ''}
            <button
              type='button'
              className='bg-blue-700 w-full py-3 rounder-lg text-wite my-10 hover'
              onClick={() => crearEnlace()}
            >
              Crear enlace
            </button>
          </div>
        ) :
        (
          <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
            <input {...getInputProps()} className='h-100' type="text" />
            <div className='text-center'>
              {
                isDragAccept ? <p className='text-2xl text-center text-gray-600'>Suelta el archivo</p> :
                  <>
                    <p className='text-2xl text-center text-gray-600'>Selecciona un archivo y arrastralo aquí</p>

                    {cargando ? <p className='my-10 text-center text-gray-700'>Subiendo archivo...</p> :
                      <button className='bg-blue-700 w-full py-3 rounder-lg text-wite my-10 hover'>Selecciona archivo para subir</button>
                    }
                  </>
              }

            </div>
          </div>

        )}
    </div>
  )
}

export default Dropzone
