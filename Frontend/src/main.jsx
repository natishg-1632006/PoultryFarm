import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GlobalState from './component/context/GlobalContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './component/context/AuthContext.jsx'
import { DataProvider } from './component/context/DataContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <DataProvider>
        <GlobalState>
          <App />
        </GlobalState>
      </DataProvider>
    </AuthContext>
  </BrowserRouter>
)
