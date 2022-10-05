const mongoose=require('mongoose');
const express=require('express');
const app=express();
const ejs=require('ejs');
const methodOverride=require('method-override');

const Post = require('./models/Post');


//connection
mongoose.connect('mongodb+srv://omer:M9mbFvmRvSgN9W@mflix.pwuutu0.mongodb.net/cleanblog-test-db?retryWrites=true&w=majority').then(result=>{
   
})
.catch(err=>console.log(err))

//template engine
app.set('view engine',"ejs");

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method',{methods:['GET','POST','DELETE']}))

app.get('/',async (req,res)=>{
    const posts=await Post.find({});
    res.render('index',{posts});
})
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/add_post',(req,res)=>{
    res.render('add_post');
})
app.get('/post/:id',async (req,res)=>{
    const selectedPost= await Post.findById(req.params.id);
    res.render('post',{selectedPost});
});
app.get('/post/edit/:id',async (req,res)=>{
    const selectedPost= await Post.findById(req.params.id);
    res.render('edit',{selectedPost});
})

app.post('/add_posts',async (req,res)=>{
    await Post.create(req.body);
    res.redirect('/');
})
app.put('/post/:id',async (req,res)=>{
    const pst=await Post.findOne({_id:req.params.id});
    pst.title=req.body.title;
    pst.detail=req.body.detail;
    await pst.save();
    res.redirect(`/post/${req.params.id}`);
});
app.delete('/post/:id',async (req,res)=>{
    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/');

})

app.listen(3000,()=>{
    console.log('http://localhost:3000/ has been launched')
})