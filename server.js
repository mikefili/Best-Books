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
  const authorURL=`https://www.googleapis.com/books/v1/volumes?q=inauthor:${req.body.searchkey}`;
//  const url=` https://www.googleapis.com/books/v1/volumes?q=${req.body.searchkey}+${req.body.search}:${req.body.searchkey}`;
  console.log(req.body);


  if(req.body.search==='title'){
return superagent.get(titleURL)
.then(data=>{
  
data.body.items.forEach(book=>{

  let obj = {
    image_url: book.volumeInfo.imageLinks.thumbnail,
    title: book.volumeInfo.title,
    isbn: parseInt(book.volumeInfo.industryIdentifiers[0].identifier),
    author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'No Author',
    description: book.volumeInfo.description
  };

  arr.push(obj);

});
res.render('../views/pages/show',{data:arr});
})

  }

  else{
    return superagent.get(authorURL)
    .then(data=>{
      
    data.body.items.forEach(book=>{
    
      let obj = {
        image_url: book.volumeInfo.imageLinks.thumbnail,
        title: book.volumeInfo.title,
        isbn: parseInt(book.volumeInfo.industryIdentifiers[0].identifier),
        author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'No Author',
        description: book.volumeInfo.description
      };
    
      arr.push(obj);
    
    });
    res.render('../views/pages/show',{data:arr});
    })
    



  }

}




app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});