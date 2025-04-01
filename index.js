const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();


app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get('/',function(req , res){
    fs.readdir(`./files` , function(err , files){
        res.render("index", {files : files});
    })
});

app.get('/files/:username',function(req , res){
    fs.readFile(`./files/${req.params.username}`,'utf-8' , function(err , filedata){
        res.render("show",{name : req.params.username , data : filedata});
    })
});

app.get('/edit/:username',function(req , res){
    res.render("edit" , { name : req.params.username});
});

app.post('/edit',function(req , res){
    fs.rename(`./files/${req.body.previous}` , `./files/${req.body.new}.txt` , function(err){
        res.redirect("/");
    }) 
});

app.post('/create',function(req , res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt` , req.body.details , function(err){
        res.redirect("/");
    });
});

app.listen(3000);