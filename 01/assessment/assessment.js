(function () {
    'use srtict';

    // HTML側　各種タグのid属性に対応している．
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /** 
    * 指定した要素の子供を全て削除
    * @param {HTMLElement} element HTMLの要素
    */
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    // Enter押したら診断できるようにする
    userNameInput.onkeydown = (event) => {
        if (event.key == 'Enter') {
            assessmentButton.onclick();
        }
    }

    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        // 名前がからの場合は処理を終了
        if (userName.length === 0) {
            return;
        }


        // 結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        // ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefVal = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('あなたのいいところ')
            + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefVal);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #あなたのいいところ';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    }

    // 診断結果のパターン
    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています'
    ];

    /*
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザの名前
     * @return {string} 診断結果
    */
    function assessment(userName) {
        // 全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;  // なぜcharのcだけ先頭小文字？
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        /* 文字のコード番号の合計を回答の数で割って添字の数値を求める
         * 割るというか余剰を求める．
         * (回答長で割ることでそれぞれの名前に対して0~回答長の添字を独立に付けられる仕組み．)
        */
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        /* {}内のuserName部分に対して，第二引数userNameの中身に置き換える．
         * バックスラッシュでエスケープシーケンス指定-> {}はマッチングで無視される．
         * gはグローバルサーチ．-> 指定した正規表現にマッチする全ての文字列(u~eの範囲)を指す．
        */
        result = result.replace(/\{userName\}/g, userName);
        return result;
    }

    // 単体テスト
    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同一の名前なら，同じ診断結果を出力する処理が正しくありません．'
    );

})();