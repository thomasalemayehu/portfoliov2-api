import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './assets/styles/index.css'
import AddProjectPage from './pages/AddProjectPage'
// import App from './App'
// App
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <AddProjectPage />
  </React.StrictMode>,
)
