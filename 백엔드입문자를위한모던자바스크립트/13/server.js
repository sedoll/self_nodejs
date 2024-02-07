const dbCon = require('./db');
const express = require('express');
const app = express();

// 데이터를 읽어오기 위해 bodyParser 적용
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

let title = "제목";
let tmp1 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>샘플</title>
</head>
<body>
    <ul>
        <li><a href="/">메인</a></li>
        <li><a href="list">목록</a></li>
        <li><a href="/insert">추가</a></li>
    </ul>
    <hr>
`;
let tmp2 = `</body></html>`;


// 입력 폼 이동
app.get('/insert', (req, res)=> {
    res.sendFile(__dirname+'/enter.html');
})

// 입력 데이터 전송
app.post('/insertPro', (req, res)=> {
    console.log(req.body.name, req.body.age);
    let board = {name:req.body.name, age:req.body.age};
    dbCon.insertBoard(board)
    .then((msg)=> {
        console.log(msg);
        res.redirect('/list');
    })
    .catch((err)=> {
        console.log(err);
    });
});

// list 출력
app.get('/list', (req, res)=>{
    title = `<h2>샘플 항목</h2>`;
    let ul = `<ul>`;
    dbCon.boardList()
    .then((rows)=>{
        let li = rows.map((row) => {
            console.log(row);
            return `<li>${row.NAME}, ${row.age} <a href='/delete/${row.NO}'>삭제</a></li>`
        });
        li.map((tag)=>{
            ul = ul + tag;
        });
        ul = ul + `</ul>`;
        res.send(tmp1+title+ul+tmp2);
    })
    .catch((err)=> {
        res.send(tmp1+title+err+tmp2);
    })
})

// 수정 폼 이동
app.get('/update', (req, res)=> {
    res.sendFile(__dirname+'/update.html');
})

// 입력 데이터 전송
app.post('/updatePro', (req, res)=> {
    console.log(req.body.name, req.body.age);
    let board = {no:req.body.no, name:req.body.name, age:req.body.age};
    dbCon.updateBoard(board)
    .then((msg)=> {
        console.log(msg);
        res.redirect('/list');
    })
    .catch((err)=> {
        console.log(err);
    });
});

// 삭제
// /:no 매개변수
app.get('/delete/:no', (req, res)=> {
    console.log(req.params.no);
    let no = req.params.no;
    dbCon.deleteBoard(no)
    .then((msg)=> {
        console.log(msg);
        res.redirect('/list');
    })
    .catch((err)=> {
        console.log(err);
    });
})

app.listen(4000, (req, res)=> {
    console.log('server start');
})