import { Link } from 'react-router-dom'
import './Lab.css'

// 実験・試作品データ（手動で追加していく）
const labItems = [
  {
    id: 3,
    title: "射撃訓練場",
    description: "会社でこっそりVALORANTの練習ができるエイムトレーナー。RAPID FIRE・PRECISION・FLICKの3モード。感度・クロスヘア・ターゲットサイズも調整できます。",
    status: "公開中",
    tags: ["ゲーム", "FPS", "JavaScript"],
    link: "/games/fps/",
  },
  {
    id: 2,
    title: "替え歌マシーン",
    description: "自分のタイプを選ぶと、AIが自虐替え歌を生成します。デブ系・キョロ充系・チー牛系・根暗系・明るくなる系の5種類。",
    status: "公開中",
    tags: ["AI", "Gemini", "替え歌"],
    link: "/lab/kaeuta",
  },
  {
    id: 1,
    title: "てぬきブロック崩し",
    description: "AIと会話しながら作ったブロック崩し。マウスか矢印キーでパドルを動かして全ブロックを破壊せよ。レベルアップでスピードアップ。",
    status: "公開中",
    tags: ["ゲーム", "Canvas", "JavaScript"],
    link: "/games/breakout/",
  },
]

const STATUS_COLOR = {
  "開発中": "#ff9800",
  "公開中": "#4caf50",
  "凍結中": "#888",
  "完成": "#2196f3",
}

export default function Lab() {
  return (
    <div className="lab-page">
      <div className="lab-inner">
        <Link to="/" className="back-link">← トップへ</Link>

        <header className="lab-header">
          <h1>🧪 実験室</h1>
          <p>プロトタイプ・試作品・開発中のものを置いています。完成してないけど見せます。</p>
        </header>

        {labItems.length === 0 ? (
          <div className="lab-empty">
            <p>現在準備中です。もうすぐ何か置きます。</p>
          </div>
        ) : (
          <div className="lab-grid">
            {labItems.map((item) => (
              <div key={item.id} className="lab-card">
                <div className="lab-card-header">
                  <h2>{item.title}</h2>
                  <span className="lab-status" style={{ background: STATUS_COLOR[item.status] || "#888" }}>
                    {item.status}
                  </span>
                </div>
                <p className="lab-description">{item.description}</p>
                <div className="lab-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="lab-tag">{tag}</span>
                  ))}
                </div>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer" className="lab-link">
                    見てみる →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
