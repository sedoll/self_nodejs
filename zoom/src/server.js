// ecma 방식으로 써야함
import express from 'express';
import path from 'path'; // __dirname이 안불러와지는 경우
const __dirname = path.resolve();

const app = express();

// 세팅
app.set('view engine', 'pug'); // pug
app.set("views", __dirname + '/src/views'); // views

// 연결
app.use('/public', express.static(__dirname+'/src/public'));

// route
app.get('/', (req, res)=> { // index 세팅
    res.render('home');
})

app.listen(3000, ()=> {
    console.log(__dirname);
    console.log('서버 실행');
    console.log('http://localhost:3000');
})