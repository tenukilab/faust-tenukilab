import { Link } from 'react-router-dom'
import './Shop.css'

export default function ShopCancel() {
  return (
    <div className="shop-result">
      <div className="shop-result-card">
        <div className="shop-result-icon">🛒</div>
        <h1>購入をキャンセルしました</h1>
        <p>また気が向いたらどうぞ。</p>
        <div className="shop-result-actions">
          <Link to="/shop" className="btn-shop">ショップに戻る</Link>
          <Link to="/" className="btn-home">トップに戻る</Link>
        </div>
      </div>
    </div>
  )
}
