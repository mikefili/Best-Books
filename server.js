const express=require('express');
const app=express();

const PORT=process.env.PORT||3000;
const superagent=require('superagent');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
require('dotenv').config();
app.set('view engine','ejs');



const pg = require('pg');
const dbaddress = process.env.DATABASE_URL;
const client = new pg.Client(dbaddress);
client.connect();
client.on('error', err => console.log(err));



app.get('/',(req,res)=>{
  // res.render('../views/pages/index');
  res.redirect('/books');
});

app.get('/error',(req,res)=>{
  res.render('../views/pages/error');
});


//get all books from db

app.get('/books',getbooks);
function getbooks(req, res) {
 let SQL='SELECT * from books;';
 return client.query(SQL)
  .then(result=>res.render('pages/index',{ bookshelf:result.rows }))
  .catch(err=>console.error(err));
}

app.get('/books/:id',getbookinfo);
function getbookinfo(req, res) {
  let SQL = 'SELECT * FROM books WHERE id=$1';
  let values = [ req.params.id ];
  client.query(SQL, values, (err, result) => {
    if (err) {
      console.error(err);
      res.redirect('/error');
    } else {
      res.render('../views/pages/searches/show', {
       data: result.rows[0]
      });
    }
  });
}





// app.get('/books/:id',editbookinfo);
// function editbookinfo(req, res){
//     let SQL = 'UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5 WHERE id=$6';
//     let values = [req.body.title, req.body.author, req.body.isbn, req.body.image_url, req.body.description, req.params.id];
//     client.query(SQL, values, ( data) => {
//       res.redirect(`/books/${req.params.id}`);
//     });
//   }




app.get('/search',(req,res)=>{
  res.render('../views/pages/search');
});


app.post('/searchapi',getsearch);
 
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
res.render('../views/pages/books/show',{data:arr});
})



}


app.get('*', (req, res) => {
  res.redirect('/error');
});



app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});