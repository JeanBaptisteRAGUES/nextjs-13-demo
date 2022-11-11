import '../styles/globals.css'
import type { AppProps } from 'next/app'

//Créé avec : npx create-next-app -e with-tailwindcss nom_du_projet

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
