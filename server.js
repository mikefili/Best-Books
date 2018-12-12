const express=require('express');
const app=express();

const PORT=process.env.PORT||3000;
const superagent=require('superagent');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));



require('dotenv').config();
app.set('view engine','ejs');

app.get('/hello',(req,res)=>{
  res.render('../views/pages/index');
});

app.get('/',(req,res)=>{
  res.render('../views/pages/error');
});

// app.get('/',(req,res)=>{
//   res.render('../views/pages/searches/show',{booklist:list});
// });

app.post('/search',getsearch);
 

function getsearch(req,res){
  let arr=[];
  const titleURL=`https://www.googleapis.com/books/v1/volumes?q=intitle:${req.body.searchkey}`;
  console.log(req.body);
return superagent.get(titleURL)
.then(data=>{
  
data.body.items.forEach(book=>{

  let obj = {
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'No Author',
    description: book.volumeInfo.description,
    isbn: parseInt(book.volumeInfo.industryIdentifiers[0].identifier),
    image_url: book.volumeInfo.imageLinks.thumbnail
  };

  arr.push(obj);

});
res.render('../views/pages/searches/show',{data:arr});
})



}





app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});