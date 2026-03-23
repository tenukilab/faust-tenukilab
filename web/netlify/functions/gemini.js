exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { type, lyrics } = JSON.parse(event.body)

  const typeLabels = {
    debu:    'デブ・食欲旺盛・食べるのが好きすぎる',
    kyoro:   'キョロ充・周りの目を気にしすぎる・自分がない',
    chigyuu: 'チー牛・オタク・陰キャ・こだわりが強い',
    nekura:  '根暗・人見知り・家が大好き・ぼっち上等',
    akarui:  'ネガティブな自分を全肯定・最高に明るくポジティブ',
  }

  const typeDesc = typeLabels[type]
  if (!typeDesc) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid type' }) }
  }

  const prompt = `以下の歌詞を「${typeDesc}」をテーマにした自虐系の替え歌にしてください。元の歌詞の音節数やリズムをなるべく維持しながら、全ての歌詞を替え歌に変換してください。出力は替え歌の歌詞のみにしてください（説明文は不要）。\n\n【元の歌詞】\n${lyrics}`

  const apiKey = process.env.GEMINI_API_KEY
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    }
  )

  const data = await response.json()

  // デバッグ用：生レスポンスを返す
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
}
