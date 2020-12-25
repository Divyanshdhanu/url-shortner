const express=require('express');
const app= express()
const mongoose= require('mongoose')
const shortUrl= require('./models/shortUrl')


app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))

// connect mongodb
mongoose.Promise =global.Promise
mongoose.connect('mongodb://localhost:27017/shortUrl', { useNewUrlParser: true }).then(function(){
    console.log("data base connected")
})



app.get("/", (req,res)=>{
     shortUrl.find({}).then(function(allTable){

        // console.log(allTable)
         res.render('index.ejs',{shortUrls :allTable})
     })
  
   
})

app.post('/shortUrls',async (req,res)=>{
  shortUrl.create({full: req.body.fullUrl})
  res.redirect('/')
})

// any thing after / will go throught this actually short url awill be here ..
app.get('/:shortUrl', async(req,res)=>{
   // console.log(req.params.shortUrl)
    shortUrl.findOne({short: req.params.shortUrl},function  (err,result){
        if(result== null){
            return res.sendStatus(404)
        }
       result.clicks++
       result.save()
       res.redirect(result.full)
  })
 
})


app.listen(3000,(req,res)=>{
    console.log("app is running on port 3000");
})