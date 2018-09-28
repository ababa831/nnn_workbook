# 10. Functions (in Japanese)

JavaScriptで関数を扱う．必要に応じてメモする．

## 学習メモ

### 関数の定義方法

```javascript
function 関数名(引数){
    // 処理内容
    return 戻り値  // 必要に応じて値を返す．
}
```

例:<br>

```javascript
function logDate() {
    console.log(new Date());
}
```

Q. `new`を付けても付けなくても現在時刻を正しく返すけど，`new`の役割は何？

A. new演算子により関数のインスタンスを生成している？<br>
TODO: あとでちゃんと調べる.([参考](http://taiju.hatenablog.com/entry/20090706/1246840565))

例えば，

```javascript
var date1 = new Date()
```

のように代入すると,

```javascript
>> date1
"object"
```

関数のオブジェクト（インスタンス？）が生成される．

ところが，`new`演算子を指定しない場合は，

```javascript
var date2 = Date()
>> date2
"string"
```

`Date`関数の戻り値として(ここでは現在時刻を表示した)文字列が`date2`に代入されている．

従って，次のような関数を作る場合，

```javascript
function takashi() {
    this.height = 170;
    this.weight = 65;
}
```

次の処理は，`new`を付けないと，`undefined`が戻り値として返され，エラーが出る．

```javascript
var takashiStatus = new takashi();
console.log(`たかしの身長：${takashiStatus.height}，体重:${takashiStatus.weight}`)
```

### `p`タグに`id`属性を付与する理由

```html
<body>
    <p id="birth-time"></p>
    <script src="function.js"></script>
</body>
```

のように，`p`タグの`id`属性に値を代入する場合がある．特定の`p`タグに専用の名前を付けることで，`JavaScript`のプログラムから，このタグを参照したり，値を書き換えたりすることができる．

### 生まれてからの経過時刻をリアルタイムで表示する

テキストから抜粋:

```javascript
(function () {
    'use strict';
    var myBirthTime = new Date(1982, 11, 17, 12, 30);
    function updateParagraph() {
        var now = new Date();
        var seconds = (now.getTime() - myBirthTime.getTime()) / 1000;
        document.getElementById('birth_time').innerText = '生まれてから' + seconds + '秒経過．';
    }
    setInterval(updateParagraph, 50);
})();
```

解説:<br>
- `getTime()`は **ミリ秒**単位でインスタンスの時刻を取得する関数．
    - `1000`で割る理由は，`ms`から`s`へ単位を変換するため．
- `getElementById('birth-time')`で`p`タグの`id`を抽出
    - 更に，`.innerText`で`p`タグのテキスト(中身)を設定(代入)することができる．
- `setInterval(updateParagraph, 50)`で，`updateParagraph`関数を`50ms`のスリープを取って実行する　ことを指定できる．

## 練習問題

半径`5, 10, 15`cmの円の面積をHTMLに出力せよ．ただし，円周率は`3.14`とする．

### 答案

`./js-grammer/10-practice.html`<br>
`./js-grammer/10-practice.js`

コード内容:

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>10節の練習問題</title>
</head>
<body>
    <p id="circle-area-5"></p>
    <p id="circle-area-10"></p>
    <p id="circle-area-15"></p>
    <script src="10-practice.js"></script>
</body>
</html>
```

```javascript
(function () {
    'use strict';

    const circleRatio = 3.14
    function calcArea(radius) {
        return radius * radius * circleRatio;
    }

    var radiusArray = [5, 10, 15];
    for (var i = 0; i < radiusArray.length; i++) {
        var tmpRadius = radiusArray[i];
        document.getElementById(`circle-area-${tmpRadius}`).innerText
            = `半径${tmpRadius}の面積は${calcArea(tmpRadius)}cm^2です．`;
    }

})();
```

### 模範解答との比較

正解．模範解答では，単純に`document.write()`を三回利用して3種類の円の面積を表示させている．自分は，テキストで学んだ機能をつかって見たかったので，少し工夫を加えたコードを記述した．

## 感想

Pythonに慣れていると，ついつい型を付けるのを忘れてしまうw．