import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom' 
import router from './router'
import {ContextProvider} from './context/ContextProvider.jsx'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';
import './i18n.js';




const queryclient =new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0 ,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}> 
    <ReactQueryDevtools initialIsOpen={false} />
     <ContextProvider>
     <RouterProvider router={router}/>
     <Toaster
        position="top-center"
        containerStyle={{margin: '50px'}}
        gutter={8}
        toastOptions={{
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: 'red',
              secondary: 'black',
            },
          },
          style: {
          fontSize: '16px',
          padding: '16px 24px',
          maxWidth: '400px',

          },
          } }

       
     
     />
     </ContextProvider> 
     </QueryClientProvider>
  </React.StrictMode>
)
