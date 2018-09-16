# 14. Aggregation and Sorting (in Japanese)

この節に書かれている内容は，既に殆ど理解できているのでサラッと学ぶ．

## 学習メモ

### [RDBと集合]

RDBは集合の概念を使っている．<br>
- テーブル - 行からなる集合
- `SELECT ~ FROM ~~ WHERE ~~~`で抽出したデータはテーブルの部分集合

このような考え方をするため，SQLは **集合指向言語** と言われる事がある．

### [集計]

ある集合に対して，何らかの値を計算すること．

例:<br>
- `SUM(<column>)`(合計)
- `AVG(<column>)`(平均)
- `COUNT(<column>)`(個数)

上記の句のことを，**集計関数**と呼ぶ．

### [HAVING 句]

`score`のカウント数が`10000`以下の結果のみ表示させたい場合

```
SELECT
    name,
    MAX(stage),
    AVG(score),
    COUNT(score)
FROM
    scores
    INNER JOIN
        users
    ON  scores.user_id = users.user_id
GROUP BY
    name
WHERE
    COUNT(score) < 10000;
```

という書き方はエラーになる．

理由:<br>
`WHERE`句は行に関する条件を書くためのもの．集計関数を実行する前に使われるので，`COUNT(score) ~`の文は意味がなくなる．

解決法:<br>
`HAVING`句を利用する．書き方は`WHERE`句と同じで，以下のように書き換えればよい．

```
SELECT
    name,
    MAX(stage),
    AVG(score),
    COUNT(score)
FROM
    scores
    INNER JOIN
        users
    ON  scores.user_id = users.user_id
GROUP BY
    name
HAVING
    COUNT(score) < 10000;
```

### [RDBの活用]

集計等の処理は，プログラミング言語側でも可能だが，<br>
- DBとプログラムとの通信量を減らす
- 計算を高速化する
- プログラム側のコード量を削減する

といった恩恵を受けるため，RDBを活用するのである．

RDBとプログラム側の担当分をうまく設計・実装できるようになってこそ，真にDBを使いこなせていると言える．

## 練習問題

テキストの`ranking2`データセットをDLした後，今回学んだことを応用して次に示すランキング形式のテーブルを作成したい．

```
    name    |   max
------------+---------
 名前1       | 3000000
 名前2       | 2000000
 名前3       | 1000000
:
```

ここで，条件は次を満たさなければならない:<br>
最大スコアの高い順に並び替える

以下の空欄を適切に埋めよ．

```
SELECT
    name,
    [ 1 ]
FROM
    scores
    INNER JOIN
        users
    ON  scores.user_id = users.user_id
WHERE
    stage = 25
GROUP BY
    [ 2 ]
ORDER BY
    [ 3 ] DESC;
```

### 答案

- [1]には，スコア最大値を計算する集計関数`MAX(scores.score) AS max`を利用する
- [2]には，名前ごとにグループ化する文`name`を埋める
- [3]には，最大スコアの高い順に並び替える文`max`を埋める

したがって，穴埋めしたSQL文は次の通り.

```
SELECT
    name,
    MAX(scores.score) AS max
FROM
    scores
    INNER JOIN
        users
    ON  scores.user_id = users.user_id
WHERE
    stage = 25
GROUP BY
    name
ORDER BY
    max DESC;
```

### 模範解答との比較

正解．考え方も問題ない．