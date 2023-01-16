const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})
app.post("/",function(req,res){
   // console.log(res.body.place);
    let apikey="8dfb3722299eafcde6c82bc3bb8c4657";
    let city=req.body.place;
    //console.log(res.body);
   let url="https://api.openweathermap.org/data/2.5/weather?units=metric&appid="+apikey+"&q="+city;
    https.get(url,function(response){
        response.on("data",function(data){
            const obj=JSON.parse(data);
            //console.log(obj);
            let des=obj.weather[0].description;
            let temp=obj.main.temp;
            res.write("<h1> The temperature of the city "+city+"  "+temp+" centigrade </h1>");
            res.write("<h3>It is currently "+des+" <h3>");
            var temp1;
            res.send();
        })
    })
})
let port = 3000|| process.env.PORT;
app.listen(port,function(req,res){
    console.log("server is started in port "+port.toString());
})
/*let query="london"
    let url="https://api.openweathermap.org/data/2.5/weather?appid=8dfb3722299eafcde6c82bc3bb8c4657&units=metric&q="+query;
    https.get(url,function(response){
        //console.log(response)
        response.on("data",function(data){
            const obj=JSON.parse(data);
            console.log(obj.main.temp);
            res.write("<p>descroption "+obj.weather[0].description+"<p>");

            res.write("<h1>the temperature of the city "+query+" "+obj.main.temp+"</h1>");
            res.send();
        })
    })*/
