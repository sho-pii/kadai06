import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getFirestore, setDoc,collection, deleteDoc, doc, getDocs, updateDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';
import firebaseConfig from "./env.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 背景切り替え
$('#week').on('click', function () {
  $('#background').addClass('b-week');
  $('#background').removeClass('b-month');
});

$('#month').on('click', function () {
  $('#background').addClass('b-month');
  $('#background').removeClass('b-week');
});


// ふせん
function getNewNote() {
  return '<div class="note" style="position:fixed;">' +
    '<span class="batsu"></span>'
    +
    '<textarea type="text">'
    ;
}

// 録音
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const resultDiv = document.querySelector('#result-div');

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = '';

recognition.onresult = (event) => {
  let interimTranscript = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript = transcript;
    }
  }
  resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';

}

// 録音ボタン
$("#start-btn").on("click", function () {
  recognition.start();
});

//停止ボタン
$("#stop-btn").on("click", function () {
  recognition.stop();
});

// result-divの中を消去
$('#clear-btn').on('click', function () {
  $('#result-div').text('');
});



// 追加ボタン
$('#add-btn').on('click', function () {
  var $note = $(getNewNote());
  $note.draggable();
  $('#background').append($note);

  const key = Date().toLocaleString();
  var resultDiv = document.getElementById('result-div');
  const value = resultDiv.innerText;
  const colId = "ふせん";
  const docId = key;

  const x = $(".note").position().left;
  const y = $(".note").position().top;

  const docRef = setDoc(doc(db, colId, docId),
    {
      key: key,
      value: value,
      x: x,
      y: y
    })
    .then(() => {
      console.log(docRef);
      console.log(key);
    })
    .catch((error) => {
      console.error("失敗しました", error);
    });

  $note.find('textarea').val(value);

  finalTranscript = '';
  resultDiv.innerHTML = '';

  // バツボタンでふせん削除
  $note.children(".batsu")
    .on('click', function () {
      const docId = key;
      const colId = "ふせん";
      const docRef = doc(db, colId, docId);

      deleteDoc(docRef)
        .then(() => {
          console.log("ノートを削除しました");
        })
        .catch((error) => {
          console.error("削除に失敗しました", error);
        });

      $(this).parents('.note').remove();
    });

  //　位置情報
  $note.draggable({
    stop: function () {
      const $draggedNote = $(this);
      const x = $draggedNote.position().left;
      const y = $draggedNote.position().top;
      const docId = key;
      const colId = "ふせん";
      const docRef = doc(db, colId, docId);

      updateDoc(docRef, {
        x: x,
        y: y
      })
        .then(() => {
          console.log("ノートを更新しました");
        })
        .catch((error) => {
          console.error("更新に失敗しました", error);
        });
    }
  });
});


//　ふせんの表示
var docId;

$(document).ready(function() {
  const colId = "ふせん";
  const collectionRef = collection(db, colId);
  
  getDocs(collectionRef)
    .then((querySnapshot) => {
      querySnapshot.forEach((docu) => {
        const noteData = docu.data();
        
         docId = docu.id;

        var $note = $(getNewNote());
        $note.draggable();
        $note.css({
          left: noteData.x,
          top: noteData.y
        });
        $('#background').append($note);
        $note.find('textarea').val(noteData.value);
        
        // 削除ボタン
        $note.children(".batsu").on('click', function () {
          const docRef = doc(db, colId, docId);
  
          deleteDoc(docRef)
            .then(() => {
              console.log("ノートを削除しました");
            })
            .catch((error) => {
              console.error("削除に失敗しました", error);
            });
  
          $(this).parents('.note').remove();
        });
  
        // 位置情報の更新
        $note.draggable({
          stop: function () {
            const $draggedNote = $(this);
            const x = $draggedNote.position().left;
            const y = $draggedNote.position().top;
            const docRef = doc(db, colId, docId); 
  
            updateDoc(docRef, {
              x: x,
              y: y
            })
              .then(() => {
                console.log("ノートを更新しました");
              })
              .catch((error) => {
                console.error("更新に失敗しました", error);
              });
          }
        });
      });
    })
    .catch((error) => {
      console.error("ノートの取得に失敗しました", error);
    });
});


// // goo時刻解析
// var apiURL = 'https://labs.goo.ne.jp/api/chrono';  // リクエスト先のURL
// var apiKey = '148e080dc7870e3c89192f8f9f18127954d3c4b506da91b5e3c7deb80c4d3e4e';  // APIキーまたはアプリケーションID

// $.ajax({
//   url: apiURL,
//   method: 'GET',
//   data: {
//     "sentence": $("#resultDev").val()
//   },
//   headers: {
//     'X-Application-ID': apiKey,  // APIキーをAuthorizationヘッダーに追加する場合
//     'Content-Type': 'application/json'
//   },
//   success: function(response) {
//     // 成功時の処理
//     console.log(response);
//   },
//   error: function(xhr, status, error) {
//     // エラー時の処理
//     console.error(status + ': ' + error);
//   }
// });
// var url = "";
// var data = {
//     "app_id": "{148e080dc7870e3c89192f8f9f18127954d3c4b506da91b5e3c7deb80c4d3e4e}",
//     "sentence": "{$(resultDev)}"
// };

// $.ajax({
//     url: url,
//     type: "POST",
//     data: data,
//     success: function(response) {
//         console.log(response);
//     }
// });
