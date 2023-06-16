# kadai06
課題6　API

## DEMO

  - デプロイしている場合はURLを記入（任意）

## 紹介と使い方

  #### 音声入力ふせんメモ(2)
  - ローカルストレージの課題で作ったアプリを、ローカルストレージでなくFirestoreにデータを保存できるようにしました。 
  -  Firestore内に、「ふせんの内容」と「ふせんを作成した日時」と「ふせんの位置（x,y）」が記録されます。

  - 音声入力できるふせんメモアプリです。
  - 背景を「week」と「month」で２パターン選ぶことができます。
  - 「week」は7色、「month」は12色の背景になってます。

  - 「録音」をおすと音声入力を開始し、四角の中に文字が表示されます。
  - 「停止」で入力を終了します。
  - 「追加」を押すと、四角の中に表示された文字が入力されたふせんが出現します。
  
  - ドラッグで好きな場所にふせんを置けるので、実施する曜日/月の場所にふせんを置きます。
  - ふせんの右上にカーソルをあてると❌が表示され、押すと「該当のふせんの消去」と「Firestore上のデータ削除」ができます。

  - 「消去」を押すと四角の中の録音した文字が消えます。

## 工夫した点

  - ふせんの位置を記録できるようにしたため、リロード後も同じ位置にふせんを表示できるようにしました。
  - ふせんの位置をリアルタイムに取得し、ドラッグで移動した位置を記録できるようにしました。
  - データすべてを消す全削除ボタンをやめて、四角の中の文字を消去できるボタンを作りました。
  - 前の課題でfirebaseConfigを別ファイルにすることが出来なかったので今回やりました。
  
## 苦戦した点

  - はじめ、リロードすると「ドラッグして移動」が一度しかできなかったので、苦戦しました。ふせんの表示を$(document).readyを使ったらうまくいきました。
  - ふせんの作成後、textareaになってるので、作成後の文字の変更もできるようにしたいです。
  - 文字を解析して、時刻を正規化するAPIを組み込みたかったのですが、うまく動作しませんでした。

## 参考にした web サイトなど

  - Webページでブラウザの音声認識機能を使おう - Web Speech API Speech Recognition - Qiita　https://qiita.com/hmmrjn/items/4b77a86030ed0071f548
  - オンラインふせんアプリを作りたい人のためのファーストガイド - Qiita　https://qiita.com/iotas/items/fbf4994877e5c2053787
  - Cloud Firestore にデータを追加する  _  Firebase https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja
