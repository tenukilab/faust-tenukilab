import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Activity.css'

const REPO = 'tenukilab/faust-tenukilab'
const API_BASE = 'https://api.github.com'

function generateDateGrid() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 52 * 7 - startDate.getDay())
  const weeks = []
  let current = new Date(startDate)
  for (let w = 0; w < 53; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      week.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

function getLevel(count) {
  if (count === 0) return 0
  if (count === 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}

function formatDate(date) {
  return date.toISOString().split('T')[0]
}

function formatDateJa(str) {
  const d = new Date(str)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function Activity() {
  const [commitMap, setCommitMap] = useState({})
  const [commits, setCommits] = useState([])
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalCommits, setTotalCommits] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const pages = await Promise.all(
          [1, 2, 3].map(page =>
            fetch(`${API_BASE}/repos/${REPO}/commits?per_page=100&page=${page}`)
              .then(r => r.json())
          )
        )
        const allCommits = pages.flat().filter(c => c && c.commit)
        const map = {}
        allCommits.forEach(c => {
          const date = c.commit.author.date.split('T')[0]
          map[date] = (map[date] || 0) + 1
        })
        setCommitMap(map)
        setCommits(allCommits.slice(0, 10))
        setTotalCommits(allCommits.length)

        // 公開ログ取得
        const logsRes = await fetch(`${API_BASE}/repos/${REPO}/contents/public_logs`)
        if (logsRes.ok) {
          const logsFiles = await logsRes.json()
          if (Array.isArray(logsFiles)) {
            const mdFiles = logsFiles.filter(f => f.name.endsWith('.md'))
            const fileContents = await Promise.all(
              mdFiles.map(f => fetch(f.download_url).then(r => r.text()))
            )
            setLogs(mdFiles.map((f, i) => ({
              name: f.name.replace('.md', ''),
              content: fileContents[i].slice(0, 150).trim() + '…',
              url: f.html_url,
            })))
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const weeks = generateDateGrid()
  const today = formatDate(new Date())

  // 月ラベルの位置を計算
  const monthLabels = []
  weeks.forEach((week, wi) => {
    const firstDay = week[0]
    if (firstDay.getDate() <= 7) {
      monthLabels.push({ wi, label: MONTH_LABELS[firstDay.getMonth()] })
    }
  })

  return (
    <div className="activity-page">
      <div className="activity-inner">
        <Link to="/" className="back-link">← トップへ</Link>

        <header className="activity-header">
          <h1>🫀 生存確認</h1>
          <p>てぬきさんが今日も何かしてるという証拠。</p>
        </header>

        {loading ? (
          <div className="activity-loading">確認中…</div>
        ) : (
          <>
            {/* 活動グラフ */}
            <section className="activity-section">
              <div className="graph-header">
                <h2 className="activity-section-title">活動グラフ</h2>
                <span className="graph-total">{totalCommits}件（直近300件以内）</span>
              </div>
              <div className="graph-scroll">
                <div className="graph-wrap">
                  {/* 月ラベル */}
                  <div className="graph-months">
                    {weeks.map((_, wi) => {
                      const found = monthLabels.find(m => m.wi === wi)
                      return (
                        <div key={wi} className="graph-month-cell">
                          {found ? found.label : ''}
                        </div>
                      )
                    })}
                  </div>
                  {/* グリッド */}
                  <div className="graph-grid">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="graph-week">
                        {week.map((date, di) => {
                          const key = formatDate(date)
                          const count = commitMap[key] || 0
                          const level = getLevel(count)
                          const isFuture = date > new Date()
                          const isToday = key === today
                          return (
                            <div
                              key={di}
                              className={`graph-cell level-${isFuture ? 'empty' : level} ${isToday ? 'today' : ''}`}
                              title={`${key}：${count}件`}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                  {/* 凡例 */}
                  <div className="graph-legend">
                    <span>少ない</span>
                    {[0,1,2,3,4].map(l => (
                      <div key={l} className={`graph-cell level-${l}`} />
                    ))}
                    <span>多い</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 最近の動き */}
            <section className="activity-section">
              <h2 className="activity-section-title">最近の動き</h2>
              <ul className="commit-list">
                {commits.map((c, i) => (
                  <li key={i} className="commit-item">
                    <span className="commit-date">
                      {formatDateJa(c.commit.author.date)}
                    </span>
                    <span className="commit-message">
                      {c.commit.message.split('\n')[0]}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 公開ログ */}
            {logs.length > 0 && (
              <section className="activity-section">
                <h2 className="activity-section-title">公開ログ</h2>
                <p className="activity-section-sub">面白かったやり取りをそのまま置いています。</p>
                <div className="log-grid">
                  {logs.map((log, i) => (
                    <a key={i} className="log-card" href={log.url} target="_blank" rel="noreferrer">
                      <h3 className="log-name">{log.name}</h3>
                      <p className="log-preview">{log.content}</p>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <footer className="activity-footer">
          <p>© 2026 てぬきラボ</p>
        </footer>
      </div>
    </div>
  )
}
