import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom' 
import router from './router'
import {ContextProvider} from './context/ContextProvider.jsx'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
     </ContextProvider> 
     </QueryClientProvider>
  </React.StrictMode>
)
