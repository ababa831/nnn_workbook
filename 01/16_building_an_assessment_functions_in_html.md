# 16. Building an assessment functions in HTML (in Japanese)

診断結果を表示する部分を実装する．

## 学習メモ

### 実装の流れ (再掲)

1. `html`, `css`, `js`ファイルと雛形を作成する．
2. モックアップで作成した要素(見た目, **UI** )をHTMLに記述する．
3. CSSでスタイルを設定する．
4. 名前の入力と結果を返す部分をJavaScriptで作成する．
5. 実装したJavaScriptのテストコードを書いて，動作を検証する．
6. 診断結果表示部分のHTMLを作成する．(今回はここから)


### [手順 6] 診断結果表示部分のHTMLを作成

1. `div`タグでJavaScriptやCSSから呼び出せるようにする
2. JavaScriptでボタンクリック -> 入力名の受け取り -> 診断結果表示 部分を実装する

#### divタグ

`div`: divided(分割されたもの)
- 意味は持たない
- JavaScriptやCSSから利用するときに，マークアップする用途で用いる

例:<br>
`<div id="result-area"></div>`のように記述する．

#### 無名関数とアロー関数

今までは関数を作成するとき，

```javascript
function() hoge() {
    return 'hage'
}
```

のように，関数名を定義していた．

しかし，次のように関数名を付けない **無名関数**として記述することも可能．

```javascript
fuge = function() {
    return 'hage'
}
```

更に，`function()`の`function`部分を取っ払って，`()`と`{`の間に `=>`を付加することで，より簡単に　**アロー関数** として記述可能．これは，ES6以降の機能．

```javascript
fuge = () => {
    return 'hage'
}
```

#### ガード句

関数中などに，ある特定の条件で処理を終了させることを **ガード句**と呼ぶ．JavaScriptでは`return;`を返す，

ネストを深くすることを避けるため，`if`~`else`より`if`文のみでガード句を記述する．

#### div要素に診断結果を追加

診断結果を表示するコードを書く．

1. 見出し`h3`タグを作る
2. 見出しのテキスト内容を代入する
3. `html`側で作成した`div`タグ(`id="result-area"`)に`h3`タグを追加する．

4. 結果本文`p`タグを作る
5. `assessment`関数による診断結果を受け取る
6. 診断結果を`div`タグに追加する．(`div`タグでは，同一`id`のところに作成したタグを追加できるのね)

```javascript
// 中略
// 結果表示エリアの作成
const header = document.createElement('h3');
header.innerText = '診断結果';
resultDivided.appendChild(header);

const paragraph = document.createElement('p');
const result = assessment(userName);
paragraph.innerText = result;
resultDivided.appendChild(paragraph);
```

#### 診断結果が連続して追加されないようにする

```javascript
//抜粋
/* 
* 結果表示がどんどん追加されないようにする．
* divタグの子供要素(入れ子のタグ)がある限り，子供の値を削除.
*/
while (resultDivided.firstChild) { 
    resultDivided.removeChild(resultDivided.firstChild);
}
```

この部分を関数として実装して利用すれば良い．

#### JavaScriptの論理評価

JavaScriptで`true`にならない値
- `false`
- `null`
- `undefined`
- `''`(空文字)
- `0`(数値のゼロ)
- `NaN`

また，論理評価において<br>
- `if`や`while`で`true`になる値　-> truthyな値 
- falseになる値 -> faisyな値 

と呼ぶ．

## 練習問題

ツイートエリアの子供要素も削除できるように実装せよ．

### 答案

`./assessment/assessment.js`にある．

#### コード内容

既に子供要素を削除する関数`removeAllChildren`が実装されているので，この引数に`div id="tweet-area"`タグからの取得値`tweetDivided`を与えれば良い．

従って，次の様にコードを追加する．

```javascript
// ツイートエリアの子供削除
removeAllChildren(tweetDivided);
```

### 模範解答との比較

考え方に相違ない．正解．
