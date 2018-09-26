# First time JaveScript (in Japanese)

はじめてのJavaScript

## 学習メモ

### JavaScript (JS)とは

- Webブラウザ上で実行されるプログラミング言語．
- Node.jsというプラットフォームのおかげて，応用範囲ひろがる．
    - Webブラウザ外でも利用できる．
- Javaと名前が似ているが， **メロン** と **メロンパン** くらい別物

#### JavaScriptのバージョン

- ECMAScript5 (これまで) 
- ECMAScript2015 (ES6, 最近普及しつつある)
    - 当然，ES6でしか利用できないブラウザ，機能がある
    - 因みにChromeは対応している．
- ES2016, 2017, 2018も当然ある

ECMA(エクマ) Internationalという団体が標準化

本テキストはES6を扱っている．

### HTML内にJavaScriptを書いてみる

1. `html:5`テンプレート -> langを`ja`に変える
2. `body`タグ内で`script`と打ち込み，`Tab`キーを押す．
3. 出現した`<script></script>`内にJavaScriptを書き込む

```
document.write('<h1>JavaScript を学ぼう</h1>');
```

ブラウザで開くと，`h1`見出しで↑の文字列が表示されている．

### JavaScriotを別ファイルにする

上項で作成したJavaScriptのコードを`.js`ファイルに切り分けても同様のコンテンツを作成できる．<br>
ファイルを切り分けることで，内容の読みやすさがアップ！

1. `.js`ファイルを，上項で作成したHTMLファイルと同一フォルダに作成
2. `.js`ファイルに，`document.write('<h1>JavaScript を学ぼう</h1>');`のみを記述して保存
3. HTMLファイル内の，`script`タグに，`src="hoge.js"`属性を追加
    - はじめから`src`属性を付けたい場合は，`script`入力時に補完候補`script:src`を選択すれば，該当のテンプレートが出る

### エラーについて

JavaScriptで記述したWebページが上手く動作しないとき，Chromeブラウザの　デベロッパーツール　>　consoleタブ　を開くとエラーメッセージが表示される．必要に応じて，表示されたエラーメッセージに従いコードを修正すべし．

## 練習問題

