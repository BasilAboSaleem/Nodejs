const express = require('express')
const app = express()
const port = 3000
//
const mongoose= require('mongoose');
//
app.use(express.urlencoded({ extended: true }));
//
const Mydatamodel = require('./models/mydataCHEMA');
//
app.set('view engine', 'ejs') 
//
app.use(express.static('public'))
//auto refresh code//
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//end auto refresh code//

//


app.get('/', (req, res) => {
  Mydatamodel.find()
  .then((resulte)=>{
    res.render("home", {mytitel: "Home Page" , arr: resulte})
    console.log(resulte)
  })
  .catch((err) => {
    console.log(err)
  })

 
})

  

//cnection with db
mongoose
.connect("mongodb+srv://basil:_%23X8p%21_4U%23dmMN8@cluster0.8gkpu.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")

.then(()=>{
  app.listen(port, () => {
    console.log(`http://localhost:${port}/ `)
  })
})
.catch((err)=>{
  console.log(err);
})

//post req to send data to db
app.post('/', (req, res) => {
  console.log(req.body)
  
  const mydat= new Mydatamodel(req,res)
  mydat.save()
  .then(()=>{
    res.sendFile('./views/sucsses.html',{root: __dirname})
  })
  .catch((err)=>{
    res.sendFile('/views/err.html',{root: __dirname})
    console.log(err);  
  })
    

   


})