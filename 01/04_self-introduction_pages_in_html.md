# Self-introduction pages in HTML (in Japanese)

既知の部分は飛ばす．確認しておきたい部分だけメモする．

## 学習メモ

### コード補完のTips

`+`記号によって，複数のタグをどんどん追加して補完可能

例:<br>
`h1+table>(tr>th+td)*2`

```
<h1></h1>
<table>
    <tr>
        <th></th>
        <td></td>
    </tr>
    <tr>
        <th></th>
        <td></td>
    </tr>
</table>
```

## 練習問題

自己紹介ページに，**卒業した縄張り**という名前で，Google Mapsの地図を埋め込んでみよ．

## 答案

`./04_self-introduction_pages_in_html/self-introduction.html`にある．

![作成例](https://github.com/ababa893/nnn_workbook/blob/master/01/04_self-introduction_pages_in_html/self-intro_example.png?raw=true)

## 気になった点

twitterのリンク貼る部分の解説で，

```
</ul>
<h3>SNS へのリンク集</h3>
<ul>
    <li><a href="https://twitter.com/nico_nico_news">Twitter</a></li>
</ul>
</body>
</html>
```

の最上部`</ul>`は不要なはず．間違えて記述してしまっているかも．