
import clienteAxios from '@/config/axios'
import { config } from '@/config/tokenAuth'
import React, { useReducer } from 'react'
import AppContext from './appContext'
import appReducerFunction from './appReducer'

const AppState = ({ children }) => {

  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original: '',
    cargando: null,
    descargas: 1,
    password: '',
    autor: null,
    url: ''
  }

  const [state, dispatch] = useReducer(appReducerFunction, initialState)

  const mostrarAlerta = msg => {
    dispatch({
      type: 'MOSTRAR_ALERTA',
      payload: msg
    })
    setTimeout(() => {
      dispatch({
        type: 'OCULTAR_ALERTA',
        payload: null
      })

    }, 1500);
  }

  const subirArchivo = async (formData, nombreArchivo) => {

    console.log(process.env.backendURL)
    dispatch({
      type: 'SUBIR_ARCHIVO'
    })
    try {
      const resultado = await clienteAxios.post('/api/archivos', formData);
      dispatch({
        type: 'SUBIR_ARCHIVO_EXITO',
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo
        }
      })
      console.log(resultado.data)
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'SUBIR_ARCHIVO_ERROR',
        payload: error.response.data.msg
      })
    }
  }

  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.auth,
    }
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const resultado = await clienteAxios.post('/api/enlaces', data, config(token))
        dispatch({
          type: 'CREAR_ENLACE_EXITO',
          payload: resultado.data.msg
        })
      } else {
        const resultado = await clienteAxios.post('/api/enlaces', data)
        dispatch({
          type: 'CREAR_ENLACE_EXITO',
          payload: resultado.data.msg
        })

      }
    } catch (error) {
      console.log(error)
    }
  }


  const limpiarState = () => {
    console.log('limpiando')
    dispatch({
      type: 'LIMPIAR_STATE',
    })
  }

  const agregarPassword = (password) => {
    dispatch({
      type: 'AGREGAR_PASSWORD',
      payload: password
    })
  }

  const agregarDescargas = (descargas) => {
    dispatch({
      type: 'AGREGAR_DESCARGAS',
      payload: descargas
    })
  }


  return (
    <AppContext.Provider value={{
      mensaje_archivo: state.mensaje_archivo,
      mostrarAlerta,
      subirArchivo,
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      cargando: state.cargando,
      descargas: state.descargas,
      password: state.password,
      autor: state.auth,
      url: state.url,
      crearEnlace,
      limpiarState,
      agregarPassword,
      agregarDescargas
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppState
