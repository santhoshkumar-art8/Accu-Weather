let express=require('express');

let https=require('https');
let bodyparser=require('body-parser');
let ejs = require("ejs");
let port =process.env.PORT|| 5000;


let app=express();

app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));

let condition1="";
let temp1="";
let imgurl1="";
let cityname="";

app.get('/',(req,res)=>{

  res.render("index");
//   res.send("<img src="+ imgurl1 +" alt>");  

});

app.get('/result',(req,res)=>{
    
res.render("result",{one:condition1,two:temp1,three:imgurl1,four:cityname});
// res.set("Content-Type","test/html");


});

app.post('/',(req,res)=>{
let city1=req.body.city;
let url="https://api.openweathermap.org/data/2.5/weather?q="+city1+"&appid=f0767e35ba26d5e1b35b0621b6696ade&units=metric";

https.get(url,(response)=>{

console.log(response.statusCode);

response.on("data",(d)=>{
let a=JSON.parse(d);

let condition=a.weather[0].main;
let temp=a.main.temp;
let imgid=a.weather[0].icon;
let imgurl="http://openweathermap.org/img/wn/"+imgid+"@4x.png";

condition1=condition;
temp1=temp;
imgurl1=imgurl;
cityname=city1;

res.redirect('/result');

// res.set("Content-Type", "text/html");
// res.write("<h3>the weather condition is "+ condition +"</h3>");
// res.write("<h1>the temperature of the "+city1+" is " + temp + "</h1>");
// res.write("<img src="+imgurl+">");
// res.send();


});



});



});




app.listen(port,(req,res)=>{
console.log( `the server runs on local host ${port}`);
});