const express=require('express');
const app=express();
const cors=require('cors');
const PORT=process.env.PORT||3000;
const superagent=require('superagent');
app.use(express.urlencoded({ extended: true }));
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

let handler= req.body;

Book.getBookinfo(handler)
.then(res.render('/searches/show',{booklist:list}));


}


function Book(query,data){
this.search_query=query;
this.tile=data.volumeInfo.title;
this.authors=data.volumeInfo.authors;
this.publisher=data.volumeInfo.publisher;
this.description=data.volumeInfo.description;

}



Book.getBookinfo=(query)=>{

const _URL=`https://www.googleapis.com/books/v1/volumes?q=${query}`;
return superagent.get(_URL)
.then(data=>{

let book=new Book(query,data.body.items);
return book;

})


};





app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});