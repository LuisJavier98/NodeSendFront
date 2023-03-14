import AppState from '@/context/app/appState'
import AuthState from '@/context/auth/authState'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthState>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </AuthState>
  )
}
