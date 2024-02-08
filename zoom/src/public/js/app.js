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