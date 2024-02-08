# 줌 클론코딩, 노마드 코더

Zoom Clone using NodeJS, WebRTC and Websocket

# 1. 기본 세팅

## npm

npm i nodemon -D 명령어는 Node.js 프로젝트에서 개발 의존성(dependency)으로 nodemon 패키지를 설치하는 명령어입니다. 여기서 -D는 --save-dev의 축약형으로, 패키지를 개발 시에만 필요하고 프로덕션 환경에서는 필요하지 않다는 것을 나타냅니다.

여기서 각 부분의 의미는 다음과 같습니다:

* npm i: npm install의 축약형으로 패키지를 설치하는 명령어입니다.
* nodemon: Node.js 애플리케이션을 개발할 때 소스 코드가 변경될 때마다 자동으로 서버를 다시 시작하는 도구입니다. 이는 코드를 수정하고 바로 효과를 볼 수 있도록 도와줍니다.
* -D 또는 --save-dev: 패키지를 프로젝트의 devDependencies에 추가합니다. 이는 프로덕션 환경에서는 필요하지 않은 개발 시에만 필요한 의존성을 나타냅니다.

```
npm i nodemon -D
```
<br>

## __dirname이 안 불러와지는 경우
```javascript
import path from 'path';
const __dirname = path.resolve();
```
<br>

## pug 주석
```
//- 이렇게 작성한다.
```
<br>

# 2. websocket

## ws 설치
[라이브러리 github 링크](https://github.com/websockets/ws)
```
npm i ws
```
<br>

## ws 사용법 변화
8 버전 이하
```javascript
import WebSocket from "ws";
const wss = new WebSocket.Server({server});
```

8 버전 이상
```javascript
import { WebSocketServer } from "ws";
const wss = new WebSocketServer({server});
```
<br>

## websocket 테스트 코드

### front
```javascript
// 프론트 소켓 연결 테스트
const socket = new WebSocket(`ws://${window.location.host}`);

const socketOpen = ()=> {
    console.log('server open');
}

const socketMsg = (msg)=>{
    console.log(msg);
    console.log('메세지 : ' + msg.data);
}

const socketClose = ()=>{
    console.log('server close');
}

const sendMsg = () => {
    setTimeout(()=> {
        socket.send('hello server, send browser');
    }, 1000); // timeout 지정
}

// 서버 열기
socket.addEventListener('open', socketOpen);

// 메세지 받기
socket.addEventListener('message', socketMsg);

// 서버 닫기
socket.addEventListener('close', socketClose);

// 메세지 전송
sendMsg();
```
<br>

### back
```javascript
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
```

