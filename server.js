const express=require('express');
const app=express();

const PORT=process.env.PORT||3000;



app.use(express.static('./public'));


app.set('view engine','ejs');

app.get('/',(req,res)=>{
  res.render('../views/pages/index');
});


app.get('./views/pages',(req,res)=>{
  res.render('error');
});


app.get('./views/pages/searches',(req,res)=>{
  res.render('show');
});





app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});