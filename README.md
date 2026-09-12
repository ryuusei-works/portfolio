# RYUSEI — Digital Gallery

Webデザイナー／フロントエンドエンジニア「龍成」のポートフォリオサイトです。

夜のデジタルギャラリーを巡る体験をテーマに、制作実績、プロフィール、対応内容、問い合わせ導線をまとめています。フレームワークやビルドツールを使わない静的サイトです。

## 主な機能

- スクロールに連動して入口から作品展示へ移るファーストビュー
- 制作実績データから自動生成する作品一覧
- 作品の概要・担当範囲・使用技術を確認できるモーダル
- PC／タブレット／スマートフォン対応
- モバイル用フルスクリーンメニュー
- モーション停止ボタンと `prefers-reduced-motion` 対応
- キーボード操作、フォーカス表示、スキップリンクなどのアクセシビリティ対応

## 使用技術

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts（Noto Serif JP / Cormorant Garamond / DM Sans）

## ローカルで確認する

ビルドは不要です。プロジェクトルートで簡易HTTPサーバーを起動します。

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いてください。

## ディレクトリ構成

```text
.
├── assets/
│   ├── hero-gallery.png       # ファーストビュー背景
│   ├── profile-photo.png      # プロフィール画像
│   └── *-lp.png / *.svg       # 制作実績画像
├── data/
│   └── projects.js            # 制作実績データ
├── index.html                 # ページ構造と本文
├── style.css                  # デザインとレスポンシブ設定
└── script.js                  # 描画、スクロール演出、モーダル
```

## 内容を編集する

### プロフィール・サービス・連絡先

`index.html` 内の本文とメールアドレスを編集します。メールアドレスはヘッダー、CONTACTセクションの2箇所にあります。

### 制作実績

`data/projects.js` の `window.PROJECTS` を編集します。配列の順番が一覧の表示順です。

```js
{
  id: "project-slug",
  title: "PROJECT TITLE",
  thumbnail: "./assets/project-image.png",
  imageAlt: "作品画像の説明",
  category: "CATEGORY / TYPE",
  technologies: ["Figma", "HTML", "CSS", "JavaScript"],
  role: "担当範囲",
  description: "作品の説明",
  url: "https://example.com/",
  year: "2026",
  featured: true,
}
```

- `featured: true` の先頭3件はファーストビュー内のギャラリーにも表示されます。
- 公開URLがないコンセプト作品は `url: ""` と `isConcept: true` を指定します。
- `imageAlt` はモーダルで表示する画像の内容が分かる文章にします。

## ヒーロービジュアル

`assets/hero-gallery.png` はこのポートフォリオ用に生成したオリジナル画像です。

生成プロンプトの要旨：夜の静かなデジタルギャラリー、星空へ続く建築空間、暖色に光る展示パネル、左側に見出し用の暗い余白。人物、文字、ロゴ、既存ブランド素材を含めない。

## 公開前チェック

- メールアドレスと各作品URLが正しい
- 掲載画像・文章の公開権限に問題がない
- 実機でPC／スマートフォン表示を確認した
- モーダル、メニュー、モーション停止が操作できる
- ブラウザの開発者ツールにエラーが出ていない
