import clienteAxios from '@/config/axios'
import tokenAuth, { config } from '@/config/tokenAuth'
import React, { useReducer } from 'react'
import AuthContext from './authProvider'
import { functionReducer } from './authReducer'

const AuthState = ({ children }) => {
  const initialState = {
    token: typeof (window) !== 'undefined' ? localStorage.getItem('token') : '',
    autenticado: null,
    usuario: null,
    mensaje: null,
  }
  const [state, dispatch] = useReducer(functionReducer, initialState)

  const registrarUsuario = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos)
      dispatch({
        type: 'REGISTRO_EXITOSO',
        payload: respuesta.data.msg
      })
    } catch (error) {
      dispatch({
        type: 'REGISTRO_ERROR',
        payload: error.response.data.msg
      })
    }
    setTimeout(() => {
      dispatch({
        type: 'LIMPIAR_ALERTA',
        payload: null
      })
    }, 1500);
  }


  const usuarioAutenticado = async nombre => {
    const token = localStorage.getItem('token')
    try {
      const respuesta = await clienteAxios.get('/api/auth', config(token))
      if (respuesta.data.usuario) {
        dispatch({
          type: 'USUARIO_AUTENTICADO',
          payload: respuesta.data.usuario
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const cerrarSesion = () => {
    dispatch({
      type: 'CERRAR_SESION'
    })
  }

  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/api/auth', datos)
      dispatch({
        type: 'LOGIN_EXITOSO',
        payload: respuesta.data.token
      })
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.response.data.msg
      })
    }
    setTimeout(() => {
      dispatch({
        type: 'LIMPIAR_ALERTA',
        payload: null
      })
    }, 1500);
  }




  return (
    <AuthContext.Provider value={{
      token: state.token,
      autenticado: state.autenticado,
      usuario: state.usuario,
      mensaje: state.mensaje,
      usuarioAutenticado,
      registrarUsuario,
      iniciarSesion,
      cerrarSesion

    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
