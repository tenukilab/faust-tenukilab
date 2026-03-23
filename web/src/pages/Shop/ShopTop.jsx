import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import './Shop.css'

export default function ShopTop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (!error) setProducts(data)
    setLoading(false)
  }

  const handleBuy = async (product) => {
    try {
      const res = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
          userId: null,
        }),
      })
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      alert('エラーが発生しました。もう一度お試しください。')
    }
  }

  if (loading) return <div className="shop-loading">読み込み中...</div>

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>🛒 ショップ</h1>
        <p>てぬきラボで作ったものを売っています。</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.image_url && (
              <img src={product.image_url} alt={product.name} className="product-image" />
            )}
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="product-footer">
                <span className="product-price">¥{product.price.toLocaleString()}</span>
                <button
                  className="buy-button"
                  onClick={() => handleBuy(product)}
                >
                  購入する
                </button>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="shop-empty">準備中です。もうしばらくお待ちください。</p>
        )}
      </div>
    </div>
  )
}
