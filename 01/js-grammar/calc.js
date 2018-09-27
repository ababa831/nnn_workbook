(function () {
    'use strict';
    var x = 10;
    document.write(x);

    var y = '<p>JavaScript の変数</p>';
    document.write(y)

    var a = 34;
    var b = -0.25 * a + 14.1;
    document.write(b);

    let c = 22;
    c = 2;
    document.write(`<p>${c}</p>`);

    // このコードは三角形の面積を求めるプログラムです．
    var w = 3;  // 三角形の頂点
    var h = 10;  // 三角形の高さ
    var area = w * h / 2;  // 三角形の面積の公式「（底辺）×（高さ）÷2」を使って計算し、areaという名前の変数に代入する
    document.write(area)  // 面積を出力する

})();