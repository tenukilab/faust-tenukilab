import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home">

      {/* ヒーローセクション */}
      <section className="hero">
        <div className="hero-inner">
          <img src="/images/tenukilab_icon.png" alt="てぬきラボ" className="hero-logo" />
          <h1 className="hero-title">てぬきラボ</h1>
          <p className="hero-tagline">手を動かさないための努力を永遠に。</p>
          <p className="hero-sub">AIで組織を作り、AIでゲームを作り、AIでキャラを作る。<br />手は動かさない。頭だけ動かす。</p>
          <div className="hero-links">
            <a href="https://x.com/tenuki_lab" target="_blank" rel="noreferrer" className="btn btn-x">X（旧Twitter）</a>
            <a href="https://note.com/tenuki_lab" target="_blank" rel="noreferrer" className="btn btn-note">note</a>
            <Link to="/blog" className="btn btn-blog">記事一覧</Link>
            <Link to="/lab" className="btn btn-lab">🧪 実験室</Link>
            <Link to="/botsu" className="btn btn-botsu">クロちゃんのお蔵入り（泣）</Link>
          </div>
        </div>
      </section>

      {/* キャラクター紹介 */}
      <section className="characters">
        <h2 className="section-title">キャラクター</h2>
        <div className="char-grid">
          <div className="char-card">
            <img src="/images/kurochan_fansa.png" alt="クロちゃん" className="char-img" />
            <h3>クロちゃん</h3>
            <p>てぬきラボのAIインタビュアー。<br />看板娘。マイクがトレードマーク。</p>
          </div>
          <div className="char-card">
            <img src="/images/tenuki_charactersheet.png" alt="てぬきさん" className="char-img" />
            <h3>てぬきさん</h3>
            <p>てぬきラボ創設者。おにぎり。<br />のんびりしてるけど頭の中はフル回転。</p>
          </div>
        </div>
      </section>

      {/* コンセプト */}
      <section className="concept">
        <h2 className="section-title">てぬきラボとは</h2>
        <div className="concept-grid">
          <div className="concept-card">
            <span className="concept-icon">🤖</span>
            <h3>AIで何でも作る</h3>
            <p>ゲーム開発、組織設計、キャラクター制作。専門知識がなくてもAIがあればできる。</p>
          </div>
          <div className="concept-card">
            <span className="concept-icon">🧠</span>
            <h3>頭だけ動かす</h3>
            <p>手を動かすのはAIの仕事。人間は考えることに集中する。それがてぬきラボの流儀。</p>
          </div>
          <div className="concept-card">
            <span className="concept-icon">🎲</span>
            <h3>気の向くままに</h3>
            <p>義務感なし。面白いと思ったことをやる。その過程をそのまま発信する。</p>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="footer">
        <p>© 2026 てぬきラボ</p>
        <div className="footer-links">
          <a href="https://x.com/tenuki_lab" target="_blank" rel="noreferrer">X</a>
          <a href="https://note.com/tenuki_lab" target="_blank" rel="noreferrer">note</a>
        </div>
      </footer>

    </div>
  )
}
