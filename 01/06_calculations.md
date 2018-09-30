# 06. Calculations (in Japanese)

JavaScriptで四則演算．基本は他の言語と同じなので，適宜メモを取る感じで．

## 学習メモ

### 指数の表記

1.5x10^20を`1.5e+20`と入力できる．

### 文字列

シングルクオート' 'で囲うと文字列として扱える．

文字列表記内で，エスケープシーケンスを扱う場合は，対象の記号の直前に\を記述する．<br>
Macの場合は¥では有効にならないので，\を正しく入力する．

### 算術演算子

- 足し算 `+`
- 引き算 `-`
- 掛け算 `*`
- 割り算 `/`
- 余剰 `%`

### プロジェクトフォルダ

以後，JavaScriptの文法を学習する際に作成したものは`./js-grammer/`フォルダに置く．

### 変数

ここからは，`calc.js`と`js-calc.html`ファイルを作成して，プログラムを記述していく．

#### 準備

1. `js-calc.html`で，`html:5`補完 > `lang=ja`へ書き換え > `body`タグ内で`script:src`補完 > `src="calc.js"`を入力
2. `calc.js`内で以下のコードを記述

```javascript:calc.js
(function(){
    'use strict';

})();
```

- `'use strict';` 宣言後の記述ミスをエラーとして表示させる機能を呼び出すための記述
- `(function(){ ... })();`は，{}で囲まれた部分に`use strict`のスコープを制限するために記述

3. Chromeの　デベロッパーツール　>　Consoleタブ　を開き，エラーがあるか確認

`ERR_FILE_NOT_FOUND`のエラーメッセージが表示された場合，ファイルパスが正しく指定できていない．

#### 数値をブラウザ画面上に表示

```javascript:calc.js
(function(){
    'use strict';
    var x = 10;  // 変数xに代入
    document.write(x);  // xをブラウザ画面上に出力
})();
```

#### 文字列をブラウザ画面上に表示

```javascript:calc.js
(function(){
    'use strict';
    // 中略
    var y = '<p>JavaScript の変数</p>';
    document.write(y)
})();
```

#### 計算問題の結果をブラウザ画面上に表示

```javascript:calc.js
(function(){
    'use strict';
    // 中略
    var a = 34;
    var b = -0.25 * a + 14.1;
    document.write(b);
})();
```

`5.6`が表示されていればOK

#### 定数型

JavaScriptは，基本的にブロックスコープは無いが，次のように型を指定すれば擬似的にスコープを指定可能．

- **一度しか代入できない変数**を宣言する場合 `const`型
- **{}の範囲内でしか使えない変数** を宣言する場合 `let`型

を使用する．

例:<br>

```javascript:calc.js
(function(){
    'use strict';
    const a = 34;
    a = 2;
})();
```

`Uncaught TypeError: Assignment to constant variable.`がエラーログに出力される．

`const`を`let`に変えるとエラーが消えることも確認できる．

### コメント

- 一行の場合 `// ${コメントしたい内容}`
- 複数行に渡る場合 `/* ${複数行にわたりコメントしたい内容} */`

### 手続き型プログラミング言語

JavaScriptのように，上から順番にコードを実行していくような言語

## 練習問題

半径`12`cmの円の面積[cm^2]をHTMLに出力するプログラムを作成せよ．<br>
ただし，円周率は`3.14`とする．

### 答案

- `./js-grammer/06-practice.html`
- `./js-grammer/06-practice.js`

にある．

解答: <br>
`452.16`

### 模範解答との比較

考え方に相違ない．正解

#### 補足

計算時に`3.14`を先頭におくと,`452.159999...`という結果が表示される．<br>
これは，小数点同士の掛け算を3回行うことになり，浮動小数点演算の誤差が大きくなるためである．