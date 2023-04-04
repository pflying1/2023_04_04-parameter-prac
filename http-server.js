const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const mysql = require('mysql');

class Server {
  constructor(port) {
    this.port = port;
  }
  start() {
    http.createServer((req, res) => {
      const parseUrl = url.parse(req.url, true);
      const pathName = parseUrl.pathname;
      const Method = req.method;

      if (Method === 'GET' && pathName === '/') {
        this.handleGetRequest(req, res);
      }
      else if (Method === 'POST' && pathName === '/post') {
        this.handlePostRequest(req, res);
      }
    })
      .listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
      });
  }


  handleGetRequest(req, res) {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.write('500 ');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      }
    });
  }

  handlePostRequest(req, res) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      let post = qs.parse(body);
      let name = post.name;
      let type = post.type;
      let level = post.level;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      let htm = `<!doctype html>
        <html>
        <head>
          <title>POST</title>
          <meta charset="utf-8">
        </head>
        <body>
        <form action="/post_test" method="post">
          <p>name : ${name}</p>
          <p>type : ${type}</p>
          <p>level : ${level}</p>
          </form>
        </body>
        </html>`
      ;
      res.end(htm);

      function user(a, b, c){
        this.name = a;
        this.type = b;
        this.level = c;
      }
      let Name = [name];
      let Type = [type];
      let Level = [level];

      let array = [];
      for(let i = 0 ; i<Name.length; i++){
        array.push(new user(Name[i],Type[i],parseInt(Level[i],10)));
      }
      console.log(array);
      fs.writeFileSync("insert-db.json",JSON.stringify(array, null, 2), "utf-8")

      const db = mysql.createConnection({
        //본인 아이디 패스워드 db이름 사용할 것 
        host:'localhost',
        user:'root',
        password:'admin123',
        database:'test1',
      }) 
      
      db.connect();
      
      // JSON 파일 경로
      const filePath = './insert-db.json'; 
      
      // fs 모듈을 사용하여 JSON 파일 읽기
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;
        
        // 데이터 파싱
        const jsonData = JSON.parse(data);
        
      
        //테이블 데이터 전체 삭제
        // db.query('DELETE FROM pokemon WHERE level < 100000'); 
        //데이터 추가 
        const sql = 'INSERT INTO pokemon (name, type, level) VALUES (?)';
        // const sqlUpdate = 'UPDATE text SET (id, name, email) WHERE id>10 ?';
        const values = jsonData.map(value=> [value.name, value.type, value.level]);
        console.log(values);
        db.query(sql, values, (err, result) => {
          if (err)throw err;

          //text이름의 테이블 데이터 파일에 Json파일로 저장하기 
          db.query('SELECT * FROM  pokemon',function(err,results,fields){
            if(err)throw err
            
            fs.writeFileSync('db.json', JSON.stringify(results, null, 2),(err)=>{
              if(err)throw err
            })
          });
          db.end();
      res.end();
        });
      });
    })
  }
}
const server = new Server(2080);
server.start();