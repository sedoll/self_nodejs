const express = require('express'); // express 객체 생성
const app = express(); // express 객체 사용

app.listen(8080, () => { // 클라이언트 요청 대기
    console.log('8080 포트 서버 대기');
})

// get 요청
app.get('/book', (req, res)=>{
    res.send('도서 목록 관련 페이지');
})

app.get('/', (req, res) => {
    res.send('홈 입니다.');
})

// html 이용
// \를 사용하는 이유는 한 문장으로 코드가 계속 이어진다는 의미
app.get('/html', (req, res) => {
    res.send(
        '<html>\
        <body>\
        <h1>안녕하세요</h1>\
        <marquee>홍길동님 반갑습니다.</marquee>\
        </body>\
        </html>'
    )
})

// 파일전송 sendFile
// __dirname = 현재 디렉토리를 나타내는 문자열 변수
app.get('/sendFile', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})