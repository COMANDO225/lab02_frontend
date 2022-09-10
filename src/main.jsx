import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../src/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as JotaiProvider } from 'jotai'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <JotaiProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </JotaiProvider>
  </React.StrictMode>
)
