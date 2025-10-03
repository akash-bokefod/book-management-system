const express=require('express');
const app=express();
const port =3000;
const methodOverride = require("method-override");
app.set("view engine","ejs");
const mysql=require('mysql2');
require('dotenv').config();


app.use(methodOverride("_method")); 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connection=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port} `);
})

app.get('/books',(req,res)=>{
    connection.query(`select * from books`,(err,result)=>{
        if(err) throw err;
        books=result;
        res.render('index.ejs',{books});
    })
    
})

app.get('/books/edit/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const q=`select * from books where id=${id}`;
    connection.query(q,(err,result)=>{
        if(err) throw err;
        const book=result[0];
        res.render('edit.ejs',{book});
        
    })
})

app.get("/books/new",(req,res)=>{
    res.render('new');
})

app.post('/books',(req,res)=>{
    let {title,author,year}=req.body;
    const q='INSERT INTO books (title,author,year) VALUES (?,?,?)';
    connection.query(q,[title,author,parseInt(year)],(err,result)=>{
        if(err) throw err;
        console.log(result);  
        res.redirect('http://localhost:3000/books');
    })
    
})

app.patch('/books/edit/:id',(req,res)=>{
    let {title,author,year}=req.body;
    const id=parseInt(req.params.id);
    const q=`UPDATE books SET title=?,author=?,year=? WHERE id=${id}`;
    connection.query(q,[title,author,year],(err,result)=>{
        if(err) throw err;
        res.redirect("http://localhost:3000/books");
    })
})

app.delete('/books/delate/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const q=`DELETE FROM books WHERE id=${id}`;
    connection.query(q,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.redirect("http://localhost:3000/books");
    })
})