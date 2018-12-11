const express=require('express');
const app=express();

const PORT=process.env.PORT||3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));


app.set('view engine','ejs');

app.get('/hello',(req,res)=>{
  res.render('../views/pages/index');
});

app.get('/',(req,res)=>{
  res.render('../views/pages/error');
});

app.get('/',(req,res)=>{
  res.render('../views/pages/searches/show');
});

app.post('/search', (req, res) => {
  console.log('my search body', req.body);
})

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});