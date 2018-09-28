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