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