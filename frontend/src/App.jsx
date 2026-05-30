import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <WhatsAppButton />
    </>
  )
}

export default App
