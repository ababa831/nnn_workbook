# 17. Development of a tweet function (in Japanese)

貴方のいいところ診断に，ツイート機能を実装する．（最終回）

## 学習メモ

診断機能を実装したので，これをTwitterに共有できるようにする．

### Tweetボタンを作る方法

1. [Twetterボタン作成サイト]()にアクセス
2. `#あなたのいいところ`を入力
3. 矢印をクリック
4. 実行した後に出現する，`set customization options`をクリック
5. `Do you want to prefill the Tweet text?`(ツイートテキストに事前に何を入力したいですか？)という部分に`診断結果の文章`と入力．
6. `Update`を押す
7. `Copy code`ボタンを押して，埋め込み用`a`(アンカー)タグを取得
8. `assessment.html`ファイルのツイート用`div`タグの子供として挿入

### Tweetボタンをプログラムから扱う

上で貼り付けた`a`タグをプログラムで書く

```html
<a href="https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw" class="twitter-hashtag-button"
            data-text="診断結果の文章" data-show-count="false">Tweet #あなたのいいところ</a>
```

この内容を次の手順で実装する．

1. `a`タグを`document.createElement('a')`で作成
2. リンクを`hrefVal`として直接文字列で代入する
3. `setAttribute`関数で，`href`属性に`hrefVal`を付与する
4. `class`名を直接文字列で代入する
5. `setAttribute`関数で，`data-text`属性に文字列を付与する
6. `innerText`に`a`タグの中身(文字列)を代入する

上記手順で実装したコードは仮のものであり，順次改変していき最終的に診断結果をツイートできるようにする．

### ハッシュタグの設定

#### URIとは

Uniform Resource Identifier．**インターネット上などにある情報やサービスを一意に識別するためのデータ形式** (テキスト抜粋)

インターネット上の場所に限定したもの: **URL** (Uniform Resource Locator)

`a`タグの`href`属性で付与された文字列もURIである．

#### URIの各構成

- スキーム `https`の部分
- ホスト名 `twitter.com`の部分
- リソース名 `/intent/tweet`の部分
- クエリ `?`以降の部分
    - 半角英数字以外の文字(例 日本語)を含める場合は， **URIエンコード**を使う
        - 最近のブラウザは，半角英数字以外のクエリが含まれても正しく解釈してくれる
        - ブラウザ・環境によっては動作しないこともあるので，URIエンコードしておいたほうが安全

#### URIエンコード

URIのクエリに含められない文字を，`%`ではじまる16進数のの文字列で表現することで，含めても問題ない形式に変更できる方法のこと．

`%`を使うので **パーセントエンコーディング** とも呼ばれる．

JavaScriptでは，<br>
- `encodeURIComponent`関数でエンコード
- `decodeURIComponent`関数でデコード

できる．

例:

```javascript
> encodeURIComponent('たかし')
"%E3%81%9F%E3%81%8B%E3%81%97"
> decodeURIComponent('%E3%81%9F%E3%81%8B%E3%81%97')
"たかし"
```

##### `hrefVal`にURIエンコードした文字列を代入

テキストより抜粋

```javascript
const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ')
    + '&ref_src=twsrc%5Etfw';
```

このように，半角英数字以外の部分をURIエンコードして全体で文字列を合体させれば良い．

### 結果をツイートテキストに反映させる

`setAttribute`の`data-text`に対する第二引数を，診断結果の文字列が格納された変数`result`とする．

つまり，`anchor.setAttribute('data-text', result);`とする．

次に，`div id="tweet-area"`の`script`タグで，`async src="~/widgets.js"`が付与されている．<br>
これによって，Twitterサーバ上から`widgets.js`が読み込まれているので，あとは

`twttr.widgets.load();`でこれをロードさせれば，ツイートボタンと診断結果内容が正しく機能するようになる．

### `html`ファイルのlangを変えると？

ツイートボタンの`Tweet #あなたのいいところ`の`Tweet`が各言語に自動変換される．<br>
これは，`widget.js`側がこちらで作成した`html`ファイルの`lang`属性を読み込み，`a`タグの中身を変更しているためである．

このように，自分でHTMLを実装する際は適切な言語設定をしないとWebページが想定の振る舞いをしない可能性があるので要注意

### リバースエンジニアリング

今回，ツイートボタン作成サービスで`a`タグの構造を解析し，JavaScriptで実装したように，

既に作成済みのプログラムの動作や構造を解析する手法を **リバースエンジニアリング** と呼ぶ．

複雑なものを一つ一つ読み解くことで，今回の様なサービスを作る手がかりとなる！

## 練習問題

テキストフィールド上で`Enter`を押した場合でも，診断してくれるように改良せよ．

### 答案

`./assessment/assessment.js`にある．

ボタンクリックと`Enter`入力で二回使用するので，変更前の無名関数を`assess`という関数名に変えて，両方のイベントが発生したら`assess`の実行をするようにした．

#### コード内容

```javascript
// 抜粋
function assess() {
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

userNameInput.onkeydown = (event) => {
    if (event.key == 'Enter') {
        assess();
    }
}

assessmentButton.onclick = (event) => {
    assess();
}
```

#### 疑問点

最初，`assessmentButton.onclick`の部分を↓の様にしたら機能しなかった．

```javascript
assessmentButton.onclick = assess();
```

Q.どうして動作しなかったのか<br>
A.`assess()`は関数の実行した結果．`assess`の`()`を除いて関数自体を渡したら上手く行く．


### 模範解答との比較

わざわざ，`assess`関数を作る必要はない．

```javascript
userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};
```

単純にこうすれば良い．


## 感想

リバースエンジニアリングをはじめとして，なんとなく聞いたことがあるけどどういう意味なのかを結構知れたので充実した回であった！