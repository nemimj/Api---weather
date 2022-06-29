const express = require('express');
const { Http2ServerRequest } = require('http2');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const appId = '95ea1c13abb61255c024832cdf551ff0';


app.use(bodyParser.urlencoded({extended:true}))
app.get('/',function(req,res){
   res.sendFile(__dirname+'/index.html');
})


app.post('/',function(req,res){

        var dataFromUser = req.body.city;
        if ( (isNaN(dataFromUser)==true) &&  (dataFromUser !== '')){
            https.get('https://api.openweathermap.org/data/2.5/weather?q='+dataFromUser+'&appid='+appId+"&units=metric",function(response){
                response.on('data',function(data){
        
                    var apiData = JSON.parse(data);
                    var description = apiData.weather[0].description;
                    var icon = apiData.weather[0].icon;
                    var iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
                    var temp = apiData.main.temp;
        
                    res.write("<h1 style='display:inline-block'>"+description+" "+temp+"</h1>");
                    res.write('<img src='+iconUrl+'>');
                    
                   res.end()
                })
            })
        }
        else
        {
            res.send('<h1>please enter a valid city..');
        }

   
    
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server started on port 3000");
})