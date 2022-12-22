import '../styles/globals.css';
import Header from './Header';
import { ApolloProvider } from "@apollo/client";
import client from '../apollo-client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <title>Jean-Baptiste Website</title>
      </head>
      {/* <ApolloProvider client={client}> */}
        <body className=' overflow-y-hidden h-full'>
          <Header />
          {children}
        </body>
      {/* </ApolloProvider> */}
    </html>
  )
}
