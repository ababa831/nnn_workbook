# 13. Programming in css (in Japanese)

CSSとJavaScriptを使って，エフェクト付きのWebページを作る．

## 学習メモ

### CSSの適用

`h1`タグに`class`属性を付加し，`"face"`を代入する．<br>

`<h1 id="header" class="face">CSS を使ったプログラミング</h1>`

#### `class`属性とは?<br>

HTMLを分類(classify)する機能．

特定の`class`(ここでいう`face`)に対して，CSSで見た目を指定できる．<br>
`face`クラスがつけられた全ての要素（タグ）にこのスタイルが適用される．

ここでは，上の`h1タグ`にクラスが付与されて，`face`クラスのプロパティ設定が反映される．

クラス名はこちらが任意に設定する．

#### CSSファイル側の設定

次のように，`face`クラスに対するスタイルシートを設定する．

```css
.face {
    color: darkblue;
}
```

これで，上の`h1`タグは，`color`プロパティが`darkblue`をとり，文字色が濃青となる．

\*当然であるが，`class="face`と指定していないタグは，`face`クラスのスタイルが適用されない．

### 文字を回転させてみる

```javascript
(function () {
    'use strict';
    
    var header = document.getElementById('header');
    // 文字を60度回転させる
    header.style.transform = 'rotateX(60deg)';
})();
```

`header.style`でスタイルのオブジェクトを選び，そこにプロパティ値(ここでは`transform`)を代入することで，CSSを直接変更できる．

### アニメーションさせてみる

テキストのコードを改変して，オブジェクトに纏めたものを実行したがうまくいかない．

```javascript
(function () {
    'use strict';

    var animeSetting = {
        header: document.getElementById('header'),
        deg: 0,
        rotateHeader: function () {
            this.deg = this.deg + 6;
            this.header.style.transform = `rotateX(${deg}deg)`;
        }
    }

    // 文字を20msごとに6度回転させる
    setInterval(animeSetting.rotateHeader, 20);
})();
```

次のように．`this.deg`を`animeSetting.deg`に変更したら動くようになった．<br>

```javascript
var animeSetting = {
// 中略
rotateHeader: function () {
    animeSetting.deg = animeSetting.deg + 6;
    this.header.style.transform = `rotateX(${animeSetting.deg}deg)`;
}
};
```

何故？`this`が`rotateHeader`プロパティ（関数）を指してしまっているから？<br>
`this`の意味がいまいち理解できない．

何れにせよ，値の指定先はしっかり明示したほうが良さそう．

### 色が変わるアニメーションを作成

1. `css`ファイルに`back`プロパティを作成する

```css
/*中略*/
.back {
    color: lightgray;
}
```

2. `js`ファイルに，回転して裏を向いた際に`class`を`face`から`back`に変更するコードを書く．

```javascript
(function () {
    'use strict';

    var animeSetting = {
        header: document.getElementById('header'),
        deg: 0,
        degDiff: 6,
        // 文字を回転させる．
        rotateHeader: function () {
            animeSetting.deg = animeSetting.deg + animeSetting.degDiff;
            animeSetting.deg = animeSetting.deg % 360;
            animeSetting.changeStyleClass(animeSetting.deg);
            animeSetting.header.style.transform = `rotateX(${animeSetting.deg}deg)`;
        },
        // 文字が裏返ったときにclassを'face' -> 'back'へ変更(文字色を変更)
        changeStyleClass: function (deg) {
            if ((0 <= deg && deg < 90) || (270 < deg && deg < 360)) {
                animeSetting.header.className = 'face';
            } else {
                animeSetting.header.className = 'back';
            }
        }
    };

    // 文字を20msごとに回転させる
    setInterval(animeSetting.rotateHeader, 20);
})();
```

## 練習問題

上で作成した回転する見出しを改変する．裏表関係なく文字色を`red`にして，裏側を向いているときに透明度`opacity`が`0.4`になるようにプログラムを記述せよ．

### 答案

`./css-study/css-programming.css`<br>
`./css-study/css-programming.html`<br>
`./css-study/animation.js`

にある．

#### 改変した部分

`css`ファイルの`face`, `back`クラスの`color`プロパティ値をともに`red`に変更．

```css
.face {
    color: red;
}
.back {
    color: red;
    opacity: 0.4;
}
```

### 模範解答との比較

考え方に相違ない．正解．