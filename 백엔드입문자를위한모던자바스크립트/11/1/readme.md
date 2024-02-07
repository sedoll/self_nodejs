# nodejs, mariadb 연결
<br>

## npm install mariadb
[mariadb 공식문서](https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/)
<br>

## mariadb 설정, conf.js
```javascript
module.exports = {
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    pass:'1234',
    connectionLimit:5
}
```
<br>

## mariadb 연결 및 쿼리문 작성, db.js
```javascript
//npm install mariadb
const mariadb = require("mariadb");
const cfg = require("./conf");

const pool = mariadb.createPool({
    host:cfg.host,    port:cfg.port,    user:cfg.user,
    password:cfg.pass,    connectionLimit:cfg.connectionLimit
});

async function GetBoardList(){
    let conn, rows;
    try {
        conn = await pool.getConnection(); // db 연결
        conn.query('USE myboard'); // 사용할 테이블
        rows = await conn.query('select * from board'); // sql 명령어
    } catch(err){
        throw err;
    } finally {
        if(conn) conn.end();
        return rows; // 값 반환
    }
}

module.exports = { 
    getBoardList: GetBoardList
}
```
<br>

## 서버 실행
```javascript
const dbCon = require("./db");
const express = require("express");
const app = express();

app.listen(4000, (req, res) => {
    console.log(`Sever Starting on 4000`);

    dbCon.getBoardList()
    .then((rows) => {
        rows.map((tuple) => {  
            console.log(tuple);
        });
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });
});
```