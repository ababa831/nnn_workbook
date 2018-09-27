# 07. Operators (in Japanese)

JavaScriptで比較演算子，論理演算子を扱う．他プログラミング言語と基本は同じなので，必要に応じてメモする．

## 学習メモ

### 論理とは？

言葉の曖昧さをなくすための道具．

人が使う言葉では，曖昧な論理で表現しても，質問すれば解消する．<br>
しかし，プログラムを書いた人に曖昧な論理を，何度も質問するわけにはいかない．

従って，プログラムは厳密な論理で記述しなければならない．本節は，その論理をJavaScriptで扱う方法を学ぶ


### 比較演算子

２つの値が等しいか否かを判定する比較演算子に関して，JavaScriptは **strict(厳密)** と **abstruct(抽象的)** な定義がある．

[参考](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)

- 厳密に等しい `===`
- 等しい `==`
- 厳密には等しくない `!==`
- 等しくない `!=`

TODO: 詳しい使い分けを調査する

### 値が無い場合の代入方法

`var x = null`で指定する．`None`ではない．

### 論理演算子

<table>
    <tr>
        <th>名称</th>
        <th>演算子</th>
    </tr>
    <tr>
        <td>否定(NOT)</td>
        <td>!</td>
    </tr>
    <tr>
        <td>論理和(OR)</td>
        <td>||</td>
    </tr>
    <tr>
        <td>論理積</td>
        <td>&&</td>
    </tr>
</table>

否定は，次のように値の直前に付けることができる．（勿論，変数に代入してから判定可能）

```javascript
!true;  // false
false || !(false && true);  // Aまたは　BかつCでない
```

## 練習問題

年齢と性別によって，チケットの値段を教えてくれるプログラムを記述せよ．ただし，15歳以下かつ女性の場合は値段を`800`円とする．

<table>
    <tr>
        <th>年齢・性別</th>
        <th>チケットの値段</th>
    </tr>
    <tr>
        <td>15歳以下</td>
        <td>800円</td>
    </tr>
    <tr>
        <td>女性</td>
        <td>1000円</td>
    </tr>
    <tr>
        <td>それ以外</td>
        <td>1800円</td>
    </tr>
</table>

### 答案

`./js-grammar/07-practice.html`<br>
`./js-grammar/07-practice.js`<br>
にある．

コード内容:

```javascript
(function () {
    'use strict';

    var age = 16;
    var sex = 'female';
    var ticketPrice = null;
    if (age <= 15) {
        ticketPrice = 800;
    } else if (sex === 'female') {
        ticketPrice = 1000;
    } else {
        ticketPrice = 1800;
    }
    document.write(`チケットの価格は ${ticketPrice} 円です．`)
    
})();
```

### 模範解答との比較

コードは若干異なるが，考え方に相違ない．正解．

`isFemale`で，bool値を判定する変数を用意しても良い．