
/* 서버 켜는 명령어 : node index.js 끄는 법 : ctrl + c */ 
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 


// MongoDB 연결

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://chanios127:CW2KfYsHFFF7K7uG@chanios.9nrmsnz.mongodb.net/?retryWrites=true&w=majority')
  .then(database => {
    app.listen('8080', function() {
      console.log('listening on 8080')
    });
    db = database.db('todoapp');
		post = db.collection('post');
  })
  .catch(err => {
    console.log(err);
		return;
  })


  // JS promise 문법 적용.. 
  db.collection('post').insertOne({이름 : 'John', 나이 : '20'}, function(err, res){
    console.log('저장완료');
  });



app.get('/', function(req, res) { 
    res.sendFile(__dirname +'/index.html')
  });

app.get('/pet',function(req, res){
    res.send('펫용품 쇼핑할 수 있는 페이지 입니다.')
});

app.get('/beauty',function(req, res){
    res.send('뷰티용품을 쇼핑할 수 있는 페이지 입니다.')
});

app.get('/write', function(req, res) { 
    res.sendFile(__dirname +'/write.html')
  });

app.post('/add', function(req, res){
  console.log(req.body);
  res.send('전송완료')
});

