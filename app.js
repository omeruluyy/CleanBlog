const express=require('express');
const app=express();
const ejs=require('ejs');

//template engine
app.set('view engine',"ejs");

//middleware
app.use(express.static('public'));

app.get('/',(req,res)=>{
    const blog = { id: 1, title: "Blog title", description: "Blog description" }
    res.send(blog);
})

app.listen(3000,()=>{
    console.log('http://localhost:3000/ has been launched')
})