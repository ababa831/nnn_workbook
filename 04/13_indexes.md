# 13. Indexes (in Japanese)

目的：<br>
- RDBを使用する上でのパフォーマンスの問題
- その解決法の一つ，**インデックス**について学ぶ

これにより，データが増加しても高速な処理ができるデータベースが作れるようになる．

## 学習メモ

### [RDBのパフォーマンス]

高速な処理が必要な理由:<br>
単純にUXが悪くなる．

例　WEBに表示するデータをDBから取得するとき，処理が遅いと表示に時間がかかる．

パフォーマンスを上げる方法:<br>
- ハードウェアスペックを上げる
    - 有効だが金がかかる．限界あり．
- **インデックス**を使用する．（今回のテーマ）

### [実際にパフォーマンスを確認してみよう]

(教材指定のそこそこ大規模なデータセット(`ranking`)をDL)

データセットの構成:

```
> \dt
         List of relations
 Schema |  Name  | Type  |  Owner
--------+--------+-------+----------
 public | scores | table | postgres
 public | users  | table | postgres
```

クエリの処理時間をベンチマークする：

`EXPLAIN ANALYZE`文で実行時間を計測

```
> EXPLAIN ANALYZE SELECT * FROM scores WHERE score = 100;
                                              QUERY PLAN
----------------------------------------------------------------------------------------------------------
 Seq Scan on scores  (cost=0.00..18870.00 rows=152 width=24) (actual time=0.072..95.354 rows=617 loops=1)
   Filter: (score = 100)
   Rows Removed by Filter: 999383
 Planning time: 0.092 ms
 Execution time: 95.414 ms
```

処理に，`Execution time: 95.414 ms`(0.15秒)だけ掛かったことがわかる．（遅い）

### [インデックス]

目次・索引(インデックス)を付ける仕組みのこと．行を高速に探索できるようになる．

インデックスは，B木というデータ構造に基づいて作成される．詳しくは[B木]の項目で．


方法:<br>
`CREATE INDEX ON <table> (column);`

で，インデックスをつけたいテーブルの列を指定して実行．

注:<br>
- `CREATE INDEX ON scores.score;`とはできないっぽい．（やりたくなる）
- インデックスは列ごとに設定する．

ベンチマーク結果:<br>

```
> EXPLAIN ANALYZE SELECT * FROM scores WHERE score = 100;
                                                           QUERY PLAN
--------------------------------------------------------------------------------------------------------------------------------
 Index Scan using scores_score_idx on scores  (cost=0.42..524.12 rows=152 width=24) (actual time=0.045..3.051 rows=617 loops=1)
   Index Cond: (score = 100)
 Planning time: 0.206 ms
 Execution time: 3.101 ms
(4 rows)
```

`Execution time: 3.101 ms`(`95ms`から大幅に短縮．1/30倍！)


### [RDBの内側]

なぜインデックスを付与することで，処理を高速化できるのか？

#### シーケンシャルスキャン（インデックスが存在しない場合）

データを一行ずつ順に取り出し，`WHERE`句の条件を満たすかを確認する方法<br>
前項で，インデックスを付与していない時の`EXPLAIN ANALYZE`の結果を見ると，`Seq Scan on scores`と書かれている．

O(n)の計算量．つまり，データ数が100倍に増えたら，処理時間も100倍になる．

#### インデックススキャン（インデックスが存在する場合）

データ全体は調べず，インデックスを使ってデータを効率的に探索する．（探索対象は予めインデックスで纏められているため，その分処理時間が短縮される．）<br>
前項で，インデックスを付与した時の`EXPLAIN ANALYZE`の結果を見ると，`Index Scan using scores_score_idx on scores`と書かれている．


#### B木 (B-tree)

RDBのインデックスとして用いるデータ構造は複数ある（後で調べる）が，代表的なものは，`B木`がある

元となるアルゴリズム:<br>
- 二分探索木
- AVL木

B木の解説:<br>
- 各ノードで，数値の検索範囲の区切りの値を2個用意して，検索対象の数値がその2つの数値より大小かを比較するルールを設ける．これにより，検索範囲の絞り込みができるので高速に処理できるという仕組み．(二分探索木の考え方を応用)
- できるだけ読み取り回数を短くする工夫．
    - データを保存している記憶装置がHDDの場合，主記憶装置と比べてアクセス時間が長くなるという問題点を考慮したアルゴリズム
    - 読み取り回数 = 木の深さ
        - AVL木と比べ木が浅い

