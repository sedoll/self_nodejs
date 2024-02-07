const mariadb = require('mariadb')
const cfg = require('./conf')

const pool = mariadb.createPool({
    host:cfg.host,
    port:cfg.port,
    user:cfg.user,
    password:cfg.password,
    connectionLimit:cfg.connectionLimit
})

async function BoardList(){
    let conn, rows;
    try {
        conn = await pool.getConnection();
        conn.query('use myboard');
        rows = await conn.query('select * from board');
        console.log('성공');
    } catch (e) {
        console.log('실패');
        throw e;
    } finally {
        if(conn != null) conn.end();
        return rows;
    }
}

// 입력
async function InsertBoard(board){
    let conn, name, age, msg, sql;
    name = board.name; // name 추출
    age = board.age; // age 추출
    try{
        conn = await pool.getConnection();
        conn.query("use myboard");
        sql = `insert into board values(default, ?, ?)`;
        await conn.query(sql, [name, age]); // 값이 여러개 일때는 배열로 묶어서 전송
        msg = '입력 성공';
    } catch(e) {
        msg = '입력 실패';
        console.log(e);
    } finally {
        if(conn != null) conn.end();
        return msg; 
    }
}

// 수정
async function UpdateBoard(board){
    let conn, name, age, msg, sql;
    no = board.no;  // no 추출
    name = board.name; // name 추출
    age = board.age; // age 추출
    try{
        conn = await pool.getConnection();
        conn.query("use myboard");
        sql = `update set name=?, age=? where no=?`;
        await conn.query(sql, [name, age, no]); // 값이 여러개 일때는 배열로 묶어서 전송
        msg = '수정 성공';
    } catch(e) {
        msg = '수정 실패';
        console.log(e);
    } finally {
        if(conn != null) conn.end();
        return msg; 
    }
}

// 삭제
async function DeleteBoard(no) {
    let conn, msg, sql;
    try{
        conn = await pool.getConnection();
        conn.query("use myboard");
        sql = `delete from board where no = ?`;
        await conn.query(sql, no);
        msg = '삭제 성공';
    } catch(e) {
        msg = '삭제 실패';
        console.log(e);
    } finally {
        if(conn!=null) conn.end();
        return msg;
    }
}

module.exports = { 
    boardList: BoardList, insertBoard:InsertBoard, 
    deleteBoard:DeleteBoard, updateBoard:UpdateBoard
}