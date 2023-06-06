const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser')
var multiparty = require('multiparty');
const fs = require('fs');
const path  = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(__dirname + '/static')); //设置静态文件目录
// 跨域
var allowCrossDomain = function(req, res, next) {//设置response头部的中间件
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');//8089是vue项目的端口，这里相对于白名单
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
  };
app.use(allowCrossDomain)

//对JSON请求体解析中间件
app.use(bodyParser.json());
//对urlencoded请求体解析中间件,extended:true 高级模式 false:普通 没有区别
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/data', (req, res) => {
  console.log(req.body)
  let form = new multiparty.Form();
  // let person = 1;
  // let name = 'F7-T7';
  // let t0 = 10;
  // let tf = 1000;
  form.parse(req, function(err,fields,file){
    console.log(fields);
    // res.send('数据已接收');
    let person = fields.person[0];
    let name = fields.name[0];
    let t0 = fields.t0[0];
    let tf = fields.tf[0];
    console.log(person,name,t0,tf);
    try {
      const data = fs.readFileSync(path.join(__dirname,`./static/data/chb01_0${person}/${name}.json`), 'utf8');
      // parse JSON string to JSON object
      const data_json = JSON.parse(data);
      if(t0>=data_json.t0 && tf<=data_json.tf){
        data_json['person'] = person;
        data_json['data'] = data_json['data'].slice(t0,tf);
        data_json['t0'] = t0;
        data_json['tf'] = tf;
        data_json['timeLast'] = Number.parseInt((tf-t0)/256);
        res.status(200).send(data_json)
      }else{
        res.status(501).send(`ERROR:time out of range, please ensure your enters between ${data_json.t0} and ${data_json.tf}`)
      }
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
        res.status(500).send(`ERROR:cant find person or channel.`)
    }
  });
  // res.end();
})

app.listen(3000, () => {
  console.log('应用正在监听 3000 端口 !');
});