（[参考](https://qiita.com/kiyodori/items/f66a545a47dc59dd8839)）


#### インデックスの更新コスト

データが更新された時，インデックスの内容と実際のテーブルの内容に整合性を持たせるため，インデックスを反映しなければならない．<br>
→`INSERT`, `DELETE`, `UPDATE`を使ってデータを更新したとき，必要な計算量が増えることを頭に入れておくこと．

すべての列にインデックスを予め作成したいと思うかもしれないが，この理由でインデックスの更新コストが掛かる．

したがって，<br>
**必要になるリソース・得られる効果を天秤にかけてインデックスを作成することを心がけること！**

## 練習問題

```
SELECT
    score,
    stage,
    play_time
FROM
    scores
    INNER JOIN
        users
    ON  scores.user_id = users.user_id
WHERE
    name = '山田';
```

のクエリを高速化するために，`scores`テーブルの`user_id`列にインデックスを作成せよ．

また，インデックス付与前後でどのくらい処理時間が短縮したかを評価せよ．

### 答案

1. インデックス作成前の処理時間を計測

```
EXPLAIN ANALYZE
SELECT
    score,
    stage,
    play_time
FROM
    scores
    INNER JOIN
        users
    ON  scores.user_id = users.user_id
WHERE
    name = '山田';
```

結果:

```
                                                       QUERY PLAN
------------------------------------------------------------------------------------------------------------------------
 Hash Join  (cost=2.26..20222.26 rows=10000 width=16) (actual time=0.105..148.741 rows=8373 loops=1)
   Hash Cond: (scores.user_id = users.user_id)
   ->  Seq Scan on scores  (cost=0.00..16370.00 rows=1000000 width=20) (actual time=0.006..68.844 rows=1000000 loops=1)
   ->  Hash  (cost=2.25..2.25 rows=1 width=4) (actual time=0.021..0.021 rows=1 loops=1)
         Buckets: 1024  Batches: 1  Memory Usage: 9kB
         ->  Seq Scan on users  (cost=0.00..2.25 rows=1 width=4) (actual time=0.010..0.018 rows=1 loops=1)
               Filter: ((name)::text = '山田'::text)
               Rows Removed by Filter: 99
 Planning time: 0.211 ms
 Execution time: 149.052 ms
(10 rows)
```

2. インデックスを付与

```
> CREATE INDEX ON scores (user_id);
CREATE INDEX
```

3. インデックス作成後の処理時間を計測

クエリは1と同じなので割愛．

結果:

```
                                                                QUERY PLAN
------------------------------------------------------------------------------------------------------------------------------------------
 Nested Loop  (cost=189.93..7064.59 rows=10000 width=16) (actual time=1.444..8.327 rows=8373 loops=1)
   ->  Seq Scan on users  (cost=0.00..2.25 rows=1 width=4) (actual time=0.006..0.024 rows=1 loops=1)
         Filter: ((name)::text = '山田'::text)
         Rows Removed by Filter: 99
   ->  Bitmap Heap Scan on scores  (cost=189.93..6962.34 rows=10000 width=20) (actual time=1.434..7.068 rows=8373 loops=1)
         Recheck Cond: (user_id = users.user_id)
         Heap Blocks: exact=4022
         ->  Bitmap Index Scan on scores_user_id_idx  (cost=0.00..187.43 rows=10000 width=0) (actual time=0.874..0.874 rows=8373 loops=1)
               Index Cond: (user_id = users.user_id)
 Planning time: 0.238 ms
 Execution time: 8.709 ms
(11 rows)
```

4. 処理時間の評価

- インデックス作成前: `149.052 ms`
- インデックス作成後: `8.709 ms`

処理時間を約1/20に短縮できていることがわかる．クエリ内の`ON  scores.user_id = users.user_id`で2つのテーブルが一致するものを`scores`から探索するときに，インデックスが効力を発揮すると考えられる．

### 解説との比較

正解．考え方も間違っていない．

一点補足:<br>
本クエリの内部挙動は次の通り

1. `WHERE`句において，`name='山田'`を満たす`users`をシーケンシャルスキャン
    - (データ数が少ないので`users`にインデックスは作成していない)
2. `scores`から，山田氏の`user_id`を検索


## 疑問点

Q.<br>
`CREATE INDEX ON scores (stage);`した後に，`EXPLAIN ANALYZE`した場合:<br> 
`Index Scan using scores_score_idx on scores`ではなく，`Bitmap Heap Scan on scores`と出るが，コレは何か？

A.<br>
よく見ろ，もう少し下の行に`Index Scan~`と書かれている．

`Bitmap Heap Scan on scores`はよく分からないので後で調べる．