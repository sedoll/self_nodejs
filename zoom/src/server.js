// ecma 방식으로 써야함
import http from 'http';
import { WebSocketServer } from "ws";
import express from 'express';
import path from 'path'; // __dirname이 안불러와지는 경우

const __dirname = path.resolve();
const app = express();
const port = 3000;
const start = () => {
    console.log('서버 실행');
}

// 세팅
app.set('view engine', 'pug'); // pug
app.set("views", __dirname + '/src/views'); // views

// 연결
app.use('/public', express.static(__dirname+'/src/public'));

// route
app.get('/', (req, res)=> { // index 세팅
    res.render('home');
})

// express 자체는 ws를 지원하지 않으므로 http를 이용
const server = http.createServer(app);

// websocket server
// http 를 이용해 ws를 생성
// Server 매개값은 필수가 아님
const wss = new WebSocketServer({server});

// wss

const socketClose = ()=> { // 브라우저를 종료한 경우
    console.log('서버 끊김');
}
const socketMsg = (msg) => { // browser에서 보내온 메세지 받아옴
    console.log(msg.toString());
}

wss.on('connection', (socket) => { // 연결된 경우
    console.log('브라우저와 연결')
    socket.on('close', socketClose);
    socket.on('message', socketMsg);
    socket.send('hello!!') // 데이터(메세지)를 front로 전송
    // console.log(socket); // 소켓 정보 출력
});

server.listen(port, start);