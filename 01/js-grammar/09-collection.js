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