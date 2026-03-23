import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogDetail from './pages/BlogDetail'
import Lab from './pages/Lab'
import Botsu from './pages/Botsu'
import KaeUta from './pages/KaeUta'
import Activity from './pages/Activity'
import ShopTop from './pages/Shop/ShopTop'
import ShopSuccess from './pages/Shop/ShopSuccess'
import ShopCancel from './pages/Shop/ShopCancel'
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
      <Route path="/shop" element={<ShopTop />} />
      <Route path="/shop/success" element={<ShopSuccess />} />
      <Route path="/shop/cancel" element={<ShopCancel />} />
    </Routes>
  )
}

export default App
