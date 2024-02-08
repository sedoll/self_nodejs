# 줌 클론코딩, 노마드 코더

Zoom Clone using NodeJS, WebRTC and Websocket

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