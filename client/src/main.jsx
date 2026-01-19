import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import theme from './theme.jsx'
import { ThemeProvider } from '@mui/material/styles';
import { RateLimitProvider } from './Errors/RateLimitContext'
import axios from 'axios'

axios.defaults.baseURL = 'https://www.globalopulence.ca';
// axios.defaults.baseURL = 'http://localhost:3000';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RateLimitProvider>
        <App />
      </RateLimitProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
