# 08. Loops (in Japanese)

JavaScriptでループ処理．基本的な考え方は他のプログラミング言語と一緒なので，練習問題のみ解く．

## 練習

JavaScriptでFizzBuzzを記述せよ．

### 答案

`./js-grammar/08-practice.html`<br>
`./js-grammar/08-practice.js`

にある．

コード内容:

```javascript
(function () {
    'use strict';

    for (var i = 1; i < 100001; i++) {
        if (i % 15 === 0) {
            document.write('FizzBuzz ');
        } else if (i % 5 === 0) {
            document.write('Buzz ');
        } else if (i % 3 === 0) {
            document.write('Fizz ');
        } else {
            document.write(i + ' ');
        }
    }
```

または， [`||`は必ずしもBoolean型を返すわけではなく，2つのオペランドのうち1つの値を返す](http://www.ecma-international.org/ecma-262/6.0/#sec-binary-logical-operators) という性質を利用して，次の様に記述しても良い．

```javascript
for (var i = 1; i < 10001; i++) {
    document.write(((i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz') || i ) + ' ');
}
```

for文の`{}`を除いてワンライナーで記述することもできる．

```javascript
for (var i = 1; i < 10001; i++) document.write(((i % 3 ? '' : 'Fizz ') + (i % 5 ? '' : 'Buzz ') || i) + ' ');
```

### 模範解答との比較．

考え方に相違ない．正解．