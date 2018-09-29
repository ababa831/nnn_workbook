# 12. First time CSS (in Japanese)

CSSを学ぶ．

## 学習メモ

### CSSとは

Cascading Style Sheets
    - Cascading: 階段状の滝のような，連鎖的に伝わる
    - Style: HTML(body)上で表現されるスタイル
    - Sheet: シート

つまり，HTMLで表現される複数のスタイルが，段階的に引き継がれながら適用されるような概念の言語．

HTMLの見栄えを変えることができる．

![CSSの概念図](http://www.htmq.com/csskihon/images/006_01.png)

[引用元](http://www.htmq.com/csskihon/006.shtml)

### CSSを書いてみよう

下のコードのように，`head`内で`style`タグを作成し，その中に **セレクタ** と呼ばれる　**デザインを適用する要素**を設定する．<br>
更に，セレクタの{}内に，具体的なデザインを設定する．

```HTML
<head>
    <!-- 中略 -->
    <style>
        body{
            background-color: lightblue;
        }
    </style>
</head>
```

設定は`プロパティ: 値;`で設定する．JavaScriptのオブジェクトと似た記述方法(`,`でなく`;`を置く点が異なる．)

### CSSを別ファイルに使用．

JavaScriptを学んだ際,`html`と`js`ファイルを分離して，機能分離（ソース変更時の影響を下げる意味）と見通しを良くすることができた．

CSSも同様の考えで，別途`css`ファイルを用意する．

方法:<br>
1. `style`タグまるごと消す．
2. `link:css`を入力して`Tab`キーでコード補完．
3. `href`属性にcssファイル名を指定する．

### CSSをもっと使ってみよう

テーブルのスタイルを設定する．
`table, td, th` を連続で指定することで，これらの要素に対して{}内のスタイルを適用する．

`border`プロパティ<br>
- `double` 二重線
- `dash` 破線
- `dotted` 点線

### CSSのプロパティを調べる(検証を使う)

1. 作成したHTML上で右クリック > 検証 を選択
2. 要素を調べるボタンを押す
3. 調べたい対象(例 表の部分)を選択する．

cssのプロパティ(コード)が表示される．<br>
プロパティの値が適用されているか，も確認できる．

```css
table {
    display: table;
    border-collapse: separate;
    border-spacing: 2px;
    border-color: grey;  /*ここに取り消し線 > 適用されていない*/
}
```

### いい感じのスタイルを適用したい場合

[こういう](https://saruwakakun.com/html-css/reference/h-design)テンプレサイトを上手く活用すると，洗練されたデザインのWebページを作成できる．

## 練習問題

自己紹介サイトで，表の文字色を`darkblue`に変更せよ．

### 答案

`./css-study/self-introduction.html`<br>
`./css-study/self-introduction.css`

にある．

#### コード内容

```css
body{
    background-color: lightblue;
}
table, td, th {
    border: double 3px gray;  /*borderの太さはあえてテキストとは別設定*/
    background-color: white;
    color: darkblue;
}
h3:first-letter {
    font-size: 1.618em;  /*相対値 1em=100%*/
}
```

#### 工夫した点

見た目がショボいので，次の変更を加えた．
- `h3`先頭文字を大きくして，カッコつけた．
    - `font-size`プロパティは黄金比にしてみたら良く見えるかもしれないと思い，値を`1.618em`に設定

### 模範解答との比較

考え方に相違ない．正解．

## 感想

これで，漸く白背景の殺風景な自己紹介ページから離脱できた><