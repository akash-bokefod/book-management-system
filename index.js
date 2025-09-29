const express=require('express');
const app=express();
const port =3000;
const methodOverride = require("method-override");
app.set("view engine","ejs");

app.use(methodOverride("_method")); 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let books = [
    { id: 1, title: "Learn JavaScript", author: "Akash Bokefod", year: 2023 },
    { id: 2, title: "Mastering Python", author: "Gaytri Sharma", year: 2022 },
    { id: 3, title: "HTML & CSS Guide", author: "Rohan Patil", year: 2021 },
    { id: 4, title: "Node.js Essentials", author: "Sneha Kulkarni", year: 2023 },
    { id: 5, title: "React for Beginners", author: "Akash Bokefod", year: 2024 }
];


app.listen(port,()=>{
    console.log(`server running at http://localhost:${port} `);
})

app.get('/books',(req,res)=>{
    res.render('index.ejs',{books});
})

app.get('/books/edit/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const book=books.find(b=>b.id===id);
    if(!book){
        res.send("book not fond");
    }
    res.render('edit.ejs',{book});
})
app.get("/books/new",(req,res)=>{
    res.render('new');
})

app.post('/books',(req,res)=>{
    let {title,author,year}=req.body;
    let book={
        id:books.length+1,
        title:title,
        author:author,
        year:year
    };
    books.push(book);
    res.redirect('http://localhost:3000/books');
})

app.patch('/books/edit/:id',(req,res)=>{
    let {title,author,year}=req.body;
    const id=parseInt(req.params.id);
    let book=books.find(p=>p.id===id);
    book.title=title;
    book.author=author;
    book.year=year;
    res.redirect("http://localhost:3000/books");
})

app.delete('/books/delate/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    books=books.filter(b=>b.id!=id);
    res.redirect("http://localhost:3000/books");
})