# 大宜味村社会福祉協議会 公式サイト

## プロジェクト概要
- 社会福祉法人 大宜味村社会福祉協議会の公式サイト
- ドメイン：oogimishakyo.or.jp
- GitHub Pages でホスティング（リポジトリ：oogimishakyo/oogimishakyo.github.io）
- 参考サイト：伊賀市社会福祉協議会（https://www.hanzou.or.jp/）

## 技術構成
- HTML / CSS / JavaScript のみ（フレームワーク不使用）
- スマホ対応（レスポンシブ）
- お知らせは `data/news.json` で管理
- 村の人口データは `data/village.json` で管理

## 連絡先・基本情報
- 住所：〒905-1306 沖縄県国頭郡大宜味村字大宜味１番地
- TEL：0980-44-3800
- 受付時間：平日 9:00〜17:15
- メール：info@oogimishakyo.or.jp
- 寄付URL：https://syncable.biz/associate/oogimishakyo/donate
- 会員URL：https://syncable.biz/associate/oogimishakyo/donate/membership

## デザイン方針
- メインカラー：緑（#2d7a4f）
- 伊賀市社協のデザイン・構成をベースにする
- 大宜味村らしさ（長寿の村・共同店ネットワーク）を前面に出す

## フォルダ構成
```
/
├── index.html
├── css/        スタイルシート
├── js/         JavaScript
├── data/       JSONデータ
└── images/     画像ファイル
```

## 今後作るページ
- `service.html`  ：サービス案内ページ
- `news.html`     ：お知らせ一覧ページ
- `about.html`    ：社協についてページ
- `contact.html`  ：お問い合わせページ

## GitHubへの反映方法
```bash
git add .
git commit -m "更新内容"
git push
```
