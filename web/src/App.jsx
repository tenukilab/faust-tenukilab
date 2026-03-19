import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogDetail from './pages/BlogDetail'
import Lab from './pages/Lab'
import Botsu from './pages/Botsu'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/lab" element={<Lab />} />
      <Route path="/botsu" element={<Botsu />} />
    </Routes>
  )
}

export default App
