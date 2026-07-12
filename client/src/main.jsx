import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import theme from './theme.jsx'
import { ThemeProvider } from '@mui/material/styles';
import { RateLimitProvider } from './Errors/RateLimitContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RateLimitProvider>
        <App />
      </RateLimitProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
