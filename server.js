const express=require('express');
const app=express();
const cors=require('cors');
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

// app.post('/search', (req, res) => {
//   console.log('my search body', req.body);
//   res.sendFile('../views/pages/searches/show',{booklist:list});
// })

app.post('/search',getsearch);
 

function getsearch(req,res){
  let arr=[];
  const titleURL=`https://www.googleapis.com/books/v1/volumes?q=${req.query.searchType}:${req.query.search}&fields=items(volumeInfo/authors, volumeInfo/title, volumeInfo/industryIdentifiers/identifier, volumeInfo/description, volumeInfo/imageLinks/thumbnail`;


return superagent(titleURL)
.then(data=>{
  
   data.body.items.forEach(book=>{

  let bookobj = {
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'N/A',
    description: book.volumeInfo.description,
    isbn: parseInt(book.volumeInfo.industryIdentifiers[0].identifier),
    image_url: book.volumeInfo.imageLinks.thumbnail
  };

  arr.push(bookobj);

});
res.render('pages/shows',{books:arr});
})



}





app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});