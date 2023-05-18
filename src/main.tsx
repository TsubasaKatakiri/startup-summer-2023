import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colors: {
              blue: ['#eef4fe', '#deeafe', '#bed5fd','#9ec0fd','#7eabfc','#6ea0fc','#5E96FC','#4b78c9','#385a97','#253c64'],
              gray: ['#F7F7F8','#F5F5F6','#EAEBED','#EAEBED', '#D5D6DC','#ACADB9','#ACADB9','#7B7C88','#EAEBED','#232134'],
              black: ['#232134','#232134','#232134','#232134','#232134','#232134','#232134','#232134','#232134','#232134']
            },
            breakpoints: {
              xs: '20em',
              sm: '48em',
              md: '62em',
              lg: '70em',
              xl: '90em',
            },
          }}
        >
          <App />
        </MantineProvider>
    </Provider>
  </React.StrictMode>,
)
