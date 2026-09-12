/**
 * ポートフォリオに掲載する制作実績データ。
 * 並び順がそのまま一覧の表示順になります。
 */
window.PROJECTS = [
  {
    id: "lumina-cosmetics",
    title: "LUMINA COSMETICS",
    thumbnail: "./assets/lumina-cosmetics-lp.png",
    imageAlt: "LUMINA COSMETICS 化粧品OEM・ODMサイトのページデザイン",
    category: "BEAUTY / LANDING PAGE",
    technologies: ["Figma", "HTML", "SCSS", "JavaScript"],
    role: "デザイン / コーディング / レスポンシブ対応",
    description:
      "化粧品ブランドの世界観とOEM・ODMサービスの信頼性が伝わるよう設計したランディングページです。余白を活かした上品な構成と、情報を迷わず追える視線設計を意識しました。",
    url: "https://ryuusei-works.github.io/lumina-cosmetics/",
    year: "2025",
    featured: true,
  },
  {
    id: "nova-gym",
    title: "PERSONAL GYM NOVA",
    thumbnail: "./assets/nova-gym-lp.png",
    imageAlt: "PERSONAL GYM NOVA 秋の入会キャンペーンサイトのページデザイン",
    category: "FITNESS / CAMPAIGN LP",
    technologies: ["Figma", "HTML", "SCSS", "JavaScript"],
    role: "デザイン / コーディング / レスポンシブ対応",
    description:
      "季節限定キャンペーンの魅力を力強く伝えるパーソナルジムのランディングページです。大胆なタイポグラフィと明確な導線で、行動につながるテンポをつくりました。",
    url: "https://ryuusei-works.github.io/nova-gym/",
    year: "2025",
    featured: true,
  },
  {
    id: "nexbridge-recruit",
    title: "NEXBRIDGE RECRUIT",
    thumbnail: "./assets/nexbridge-recruit-lp.png",
    imageAlt: "NEXBRIDGE RECRUIT 採用サイトのページデザイン",
    category: "RECRUIT / CORPORATE SITE",
    technologies: ["Figma", "HTML", "SCSS", "JavaScript"],
    role: "情報設計 / デザイン / フロントエンド実装",
    description:
      "企業の未来と働く人の姿をまっすぐに届ける採用サイトです。求職者が情報を理解しやすい構成と、前向きな空気を感じるビジュアル表現を両立しました。",
    url: "https://ryuusei-works.github.io/nextbridge-saiyo/",
    year: "2026",
    featured: true,
  },
  {
    id: "sound-base-osaka",
    title: "SOUND BASE OSAKA",
    thumbnail: "./assets/sound-base-osaka-lp.png",
    imageAlt: "SOUND BASE OSAKA 音楽スタジオサイトのページデザイン",
    category: "MUSIC / WEB SITE",
    technologies: ["Figma", "HTML", "SCSS", "JavaScript"],
    role: "サイト設計 / ビジュアルデザイン / 実装",
    description:
      "音楽が生まれる現場の熱量を、写真とリズムのあるレイアウトで表現したスタジオサイトです。施設情報から予約まで、スマートフォンでも快適に辿れる設計です。",
    url: "https://ryuusei-works.github.io/live-house/",
    year: "2026",
  },
  {
    id: "atelier-hotel",
    title: "ATELIER HOTEL",
    thumbnail: "./assets/atelier-hotel-preview.svg",
    imageAlt: "ATELIER HOTELのコンセプトサイトデザイン",
    category: "HOTEL / BRAND SITE",
    technologies: ["Figma", "HTML", "CSS", "JavaScript"],
    role: "ブランド設計 / UIデザイン / コーディング",
    description:
      "静かな滞在体験をテーマにしたホテルサイトのコンセプトワークです。深いグリーンと余白を用い、上質さと予約までの分かりやすさを両立しています。",
    url: "",
    year: "2026",
    isConcept: true,
  },
  {
    id: "mono-architecture",
    title: "MONO ARCHITECTS",
    thumbnail: "./assets/mono-architecture-preview.svg",
    imageAlt: "MONO ARCHITECTSのコンセプトサイトデザイン",
    category: "ARCHITECTURE / WEB SITE",
    technologies: ["Figma", "HTML", "CSS", "JavaScript"],
    role: "アートディレクション / UIデザイン / 実装",
    description:
      "建築作品そのものが主役になる、ミニマルなコーポレートサイトのコンセプトワークです。鮮やかなブルーをアクセントに、写真と情報の緊張感を整えました。",
    url: "",
    year: "2026",
    isConcept: true,
  },
];

// 旧実装で参照していた名前も維持します。
window.WORKS = window.PROJECTS;
