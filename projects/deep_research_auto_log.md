[Deep Research API 自動化構想]

GeminiのDeep Research APIをGitHub Actionsで週次実行。
競合・読者感情・技術アップデートの3軸を自動調査し続ける設計。
結果はマークダウンで保存して通知が来る。

[活用用途]
- アフィリエイトの記事テーマ選定
- noteの方向性確認
- 「何が今刺さるか」が毎週自動で上がってくる状態を作る

[実装メモ（Geminiより）]
- エンドポイント: interactions.create
- agent="deep-research-pro-preview-12-2025"（または最新版）
- background=True で非同期実行
- interaction_id を保存し、completedになるまでポーリング
- 完了後、マークダウン形式でNotion/GoogleドライブまたはCMSに流し込む

[週次巡回の調査軸（案）]
- 競合動向：AI組織論・AIエージェント運用を掲げるnote/技術ブログの新規参入者と反応数
- 受容度調査：AI生成コンテンツへのSNS上の感情分析
- 技術的ショートカット：自律型エージェント（MCP、LangGraph等）の最新アップデート

※リサーチの方向性はエージェントと検討の上で策定する
