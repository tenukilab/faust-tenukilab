import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogDetail from './pages/BlogDetail'
import Lab from './pages/Lab'
import Botsu from './pages/Botsu'
import KaeUta from './pages/KaeUta'
import Activity from './pages/Activity'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/lab" element={<Lab />} />
      <Route path="/lab/kaeuta" element={<KaeUta />} />
      <Route path="/botsu" element={<Botsu />} />
      <Route path="/activity" element={<Activity />} />
    </Routes>
  )
}

export default App
