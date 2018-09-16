# 12. Join Tables (in Japanese)

## 学習メモ
[]はテキストの見出しに対応．

既に，結合文は書ける（KaggleでBigQueryを利用していたので）ので流し読みでOK．

怪しいのは，「内部結合と外部結合の挙動（？）を正しく説明できるか」という点

この点を重視して学んでいく．

### [結合を試してみよう]

PostgreSQLのコンソールにおいて，SQL文に`;`を付ける理由がわかった：<br>
結合のように複数行に渡るSQL文を書く場合，SQLの終端を判別できるように付与している．`;`がない場合，各行の終端で続きがあるのかないのか判断できない．

Q. 改行，インデントを自動整形とかしてくれないのか？<br>
A. あとで調べる

Q. "連番"ID？<br>
A. 連続した整数で付与されるID

### [内部結合の動作]

```
SELECT
    d.id,
    d.body,
    c.comment
FROM
    diaries AS d
    INNER JOIN
        comments AS c
    ON  d.id = c.diary_id;
```

を実行した場合，`diaries`に付与された連番IDと，`comments`にある`diary_id`で紐付けられた日記を抽出して表示される．

問題点:<br>
`comment`テーブルの`diary_id`に含まれていない`diaries`テーブルの連番IDは抽出されない．<br>
→**内部結合は，結合に使う列の値が両方のテーブルに含まれていない場合は，結果として抽出されない！**

(つまり，両方のテーブル(ベン図)の　**積集合**　として振る舞う)

### [外部結合を使ってみよう]

外部結合の種類:<br>
- 左外部結合 (LEFT OUTER JOIN)
    - ベン図の **左側の集合**
- 右外部結合 (RIGHT OUTER JOIN)
    - ベン図の **右側の集合**
- 完全外部結合 (FULL OUTER JOIN)
    - ベン図の **両方の集合（和集合）**
        - `diaries`と`comments`の 日記`id`はすべての行に付与されているので，今回は左右の外部結合と結果は変わらない
    

Q. 左（LEFT）と右（RIGHT）とはなにか？<br>
A. 以下のSQL文で，

```
SELECT ~ 
FROM 
    <table A>
    INNER JOIN
        <table B>
    ON  <table A>.hoge = <table B>.hoge;
```

`FROM <table A> INNER JOIN <table B>`

この部分を考えた時，

- `<table A>`が左(LEFT)側
- `<table B>`が右(RIGHT)側

にあり，どちらのTableを基準にする（残す）かによって`LEFT OUTER JOIN`, `RIGHT OUTER JOIN`を決める．`FULL OUTER JOIN`は両方を残す場合に使用する．

### [SQL: ORDER BY]

既に理解しているのでパス

### [まとめ]

複数テーブルにまたがる関係を抽出する場合は，結合を利用する．

左右とは，<br>
`FROM <table A> INNER JOIN <table B>`

で表現したときの，左側，右側のこと．

各結合の挙動：<br>
- 内部結合　両テーブルに共通する列で，両者に値がある行のみ抽出
    - 両テーブルの積集合
- 左外部結合　両方に共通する列で，右側は値がある行のみ，左側はすべての行を抽出
    - 左テーブルの集合
- 右外部結合　両方に共通する列で，左側は値がある行のみ，右側はすべての行を抽出
    - 右テーブルの集合
- 完全外部集合　両方に共通する列で，値の有無に関係なく両側の行を取得
    - 両テーブルの和集合

## 練習問題

`daiary3`データセットにおいて，それぞれの人が書いたコメントの一覧を抽出せよ．

ただし，以下の条件を満たすこと<br>
- ユーザごとにコメントをまとめる
- コメントを一度もしていない人も含める
- 匿名コメントも含める
- `user_id`は昇順になるように並べ替える

### 答案

ユーザ名とコメントの情報があるテーブルは，<br>
- users
- comments

であるため，この両テーブルから結合操作によりデータを抽出すればよい．

ここで，<br>
- `user_id`が付与されていない行もすべて抽出
    - `user_id= 2, NULL`のデータも含める．
        - `2`のデータは左側のみ
        - `NULL`のデータは右側のみ．
- `user_id`順で並べれば，自動的に`name`もユーザごとにまとまる
    - `user_id`のIDが全て含まれているのは，`users`テーブルの方なので，こちら側でソートする．

上記を考慮した結合を行う場合，`FULL OUTER JOIN`と`ORDER BY user_id ASC`を使えば良い．

以上より，答案は次の通りである．

```
SELECT 
    u.name, 
    c.comment
FROM 
    users AS u
    FULL OUTER JOIN 
        comments AS c
    ON u.userid = c.user_id
ORDER BY 
    u.userid ASC;
```

### 模範解答との比較

正解．考え方も問題ない．