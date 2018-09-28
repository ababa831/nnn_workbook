# 11. Objects (in Japanese)

オブジェクトについて学ぶ．

## 学習メモ

### オブジェクトとは

JavaScriptの型の一つ．プロパティ(**名前**，**値**のセットを複数保有できるもの)を持つ．

```javascript
var teamMember = {
    name: 'たかし',
    age: 23
};
```

この例では，`name`と`age`がプロパティ名であり，`'たかし'`と`23`が値．<br>
{}内は文の途中であるから，`;`は付けない．

因みに，次のような書き方もあり，便利になるケースが今後出てくるとのこと．

```javascript
var age = 23
var student = {
    name: 'たかし',
    age
};
```

### モデル

上記のオブジェクトを作る例のように，現実世界のなにかを単純化して表現したものを **モデル** と呼び，単純化することを **モデリング**と呼ぶ．<br>
つまり，JavaScriptはオブジェクトを使ってモデリングする．

### オブジェクトのプロパティ

プロパティは値を取得することが可能．

例: 

```javascript
var teamMember = {
    name: 'たかし',
    age: 23
};
teamMember.age = 10;
console.log(teamMember.age);
```

オブジェクト内に関数を設定も可能．値の部分を無名関数的？に記述する．<br>
(プロパティに変数と関数を定義できるのであれば，クラスみたいな感じ？（素人並感想))

```javascript
var teamMember = {
    name: 'たかし',
    age: 23,
    print: function(){
        teamMember.age++;
        console.log(teamMember.age);
    }
};
teamMember.print();
teamMember.print();
teamMember.print();
```

Q.オブジェクト内であれば，`teamMember.age`を`age`とか`this.age`で指定できないの？<br>
A.

- `age`単体はできない（`Uncaught ReferenceError: age is not defined`）
- `this.age`でオブジェクト内の変数を指定可能．ただし，JavaScriptは非常に動的な言語だから，文脈によって`this`の指し示す先が変わるので注意．

[参考](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/this)




### 時間あてゲーム

詳細はテキストを参照．

#### 要件とは

要求を実現するために，プログラムがどんな機能を持つべきかを詳細に定義したもの．要件を定義することを要件定義という．

#### 使った関数とか

- `confirm('引数')` 引数で渡した文字列をダイアログに表示し，OKまたはキャンセルを選択できるようにする．
    - OKの場合は，戻り値が`true`
    - キャンセルの場合は，戻り値が`false`
- `document.body.onkeypress = stop;` html(document)のbody上で何らかのキーが押されたら，`stop`関数を実行する．
    - なぜ条件判定したものに，関数を代入するという表記をするのかが，JavaScript素人的には気持ち悪い．

## 練習問題

作成した時間あてゲームにおいて，`start`と`stop`の関数も`game`オブジェクトにまとめよ．

### 答案

時間あてゲームと同じフォルダにある．

コード内容:

```javascript
(function () {
    'use strict';
    var game = {
        startTime: null,
        displayArea: document.getElementById('display-area'),
        start: function () {
            game.startTime = new Date().getTime();  // ms
            document.body.onkeypress = this.stop;  // 左に〜のイベントが発生したら，右の関数が呼び出されるってなんか文の流れが気持ち悪い
            console.log('スタートしました');
        },
        stop: function () {
            var currentTime = new Date().getTime();
            var seconds = (currentTime - game.startTime) / 1000;
            if (9.5 <= seconds && seconds <= 10.5) {
                game.displayArea.innerText = `${seconds}秒でした．すごい！`;
            } else {
                game.displayArea.innerText = `${seconds}秒でした．残念・・・`;
            }
            console.log('ストップしました');
        }
    };

    if (confirm('OKを押して10秒だと思ったらなにかキーを押してください')) {
        game.start();
    }

})();
```

### 模範解答との比較

考え方に相違ない．正解．

## 感想

ゴチャっとした関数をオブジェクトにまとめることで，かなりコードがスッキリすることを体感．まさにクラスっぽく使えば．可読性の高いコードが実現できる感じなのかな？