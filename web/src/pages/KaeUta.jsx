import { useState } from 'react'
import { Link } from 'react-router-dom'
import './KaeUta.css'

const TYPES = [
  { id: 'debu',    label: '🍔 デブ系',      desc: '食欲よ、永遠に' },
  { id: 'kyoro',   label: '👀 キョロ充系',   desc: '周りが気になって仕方ない' },
  { id: 'chigyuu', label: '🐄 チー牛系',     desc: '陰の者、参上' },
  { id: 'nekura',  label: '🌑 根暗系',       desc: '家が一番、人間は二番' },
  { id: 'akarui',  label: '🌟 明るくなる系', desc: 'それでも私は最高だ' },
]

export default function KaeUta() {
  const [lyrics, setLyrics] = useState('')
  const [selected, setSelected] = useState(null)
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    if (!lyrics.trim() || !selected) return
    setOutput('')
    setLoading(true)
    try {
      const res = await fetch('/.netlify/functions/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selected, lyrics }),
      })
      const data = await res.json()
      setOutput(data.lyrics)
    } catch {
      setOutput('エラーが発生しました。もう一度試してください。')
    } finally {
      setLoading(false)
    }
  }

  const canGenerate = lyrics.trim() && selected && !loading

  return (
    <div className="kaeuta-page">
      <div className="kaeuta-inner">
        <Link to="/lab" className="back-link">← 実験室へ</Link>

        <header className="kaeuta-header">
          <h1>🎤 替え歌マシーン</h1>
          <p>好きな曲の歌詞を貼り付けて、タイプを選ぶとAIが替え歌にします。</p>
        </header>

        <div className="kaeuta-step">
          <label className="step-label">① 歌詞を貼り付けてください</label>
          <textarea
            className="lyrics-input"
            placeholder="ここに歌詞を貼り付け..."
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            rows={8}
          />
        </div>

        <div className="kaeuta-step">
          <label className="step-label">② タイプを選んでください</label>
          <div className="kaeuta-types">
            {TYPES.map((t) => (
              <button
                key={t.id}
                className={`type-btn ${selected === t.id ? 'active' : ''}`}
                onClick={() => setSelected(t.id)}
                disabled={loading}
              >
                <span className="type-label">{t.label}</span>
                <span className="type-desc">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          className="generate-btn"
          onClick={generate}
          disabled={!canGenerate}
        >
          {loading ? '生成中...🎵' : '替え歌を作る'}
        </button>

        {output && !loading && (
          <div className="kaeuta-output">
            <pre>{output}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
