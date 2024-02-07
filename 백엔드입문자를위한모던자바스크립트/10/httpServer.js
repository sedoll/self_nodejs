const http = require('http') // 서버 생성

const hostname = '127.0.0.1' // host 이름, 현재 로컬로 지정
const port = 3000   // 포트 번호

const server = http.createServer((req, res) => { // http 모듈로 1대의 서버 생성
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World')
})

server.listen(port, hostname, ()=>{ // 서버의 등록한 아이피와 포트 번호를 기반으로 클라이언트가 서버에 접속하기 전까지 대기
    console.log(`Server running at http://${hostname}:${port}/`)
})

