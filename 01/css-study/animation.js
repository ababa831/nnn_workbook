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