const express=require('express');
var app=express();
const hbs = require('hbs')
const fs= require('fs');
hbs.registerPartials(__dirname+ '/views/partials')

hbs.registerHelper('getCurrentYear', ()=> {
    return  new Date ().getFullYear()
})
hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase();
})
app.set('view engine', 'hbs');


app.use((req,res,next)=> {
    var now =new Date().toString();
    var log= `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err)=>
    {if (err){
        console.log(err)
    }
       
    })
    next();
})

// app.use((req,res,next) =>{
//     res.render('maintenance.hbs')
// })
app.use(express.static(__dirname + '/public'))//takes the absolute path to the folder  we want to serve up 
app.get('/', (req,res)=> {
res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage:'Welcome to My page',
    
})

})

app.get('/about', (req,res)=> {
  res.render('about.hbs', {
      pageTitle: 'About Page',
     
  });
})

app.get('/bad', (req,res)=> {
    res.send({
 errorMessage: 'unable to handle..'
    })
   
})
app.listen(3000, ()=> console.log('server is up'));