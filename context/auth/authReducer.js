export const functionReducer = (state, action) => {
  switch (action.type) {
    case ('USUARIO_AUTENTICADO'):
      return {
        ...state,
        usuario: action.payload,
        autenticado: true
      }
    case 'REGISTRO_EXITOSO':
    case 'REGISTRO_ERROR':
    case 'LIMPIAR_ALERTA':
    case 'LOGIN_ERROR':
      return {
        ...state,
        mensaje: action.payload
      }
    case 'LOGIN_EXITOSO':
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        token: action.payload,
        autenticado: true
      }
    case 'CERRAR_SESION':
      localStorage.removeItem('token')
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: null,
      }
    default: return state
  }
}