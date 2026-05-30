import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  const location = useLocation()
  const isAdminPage = location.pathname === '/admin'

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdminPage && <WhatsAppButton />}
    </>
  )
}

export default App
