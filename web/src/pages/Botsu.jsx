import { Link } from 'react-router-dom'
import './Botsu.css'

// ボツ画像・没アイデアデータ（手動で追加していく）
const botsuItems = [
  // 例:
  // {
  //   id: 1,
  //   title: "クロちゃん初期案",
  //   description: "最初に生成したクロちゃん。なんか違った。",
  //   image: "/images/botsu/kurochan_v1.png",
  //   category: "画像",
  // },
]

export default function Botsu() {
  return (
    <div className="botsu-page">
      <div className="botsu-inner">
        <Link to="/" className="back-link">← トップへ</Link>

        <header className="botsu-header">
          <img src="/images/kurochan_fansa.png" alt="クロちゃん" className="botsu-kurochan" />
          <h1>クロちゃんのお蔵入り（泣）</h1>
          <p>採用されなかった画像・没になったアイデア・ボツ記事たちを供養するページです。<br />クロちゃんが全力で悔しがっています。</p>
        </header>

        {botsuItems.length === 0 ? (
          <div className="botsu-empty">
            <p>（まだボツがありません。クロちゃん、今のところ全勝です）</p>
          </div>
        ) : (
          <div className="botsu-grid">
            {botsuItems.map((item) => (
              <div key={item.id} className="botsu-card">
                {item.image && (
                  <img src={item.image} alt={item.title} className="botsu-img" />
                )}
                <div className="botsu-body">
                  <span className="botsu-category">{item.category}</span>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
