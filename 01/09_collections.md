# 09. Collections (in Japanese)

JavaScriptでコレクション．必要に応じてメモする．

## 学習メモ

### コレクション

(値などの)要素の集まり.

例: 配列

JavaScriptで配列は **Array**(アレイ)と呼ぶ．

#### 配列の代入

```javascript
var characters = ['A', 'B', 'C', 'D'];
var numbers = [234, 222, 344, 129]; 
var mixedArray = [234, 'A', 344, 'C'];  // 数値と文字列の混合も可能
```

範囲外のインデックスを指定した場合は

```javascript
>> console.log(numbers[10]);
undefined
```

という値が返される．


### 配列長の取得

`<配列名>.length`で取得できる．

```javascript
>> console.log(numbers.length);
4
```

### 要素の追加

`<配列名>.push(<追加したい値>)`で取得できる．

```javascript
>> var a = [];
>> console.log(a);
[]

>> a.push('X');
>> console.log(a);
["X"]
```

## 練習問題

`'あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ'`<br>
のうち，2つを組み合わせる．全ての文字列の種類をHTMLに出力せよ．ただし，同じ文字の重複を許す．

### 答案

`./js-grammar/09-collection.html`<br>
`./js-grammar/09-collection.js`

にある．

コード内容:

```javascript
(function () {
    'use strict';

    var hiragana = ['あ', 'い', 'う', 'え', 'お',
        'か', 'き', 'く', 'け', 'こ'];

    for (var i = 0; i < hiragana.length; i++) {
        for (var j = 0; j < hiragana.length; j++) {
            document.write(`<p>${hiragana[i] + hiragana[j]}</p>`);
        }
    }
})();
```

### 模範解答との比較

考え方に相違ない．正解．

## 感想

for文のイラストがとてもわかりやすい！