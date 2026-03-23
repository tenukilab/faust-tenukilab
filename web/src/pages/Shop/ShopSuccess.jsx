import { Link } from 'react-router-dom'
import './Shop.css'

export default function ShopSuccess() {
  return (
    <div className="shop-result">
      <div className="shop-result-card">
        <div className="shop-result-icon">🎉</div>
        <h1>購入完了！</h1>
        <p>ありがとうございます。購入が完了しました。</p>
        <div className="shop-result-actions">
          <Link to="/shop" className="btn-shop">ショップに戻る</Link>
          <Link to="/" className="btn-home">トップに戻る</Link>
        </div>
      </div>
    </div>
  )
}
