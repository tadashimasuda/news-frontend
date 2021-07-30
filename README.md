# News-hear (ReadMe)

## アプリの概要
タイトル：News-hear<br>
リンク:<a href="https://news-voice.xyz">https://news-voice.xyz<br>
コンセプト：ニュース記事を読む（主体的な行動）からニュース記事を聞く（受動的な行動）に変えることによって、ニュースを取得しやすくすること。<br>

※説明スライド（https://bit.ly/36Vqwnh）<br>
※詳細ページはバッジ処理が完了してないため、時間がかかる場合があります。<br>

## 使用技術について 
|  使用箇所  |  技術名  |
| ---- | ---- |
|  フロントエンド  |  Vue.js  |
|  バックエンド  |  Laravel8  |
|  インフラ  |  AWS(VPC,ACM,EC2,RDS,S3,ELB),Netlify |

## 機能、処理一覧
※説明スライド（<a href='https://bit.ly/36Vqwnh' target="_blank">https://bit.ly/36Vqwnh</a>）にてGIF画像を添付しております。
### 機能 (リンクはフロントエンドリポジトリになります。)
- [記事一覧](https://github.com/tadashimasuda/news-frontend/blob/main/src/views/index.vue)、[詳細取得](https://github.com/tadashimasuda/news-frontend/blob/main/src/views/articles.vue)
- [各記事へのコメント機能（追加、削除）](https://github.com/tadashimasuda/news-frontend/blob/main/src/views/articles.vue)
- [各記事の後で見る機能（追加、削除、一覧）](https://github.com/tadashimasuda/news-frontend/blob/main/src/components/Header.vue)
- [Google認証（ログイン、ログアウト）](https://github.com/tadashimasuda/news-frontend/blob/main/src/views/articles.vue)
- [音声再生機能（再生、停止、５秒前後移動）](https://github.com/tadashimasuda/news-frontend/blob/main/src/views/articles.vue)

  
### 処理(リンクはバックエンドリポジトリになります。)
- [Webスクレイピング（Laravel Goutte、外部APIには記事本文が含まれていないため取得するため使用）](https://github.com/tadashimasuda/news_backend/blob/main/app/Http/Controllers/ArticleController.php#L15)
- [音声ファイル（mp3）作成](https://github.com/tadashimasuda/news_backend/blob/main/app/Http/Controllers/ArticleController.php#L130)
- [外部APIの取得（Laravel Gazzle、記事一覧を取得）](https://github.com/tadashimasuda/news_backend/blob/main/app/Http/Controllers/ArticleController.php#L52)
- バッジ処理（実装中）
- [認可機能（コメント、後で見る機能の削除機能で使用）](https://github.com/tadashimasuda/news_backend/blob/main/app/Policies/CommentPolicy.php)
- [N+1の解決（コメント取得の際に対策）](https://github.com/tadashimasuda/news_backend/blob/main/app/Http/Controllers/CommentController.php#L20)
- [テストコード](https://github.com/tadashimasuda/news_backend/tree/main/tests/Feature/Controllers)

<img src='https://user-images.githubusercontent.com/51233312/127602597-bec2fd66-8f38-48ce-aa63-fd777d2a8369.gif' width=200px >　　　　　  <img src='https://user-images.githubusercontent.com/51233312/127602936-f057fe53-2639-4d5e-a0db-b3c738e35465.gif' width=200px>
  
<img src='https://user-images.githubusercontent.com/51233312/126973618-6b8587ca-fa9c-417a-b646-c7d427e56023.png' width=500px>

<img src='https://user-images.githubusercontent.com/51233312/126973835-663f499d-60d5-4d98-87ac-6b2305f85b10.png' width=500px>

## 注力した点、工夫した点
- **SPA**
  - 高速なページ移動をすることにより、ユーザーにストレスを与えないようにするため
- **Git Flowを意識したGit管理**
  - 開発しやすくするため
- **Oauthを使用した認証**
  - ユーザーに認証の手間をかけさせないため
- **バッジ処理（実装中)**
  - 音声ファイルの作成に時間がかかるため
- **インフラ環境の構築**
  - AWS Herokuなどではレスポンスに時間がかかるためAWSを使用。また、自分に必要な環境を構築できるため。
- **組積構造を意識したデザイン**
  - 見やすくするため